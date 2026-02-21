import { type InsertLesson, type UpdateLessonRequest, type Lesson } from "../shared/schema.ts";

export interface IStorage {
  getLessons(): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  updateLesson(id: number, updates: UpdateLessonRequest): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
}

export class MemStorage implements IStorage {
  private lessons: Map<number, Lesson> = new Map();
  private nextId = 1;

  async getLessons(): Promise<Lesson[]> {
    return Array.from(this.lessons.values()).sort(
      (a, b) => a.lessonNumber - b.lessonNumber
    );
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }

  async updateLesson(id: number, updates: UpdateLessonRequest): Promise<Lesson | undefined> {
    const lesson = this.lessons.get(id);
    if (!lesson) return undefined;
    const updated = { ...lesson, ...updates };
    this.lessons.set(id, updated);
    return updated;
  }

  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const created: Lesson = {
      id: this.nextId++,
      isCompleted: false,
      commands: "",
      reflectionQuestions: "",
      ...lesson,
    };
    this.lessons.set(created.id, created);
    return created;
  }
}

export const storage = new MemStorage();
