export type CourseLesson = {
  id: number;
  lessonNumber: number;
  title: string;
  module: string;
  objectives: string;
  topics: string;
  homework: string;
  commands: string;
  reflectionQuestions: string;
  isCompleted: boolean;
  isLocked?: boolean;
};

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

export const LESSONS_SEED: CourseLesson[] = [
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
];
