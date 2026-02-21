import type { CourseLesson } from "../lessons";

export const lesson02: CourseLesson = {
  "id": 2,
  "lessonNumber": 2,
  "title": "Basi di React",
  "module": "Modulo React",
  "objectives": "• Comprendere il paradigma dichiarativo\n• Creare componenti riutilizzabili\n• Passare dati tramite props",
  "topics": "1. JSX e regole base: root unico, attributi camelCase, espressioni in {}\n2. Componenti funzione: esempio Card, Hero, Footer riusabili\n3. Props e composizione: passaggio dati e callback dal parent al child\n4. Setup Vite + TypeScript: struttura cartelle e convenzioni di naming",
  "commands": "npm create vite@latest my-app -- --template react-ts\nnpm run dev - Avvio sviluppo\nnpm run build - Build produzione",
  "reflectionQuestions": "Perché conviene dividere la UI in componenti piccoli?\nQuale vantaggio offre il typing delle props?",
  "homework": "Esercizio 1: Crea Navbar, Hero e Footer separati.\nEsercizio 2: Passa i contenuti da un unico oggetto config in App.",
  "isCompleted": false
};

export default lesson02;
