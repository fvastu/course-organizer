import type { InsertLesson } from "../../shared/schema.ts";

export const lesson03: InsertLesson = {
  lessonNumber: 3,
  title: "Stato e Interazioni",
  module: "Modulo React",
  objectives: `• Distinguere stato, props, variabili locali e valori derivati
• Usare useState con update funzionali corretti
• Implementare eventi e form controllati con buona UX
• Aggiornare array e oggetti in modo immutabile
• Valutare pro e contro di shape di stato diverse`,
  topics: `1. Stato come memoria del componente tra i render
2. useState, batching e update funzionali
3. Event handling dichiarativo con onClick, onChange e onSubmit
4. Controlled vs uncontrolled input
5. Validazione progressiva e timing degli errori
6. Shape dello stato: campi separati vs oggetto form
7. Immutabilita di array e oggetti
8. Stato minimo e valori derivati`,
  commands: `const [value, setValue] = useState("") - Stato base controllato
setCount((prev) => prev + 1) - Update funzionale sicuro
e.preventDefault() - Blocca il submit nativo del browser
setForm((prev) => ({ ...prev, email: value })) - Update immutabile di oggetto
setTasks((prev) => prev.filter((task) => task.id !== id)) - Update immutabile di array`,
  reflectionQuestions: `Perche lo stato non cambia "subito" dopo setState?
Quando conviene usare un form controllato invece di uno uncontrolled?
Quali valori del componente puoi derivare senza salvarli nello stato?
Che problemi nascono se muti direttamente array o oggetti?`,
  homework: `Esercizio 1: realizza un form login controllato con validazione progressiva su email e password.
Esercizio 2: crea un contatore con +1, +2, reset e update funzionali.
Esercizio 3: costruisci un task form con titolo obbligatorio, priorita e reset solo dopo submit riuscito.`
};
