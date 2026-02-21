import type { InsertLesson } from "../../shared/schema.ts";

export const lesson08: InsertLesson = {
  lessonNumber: 8,
  title: "Routing Dinamico e Data Fetching",
  module: "Modulo Next.js",
  objectives: `• Costruire rotte dinamiche con parametri
• Recuperare dati lato server in modo asincrono
• Gestire loading/error UI dedicate`,
  topics: `1. Segmenti dinamici [slug]
2. Fetch in Server Components
3. loading.tsx ed error.tsx
4. not-found.tsx e gestione casi assenti`,
  commands: `export default async function Page({ params }) { ... } - Pagina async
fetch(url, { cache: 'no-store' }) - Dati sempre aggiornati
notFound() - Trigger pagina 404`,
  reflectionQuestions: `Quale vantaggio ha il fetch server-side rispetto a useEffect client?
Quando conviene pre-generare rotte con generateStaticParams?`,
  homework: `Esercizio 1: Implementa una rotta blog/[slug] con titolo dinamico.
Esercizio 2: Mostra lista post da API esterna con loading skeleton e fallback errore.`
};
