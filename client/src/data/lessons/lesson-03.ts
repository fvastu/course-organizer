import type { CourseLesson } from "../lessons";

export const lesson03: CourseLesson = {
  "id": 3,
  "lessonNumber": 3,
  "title": "Stato e Interazioni",
  "module": "Modulo React",
  "objectives": "• Gestire stato con useState\n• Creare form controllati\n• Gestire eventi e validazione",
  "topics": "1. useState e render: ciclo aggiornamento stato -> rerender\n2. Eventi onChange/onSubmit: gestione form controllati passo-passo\n3. Immutabilita di array e oggetti: spread operator e update sicuri\n4. Feedback errori live: validazione email/password con messaggi guidati",
  "commands": "const [value, setValue] = useState('')\ne.preventDefault() - Blocca submit\nsetState(prev => ...) - Aggiornamento funzionale",
  "reflectionQuestions": "Perché setState non aggiorna subito la variabile?\nQuando usare input controllato?",
  "homework": "Esercizio 1: Costruisci un form login con validazione live.\nEsercizio 2: Crea un contatore con step variabile e reset.",
  "isCompleted": false
};

export default lesson03;
