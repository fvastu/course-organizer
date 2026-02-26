
// lessons.ts

export type CourseLesson = {
  id: number;
  lessonNumber: number;
  title: string;
  module: string;
  objectives: string;
  image?: string; // URL immagine introduttiva
  topics: string;
  homework: string;
  commands: string;
  reflectionQuestions: string;
  isCompleted: boolean;
  isLocked?: boolean;
  bestPractices?: string; // Sezione extra per best practice moderne
  workflow?: string; // Sezione extra per workflow reale usato in team
  resources?: string; // URL immagini di risorse, separate da \n
  snippets?: string; // Snippet di codice, formato: titolo\nlinguaggio\ncodice, separati da ---
};

// seed.ts

import lesson01 from "./lessons/lesson-01";
import lesson02 from "./lessons/lesson-02";
import lesson03 from "./lessons/lesson-03";
import lesson04 from "./lessons/lesson-04";
import lesson05 from "./lessons/lesson-05";
import lesson06 from "./lessons/lesson-06";
import lesson07 from "./lessons/lesson-07";
import lesson08 from "./lessons/lesson-08";
import lesson09 from "./lessons/lesson-09";
import lesson10 from "./lessons/lesson-10";
import lesson11 from "./lessons/lesson-11";

/**
 * 🔥 Seed principale del corso
 * Ordinato automaticamente per sicurezza
 */
export const LESSONS_SEED = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lesson08,
  lesson09,
  lesson10,
  lesson11,
].sort((a, b) => a.lessonNumber - b.lessonNumber);
