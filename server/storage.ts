import { db } from "./db";
import { lessons, type InsertLesson, type UpdateLessonRequest, type Lesson } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getLessons(): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  updateLesson(id: number, updates: UpdateLessonRequest): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
}

export class DatabaseStorage implements IStorage {
  async getLessons(): Promise<Lesson[]> {
    return await db.select().from(lessons).orderBy(lessons.lessonNumber);
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
    return lesson;
  }

  async updateLesson(id: number, updates: UpdateLessonRequest): Promise<Lesson | undefined> {
    const [updated] = await db.update(lessons)
      .set(updates)
      .where(eq(lessons.id, id))
      .returning();
    return updated;
  }

  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const [created] = await db.insert(lessons).values(lesson).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
