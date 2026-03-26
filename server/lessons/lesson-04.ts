import type { InsertLesson } from "../../shared/schema.ts";

export const lesson04: InsertLesson = {
  lessonNumber: 4,
  title: "Rendering Dinamico",
  module: "Modulo React",
  objectives: `• Renderizzare liste con map() e key stabili
• Gestire rendering condizionale per stati diversi della UI
• Implementare empty state chiari e utili
• Rimuovere elementi in modo immutabile con aggiornamento immediato
• Derivare viste filtrate e conteggi senza duplicare stato`,
  topics: `1. map() come trasformazione da dato a UI
2. Key stabili e perche evitare index su liste mutate
3. Conditional rendering con &&, ternary ed early return
4. Empty state globale vs no-results da filtro
5. Rimozione con filter() e aggiornamenti immutabili
6. Conteggi e viste derivate dalla stessa sorgente dati`,
  commands: `{tasks.map((task) => <TaskItem key={task.id} task={task} />)} - Lista renderizzata da array
{tasks.length === 0 ? <EmptyState /> : <TaskList tasks={tasks} />} - Stato vuoto esplicito
const filteredTasks = tasks.filter((task) => task.done) - Vista filtrata derivata
setTasks((prev) => prev.filter((task) => task.id !== id)) - Rimozione immutabile
const completedCount = tasks.filter((task) => task.done).length - Conteggio derivato`,
  reflectionQuestions: `Perche la key rappresenta l'identita del dato e non la posizione nella lista?
Quando conviene usare &&, quando il ternary e quando una variabile intermedia?
Che differenza c'e tra lista vuota e filtro senza risultati?
Cosa rischi se applichi un filtro sovrascrivendo la lista originale?`,
  homework: `Esercizio 1: realizza una task list con almeno 5 elementi mock, renderizzati con key stabili.
Esercizio 2: aggiungi rimozione di un task con aggiornamento immediato e stato "nessun task disponibile".
Esercizio 3: implementa un filtro all/open/done senza modificare la sorgente originale dei task.
Esercizio 4: mostra totale task, completate e visibili usando valori derivati.`
};
