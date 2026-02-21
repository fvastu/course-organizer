import type { InsertLesson } from "../../shared/schema.ts";

export const lesson03: InsertLesson = {
  lessonNumber: 3,
  title: "Stato e Interazioni",
  module: "Modulo React",
  objectives: `• Gestire stato locale con useState
• Implementare form controllati
• Validare input e gestire eventi`,
  topics: `1. useState e ciclo di render
2. Event handling (onChange, onSubmit)
3. Aggiornamenti immutabili di oggetti e array
4. Messaggi di errore in tempo reale`,
  commands: `const [value, setValue] = useState('') - Stato stringa
e.preventDefault() - Blocca submit nativo
setState(prev => ...) - Aggiornamento funzionale`,
  reflectionQuestions: `Perché lo stato non cambia "subito" dopo setState?
Quale differenza c'è tra input controllato e non controllato?`,
  homework: `Esercizio 1: Realizza un form login con validazione live su email e password.
Esercizio 2: Crea un contatore con step variabile (+1, +5, +10) e reset.`
};
