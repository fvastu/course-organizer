import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  lessonNumber: integer("lesson_number").notNull().unique(),
  title: text("title").notNull(),
  module: text("module").notNull(),
  objectives: text("objectives").notNull(),
  topics: text("topics").notNull(),
  homework: text("homework").notNull(),
  commands: text("commands").default("").notNull(),
  isCompleted: boolean("is_completed").default(false).notNull(),
});

export const insertLessonSchema = createInsertSchema(lessons).omit({ id: true });
export const updateLessonSchema = insertLessonSchema.partial();

export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type Lesson = typeof lessons.$inferSelect;
export type UpdateLessonRequest = Partial<InsertLesson>;
