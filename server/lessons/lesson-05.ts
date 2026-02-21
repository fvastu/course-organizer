import type { InsertLesson } from "@shared/schema";

export const lesson05: InsertLesson = {
  lessonNumber: 5,
  title: "Stato Avanzato e Composizione",
  module: "Modulo React",
  objectives: `• Sollevare lo stato nel punto corretto
• Evitare duplicazione con stato derivato
• Separare componenti smart e presentazionali`,
  topics: `1. Lifting state up e callback props
2. Stato derivato (filter/search) vs stato duplicato
3. children prop e layout componibili
4. Introduzione a Context per prop drilling profondo`,
  commands: `const filtered = tasks.filter(...) - Stato derivato
<TaskList tasks={filtered} onDelete={handleDelete} /> - Data flow
function Card({ children }) { ... } - Composizione`,
  reflectionQuestions: `Come scegli dove vive uno stato condiviso?
Perché duplicare stato filtrato e sorgente crea bug?`,
  homework: `Esercizio 1: Porta tutta la logica task nel componente root e rendi i figli presentazionali.
Esercizio 2: Implementa ricerca + filtro (Tutti/Attivi/Completati) combinati in tempo reale.`
};
