import type { CourseLesson } from "../lessons";

export const lesson06: CourseLesson = {
  "id": 6,
  "lessonNumber": 6,
  "title": "Side Effects e Persistenza Dati",
  "module": "Modulo React",
  "objectives": "• Usare useEffect con dipendenze corrette\n• Salvare dati in localStorage\n• Gestire fetch con loading/error",
  "topics": "1. Effetti su mount/update/unmount: quando usare ciascun caso\n2. Persistenza JSON: serialize/parse con fallback sicuro\n3. Cleanup di timer/listener: prevenire leak e aggiornamenti fantasma\n4. AbortController: interrompere fetch in uscita pagina",
  "commands": "useEffect(() => { ... }, [])\nlocalStorage.setItem('tasks', JSON.stringify(tasks))\nreturn () => controller.abort()",
  "reflectionQuestions": "Che succede se mancano dipendenze in useEffect?\nPerché la cleanup evita memory leak?",
  "homework": "Esercizio 1: Salva e ripristina task da localStorage.\nEsercizio 2: Crea fetch con stati loading/success/error.",
  "isCompleted": false
};

export default lesson06;
