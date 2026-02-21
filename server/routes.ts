import type { Express } from "express";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { seedLessons } from "./lessons";

// Set to true to require completing lessons in order
const REQUIRE_SEQUENTIAL_UNLOCK = false;

async function seedDatabase() {
  const existingLessons = await storage.getLessons();
  if (existingLessons.length > 0) return;

  for (const lesson of seedLessons) {
    await storage.createLesson(lesson);
  }
}

export async function registerRoutes(app: Express): Promise<void> {
  // Seed the in-memory database on startup
  await seedDatabase();

  app.get(api.lessons.list.path, async (_req, res) => {
    const lessons = await storage.getLessons();

    if (REQUIRE_SEQUENTIAL_UNLOCK) {
      const processedLessons = lessons.map((lesson, index) => {
        if (index === 0) return { ...lesson, isLocked: false };
        const previousLesson = lessons[index - 1];
        return {
          ...lesson,
          isLocked: !previousLesson.isCompleted,
        };
      });
      return res.json(processedLessons);
    }

    res.json(lessons.map((lesson) => ({ ...lesson, isLocked: false })));
  });

  app.get(api.lessons.get.path, async (req, res) => {
    const lessonId = Number(req.params.id);
    const lesson = await storage.getLesson(lessonId);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    if (REQUIRE_SEQUENTIAL_UNLOCK && lesson.lessonNumber > 1) {
      const allLessons = await storage.getLessons();
      const previousLesson = allLessons.find(
        (entry) => entry.lessonNumber === lesson.lessonNumber - 1
      );

      if (previousLesson && !previousLesson.isCompleted) {
        return res.status(403).json({
          message:
            "Questa lezione è bloccata. Completa la precedente per continuare.",
        });
      }
    }

    res.json(lesson);
  });

  app.patch(api.lessons.update.path, async (req, res) => {
    try {
      const input = api.lessons.update.input.parse(req.body);
      const updated = await storage.updateLesson(Number(req.params.id), input);
      if (!updated) {
        return res.status(404).json({ message: "Lesson not found" });
      }

      res.status(200).json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }

      throw err;
    }
  });

}
