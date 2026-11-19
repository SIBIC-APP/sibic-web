import type { HistoryLesson } from "@/lib/learn/types";

export type LearnAnswer = {
  sectionId: string;
  questionId: string;
  value: string;
};

export function completedSectionIds(lessons: HistoryLesson[], responses: LearnAnswer[]) {
  return lessons
    .filter((lesson) => {
      if (lesson.questions.length === 0) {
        return responses.some((row) => row.sectionId === lesson.id && row.questionId === "" && row.value === "done");
      }
      return lesson.questions.every((question) =>
        responses.some((row) => row.questionId === question.id && row.value === question.correct),
      );
    })
    .map((lesson) => lesson.id);
}
