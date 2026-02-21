import type { CourseLesson } from "../lessons";

export const lesson02: CourseLesson = {
  "id": 2,
  "lessonNumber": 2,
  "title": "Basi di React",
  "module": "Modulo React",
  "objectives": "• Capire cos'e React e in quali scenari conviene usarlo\n• Comprendere il Virtual DOM e il processo di reconciliation\n• Creare componenti riutilizzabili con props tipizzate",
  "topics": "1. Cos'e React: libreria UI dichiarativa orientata a componenti, ideale per interfacce complesse e aggiornamenti frequenti\n2. Perche si usa React: riuso, manutenibilita, ecosistema maturo, rendering prevedibile\n3. Virtual DOM: rappresentazione in memoria della UI; React confronta versioni successive e applica solo le modifiche minime al DOM reale\n4. Reconciliation e rendering: ruolo delle key, rendering efficiente e aggiornamenti granulari\n5. JSX e componenti funzione: regole base, composizione e separazione responsabilita\n6. Setup con Vite + TypeScript: struttura progetto, convenzioni e avvio rapido",
  "commands": "npm create vite@latest my-app -- --template react-ts - Crea progetto React + TypeScript. Esempio: npm create vite@latest my-app -- --template react-ts\ncd my-app - Entra nella cartella del progetto appena creato. Esempio: cd my-app\nnpm install - Installa dipendenze progetto. Esempio: npm install\nnpm run dev - Avvia server sviluppo locale con hot reload. Esempio: npm run dev\nnpm run build - Produce build ottimizzata per produzione. Esempio: npm run build\nnpm run preview - Verifica build di produzione in locale. Esempio: npm run preview\nnpm install react-router-dom - Aggiunge routing client-side a una SPA React. Esempio: npm install react-router-dom\nnpm install -D @types/react @types/react-dom - Installa type definitions aggiornate per TypeScript. Esempio: npm install -D @types/react @types/react-dom\nnpm run lint - Controlla standard del codice e possibili errori comuni. Esempio: npm run lint",
  "reflectionQuestions": "In quali casi React e preferibile rispetto a pagine statiche o jQuery-style DOM manipulation?\nIn che modo il Virtual DOM riduce lavoro inutile sul DOM reale?",
  "homework": "Esercizio 1: Scrivi in 10 righe differenza tra DOM reale e Virtual DOM con un esempio concreto.\nEsercizio 2: Crea una mini pagina React con Header, Hero e Card riusabili via props.\nEsercizio 3: Aggiungi una lista con key corrette e descrivi cosa cambierebbe usando index come key.",
  "isCompleted": false
};

export default lesson02;
