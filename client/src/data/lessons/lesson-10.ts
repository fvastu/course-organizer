import type { CourseLesson } from "../lessons";

export const lesson10: CourseLesson = {
  "id": 10,
  "lessonNumber": 10,
  "title": "Strategie di Rendering",
  "module": "Modulo Next.js",
  "objectives": "• Capire compromessi SSG/SSR/ISR in Next.js 16\n• Scegliere la strategia giusta per ogni tipo di pagina\n• Ottimizzare performance percepita e costi infra",
  "topics": "1. SSG: massima velocita su contenuti stabili (esempio landing)\n2. SSR: dati sempre freschi per dashboard personali\n3. ISR: contenuti quasi realtime con costo ridotto\n4. Revalidation on-demand con tag/path dopo update CMS",
  "commands": "export const revalidate = 300\nexport const dynamic = 'force-dynamic'\nimport { revalidateTag } from 'next/cache'; revalidateTag('posts')",
  "reflectionQuestions": "Come bilanci freschezza dati vs costo compute?\nDove useresti ISR invece di SSR puro in un e-commerce?",
  "homework": "Esercizio 1: Implementa 3 pagine distinte (SSG/SSR/ISR) e confronta tempi percepiti.\nEsercizio 2: Crea endpoint webhook che richiama revalidateTag su aggiornamento contenuto.",
  "isCompleted": false
};

export default lesson10;
