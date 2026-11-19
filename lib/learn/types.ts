export type LearnLevel = "principiante" | "intermedio" | "avanzado";

export type HistoryQuestion = {
  id: string;
  prompt: string;
  options: [string, string, string];
  correct: "a" | "b" | "c";
  sort: number;
};

export type HistoryLesson = {
  id: string;
  routeSlug: string;
  routeTitle: string;
  level: LearnLevel;
  routeSort: number;
  lessonSort: number;
  title: string;
  summary: string;
  body: string;
  xp: number;
  questions: HistoryQuestion[];
};

export type HistoryRoute = {
  slug: string;
  title: string;
  level: LearnLevel;
  sort: number;
  lessons: HistoryLesson[];
  xp: number;
};
