import type { CourseLesson } from "../lessons";

export const lesson09: CourseLesson = {
  "id": 9,
  "lessonNumber": 9,
  "title": "API Routes e Form Submission",
  "module": "Modulo Next.js",
  "objectives": "• Creare endpoint API affidabili in Route Handlers\n• Validare input con Zod lato server in modo rigoroso\n• Gestire submit form con feedback per campo e stato pending",
  "topics": "1. Route Handlers GET/POST/PATCH/DELETE con Response.json tipata\n2. Parsing body e status code: 200, 201, 400, 404, 422\n3. Validazione Zod: safeParse + mapping errori per campo\n4. Server Actions vs Route Handlers in Next.js 16: quando usare ciascuno",
  "commands": "export async function POST(req: Request) { const body = await req.json(); ... }\nconst parsed = schema.safeParse(body)\nreturn Response.json({ success: true }, { status: 201 })",
  "reflectionQuestions": "Quali rischi reali eviti validando sempre lato server?\nQuando preferire una Server Action per semplificare il codice UI?",
  "homework": "Esercizio 1: Crea /api/contact con validazione Zod e risposta errori campo.\nEsercizio 2: Collega un form React con stato pending, successo e fallback errore.",
  "isCompleted": false
};

export default lesson09;
