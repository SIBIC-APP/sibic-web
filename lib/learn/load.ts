import "server-only";

import { connection } from "next/server";
import type { HistoryLesson, HistoryQuestion, HistoryRoute, LearnLevel } from "@/lib/learn/types";
import { ensureHistoryQuestions, ensureHistorySections } from "@/lib/sheets/bootstrap";
import { readTable } from "@/lib/sheets/table";

const levels = new Set<LearnLevel>(["principiante", "intermedio", "avanzado"]);

function levelOf(value: string): LearnLevel {
  return levels.has(value as LearnLevel) ? (value as LearnLevel) : "principiante";
}

function correctOf(value: string): HistoryQuestion["correct"] {
  return value === "b" || value === "c" ? value : "a";
}

export function groupRoutes(lessons: HistoryLesson[]): HistoryRoute[] {
  const routes = new Map<string, HistoryRoute>();
  for (const lesson of lessons) {
    const current = routes.get(lesson.routeSlug);
    if (current) {
      current.lessons.push(lesson);
      current.xp += lesson.xp;
      continue;
    }
    routes.set(lesson.routeSlug, {
      slug: lesson.routeSlug,
      title: lesson.routeTitle,
      level: lesson.level,
      sort: lesson.routeSort,
      lessons: [lesson],
      xp: lesson.xp,
    });
  }
  return [...routes.values()]
    .map((route) => ({
      ...route,
      lessons: [...route.lessons].sort((a, b) => a.lessonSort - b.lessonSort),
    }))
    .sort((a, b) => a.sort - b.sort);
}

const HISTORY_TTL_MS = 60_000;

let historyCache: { at: number; lessons: HistoryLesson[]; routes: HistoryRoute[] } | null = null;

export async function loadHistory() {
  await connection();
  if (historyCache && Date.now() - historyCache.at < HISTORY_TTL_MS) {
    return { lessons: historyCache.lessons, routes: historyCache.routes };
  }
  await ensureHistorySections();
  await ensureHistoryQuestions();
  const [rows, questionRows] = await Promise.all([readTable("history_sections"), readTable("history_questions")]);
  const questions = new Map<string, HistoryQuestion[]>();
  for (const row of questionRows) {
    if (!row.section_id || !row.prompt) continue;
    const list = questions.get(row.section_id) ?? [];
    list.push({
      id: row.id || `${row.section_id}-${list.length + 1}`,
      prompt: row.prompt,
      options: [row.option_a, row.option_b, row.option_c],
      correct: correctOf(row.correct),
      sort: Number(row.sort_order) || 0,
    });
    questions.set(row.section_id, list);
  }
  for (const list of questions.values()) {
    list.sort((left, right) => left.sort - right.sort);
  }

  const lessons = rows
    .filter((row) => row.id && row.title)
    .map((row): HistoryLesson => ({
      id: row.id,
      routeSlug: row.route_slug,
      routeTitle: row.route_title,
      level: levelOf(row.level),
      routeSort: Number(row.route_sort) || 0,
      lessonSort: Number(row.lesson_sort) || 0,
      title: row.title,
      summary: row.summary,
      body: row.body,
      xp: Number(row.xp) || 0,
      questions: questions.get(row.id) ?? [],
    }))
    .sort((a, b) => a.routeSort - b.routeSort || a.lessonSort - b.lessonSort);
  const routes = groupRoutes(lessons);
  historyCache = { at: Date.now(), lessons, routes };
  return { lessons, routes };
}
