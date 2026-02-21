import type { InsertLesson } from "../../shared/schema.ts";

export const lesson07: InsertLesson = {
  lessonNumber: 7,
  title: "Fondamenti di Next.js",
  module: "Modulo Next.js",
  objectives: `• Comprendere App Router e file-based routing
• Distinguere Server e Client Components
• Gestire metadata SEO di pagina`,
  topics: `1. Struttura app/ e file speciali
2. page.tsx, layout.tsx, loading.tsx, error.tsx
3. Server Components default e confine 'use client'
4. Metadata statici e dinamici`,
  commands: `npx create-next-app@latest - Crea progetto Next.js
'use client' - Abilita interattivita client
export const metadata = { title: '...' } - SEO base`,
  reflectionQuestions: `Perché Server Components riducono JS inviato al browser?
Quando ha senso usare Client Components?`,
  homework: `Esercizio 1: Crea un'app Next.js con pagine /, /chi-siamo e /contatti usando App Router.
Esercizio 2: Aggiungi metadata personalizzati per ogni pagina e verifica il title nel browser.`
};
