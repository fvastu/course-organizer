import type { CourseLesson } from "../lessons";

export const lesson05: CourseLesson = {
  "id": 5,
  "lessonNumber": 5,
  "title": "Stato Avanzato e Composizione",
  "module": "Modulo React",
  "objectives": "• Sollevare lo stato correttamente\n• Usare stato derivato\n• Separare logica e presentazione",
  "topics": "1. Lifting state up: portare lo stato al parent condiviso\n2. Callback props: comunicazione child -> parent con azioni tipizzate\n3. Stato derivato per filtri: evitare duplicazioni che creano bug\n4. children prop e layout: wrapper componibili per UI scalabile",
  "commands": "const filtered = tasks.filter(...)\n<TaskList tasks={filtered} onDelete={handleDelete} />\nfunction Card({ children }) { ... }",
  "reflectionQuestions": "Come decidere il livello giusto dello stato condiviso?\nPerché duplicare stato porta incoerenze?",
  "homework": "Esercizio 1: Porta la logica task nel componente root.\nEsercizio 2: Implementa ricerca + filtri combinati.",
  "isCompleted": false
};

export default lesson05;
