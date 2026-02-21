import type { InsertLesson } from "@shared/schema";

export const lesson02: InsertLesson = {
  lessonNumber: 2,
  title: "Basi di React",
  module: "Modulo React",
  objectives: `• Comprendere il paradigma dichiarativo
• Costruire componenti funzionali riutilizzabili
• Passare dati con props tipizzate`,
  topics: `1. JSX e regole fondamentali
2. Componenti funzione e composizione
3. Props e flusso dati one-way
4. Setup progetto con Vite + TypeScript`,
  commands: `npm create vite@latest my-app -- --template react-ts - Crea progetto React TS
npm run dev - Avvia ambiente di sviluppo
npm run build - Build di produzione`,
  reflectionQuestions: `Perché React preferisce componenti piccoli e composti?
Qual è il vantaggio delle props tipizzate?`,
  homework: `Esercizio 1: Crea Navbar, Hero e Footer come componenti separati con interfacce TypeScript.
Esercizio 2: Monta i componenti in App.tsx passando tutti i contenuti da un oggetto config.`
};
