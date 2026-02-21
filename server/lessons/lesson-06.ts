import type { InsertLesson } from "../../shared/schema.ts";

export const lesson06: InsertLesson = {
  lessonNumber: 6,
  title: "Side Effects e Persistenza Dati",
  module: "Modulo React",
  objectives: `• Usare useEffect con dipendenze corrette
• Persistenza stato con localStorage
• Gestire fetch con loading/error/cleanup`,
  topics: `1. Effetti: mount, update, unmount
2. localStorage con JSON.parse/stringify
3. Cleanup di timer e listener
4. AbortController per fetch annullabile`,
  commands: `useEffect(() => { ... }, []) - Esegue al mount
localStorage.setItem('tasks', JSON.stringify(tasks)) - Persistenza
return () => controller.abort() - Cleanup richiesta`,
  reflectionQuestions: `Che bug nasce da dipendenze mancanti in useEffect?
Perché serve cleanup prima del re-run di un effetto?`,
  homework: `Esercizio 1: Salva automaticamente una lista task su localStorage e ripristinala all'avvio.
Esercizio 2: Carica dati da API con stati loading/success/error e bottone Riprova.`
};
