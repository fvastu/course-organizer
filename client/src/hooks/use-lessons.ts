import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LESSONS_SEED, type CourseLesson } from "@/data/lessons";

const LESSONS_QUERY_KEY = ["lessons"] as const;
const LESSON_QUERY_KEY = "lesson";
const PROGRESS_STORAGE_KEY = "course-organizer-progress-v1";

type ProgressMap = Record<number, boolean>;

type LessonUpdateInput = {
  isCompleted?: boolean;
};

const MIN_UNLOCKED_LESSON = 1;
const MAX_UNLOCKED_LESSON = 10;
const DEFAULT_UNLOCKED_LESSON = 1;

function getUnlockedLessonMax() {
  const rawValue = import.meta.env.VITE_UNLOCKED_LESSON_MAX;
  const parsed = Number.parseInt(String(rawValue ?? ""), 10);
  if (Number.isNaN(parsed)) return DEFAULT_UNLOCKED_LESSON;
  return Math.min(MAX_UNLOCKED_LESSON, Math.max(MIN_UNLOCKED_LESSON, parsed));
}

function readProgress(): ProgressMap {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as ProgressMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeProgress(progress: ProgressMap) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

function withProgress(lesson: CourseLesson, progress: ProgressMap): CourseLesson {
  const unlockedLessonMax = getUnlockedLessonMax();
  return {
    ...lesson,
    isCompleted: Boolean(progress[lesson.id]),
    isLocked: lesson.lessonNumber > unlockedLessonMax,
  };
}

function getAllLessons(): CourseLesson[] {
  const progress = readProgress();
  return LESSONS_SEED.map((lesson) => withProgress(lesson, progress)).sort(
    (a, b) => a.lessonNumber - b.lessonNumber,
  );
}

export function useLessons() {
  return useQuery({
    queryKey: LESSONS_QUERY_KEY,
    queryFn: async () => getAllLessons(),
  });
}

export function useLesson(id: number) {
  return useQuery({
    queryKey: [LESSON_QUERY_KEY, id],
    queryFn: async () => {
      const lesson = getAllLessons().find((entry) => entry.id === id);
      if (!lesson) return null;
      if (lesson.isLocked) {
        throw new Error("Lezione bloccata dalla configurazione");
      }
      return lesson;
    },
  });
}

export function useUpdateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number } & LessonUpdateInput) => {
      const lessons = getAllLessons();
      const lesson = lessons.find((entry) => entry.id === id);
      if (!lesson) {
        throw new Error("Lezione non trovata");
      }

      if (typeof updates.isCompleted === "boolean") {
        const current = readProgress();
        current[id] = updates.isCompleted;
        writeProgress(current);
      }

      return getAllLessons().find((entry) => entry.id === id) as CourseLesson;
    },
    onSuccess: (_updated, variables) => {
      queryClient.invalidateQueries({ queryKey: LESSONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [LESSON_QUERY_KEY, variables.id] });
    },
  });
}
