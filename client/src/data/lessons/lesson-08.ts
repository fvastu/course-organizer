import type { CourseLesson } from "../lessons";

export const lesson08: CourseLesson = {
  "id": 8,
  "lessonNumber": 8,
  "title": "Routing Dinamico e Data Fetching",
  "module": "Modulo Next.js",
  "objectives": "• Creare rotte dinamiche robuste con parametri\n• Recuperare dati lato server con caching controllato\n• Gestire loading/error/not-found con UX professionale",
  "topics": "1. Segmenti dinamici [slug] e [id]: differenze d'uso in casi reali\n2. Fetch in Server Components con cache/no-store e revalidate\n3. loading.tsx ed error.tsx: micro-esperienza durante fetch lenti\n4. notFound() e not-found.tsx: gestione elegante dei contenuti mancanti",
  "commands": "export default async function Page({ params }: { params: { slug: string } }) { ... }\nfetch(url, { next: { revalidate: 120 } })\nimport { notFound } from 'next/navigation'; notFound()",
  "reflectionQuestions": "Come decidi tra no-store, revalidate e cache default?\nIn quali scenari conviene fallback statico vs errore esplicito?",
  "homework": "Esercizio 1: Crea blog/[slug] con dati mock e fallback not-found.\nEsercizio 2: Integra fetch reale (JSONPlaceholder) con loading skeleton e pagina errore custom.",
  "isCompleted": false
};

export default lesson08;
