import type { InsertLesson } from "@shared/schema";

export const lesson09: InsertLesson = {
  lessonNumber: 9,
  title: "API Routes e Form Submission",
  module: "Modulo Next.js",
  objectives: `• Creare endpoint server in Next.js
• Validare input lato server con Zod
• Gestire invio form con feedback utente`,
  topics: `1. Route Handlers GET/POST/PATCH/DELETE
2. Parsing body e status code corretti
3. Validazione schema con Zod
4. Server Actions e useFormStatus`,
  commands: `export async function POST(req: Request) { ... } - Endpoint POST
const result = schema.safeParse(data) - Validazione robusta
return Response.json({ ok: true }) - Risposta JSON`,
  reflectionQuestions: `Perché non bisogna fidarsi della validazione solo client?
Quando scegliere Route Handler vs Server Action?`,
  homework: `Esercizio 1: Crea /api/contact con validazione Zod e risposta 400/201.
Esercizio 2: Collega un form UI all'endpoint e mostra stato invio + errori campo.`
};
