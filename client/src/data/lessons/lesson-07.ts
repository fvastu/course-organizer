import type { CourseLesson } from "../lessons";

export const lesson07: CourseLesson = {
  "id": 7,
  "lessonNumber": 7,
  "title": "Fondamenti di Next.js",
  "module": "Modulo Next.js",
  "objectives": "• Comprendere App Router in Next.js 16\n• Distinguere con precisione Server e Client Components\n• Gestire metadata SEO moderni e consistenti",
  "topics": "1. Struttura app/ in Next.js 16: segmenti, layout annidati, route groups\n2. File speciali: page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx\n3. Confine 'use client': esempio pratico Navbar con stato locale + contenuto server-rendered\n4. Metadata statici e dinamici: esempio su pagina prodotto con titolo e Open Graph",
  "commands": "npx create-next-app@latest my-app --ts --app\nnpx @next/codemod@canary upgrade latest\nexport const metadata = { title: 'Corso Premium', description: 'Percorso React/Next.js' }",
  "reflectionQuestions": "Perché spostare il confine client più in basso migliora le performance?\nQuali parti della tua UI devono davvero essere con logica lato browser?",
  "homework": "Esercizio 1: Crea 3 pagine (home, chi-siamo, contatti) con layout condiviso in App Router.\nEsercizio 2: Implementa metadata dinamici su una pagina [slug] e verifica titolo/descrizione nel sorgente HTML.",
  "isCompleted": false
};

export default lesson07;
