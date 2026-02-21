import type { InsertLesson } from "@shared/schema";

export const lesson10: InsertLesson = {
  lessonNumber: 10,
  title: "Strategie di Rendering",
  module: "Modulo Next.js",
  objectives: `• Distinguere SSG, SSR e ISR
• Selezionare strategia per tipo di pagina
• Capire impatto su performance e costi`,
  topics: `1. Static generation e contenuti stabili
2. Rendering dinamico per dati freschi
3. ISR e revalidate periodico
4. Cache tagging e revalidation on-demand`,
  commands: `export const revalidate = 60 - ISR ogni 60s
export const dynamic = 'force-dynamic' - SSR forzato
revalidateTag('posts') - Invalida cache per tag`,
  reflectionQuestions: `Quale strategia useresti per home, catalogo e dashboard utente?
Come cambia il TTFB tra pagina statica e dinamica?`,
  homework: `Esercizio 1: Crea tre pagine demo (SSG, SSR, ISR) con timestamp di generazione.
Esercizio 2: Implementa endpoint di revalidazione con token segreto e testalo via curl.`
};
