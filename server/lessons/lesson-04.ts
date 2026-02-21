import type { InsertLesson } from "../../shared/schema.ts";

export const lesson04: InsertLesson = {
  lessonNumber: 4,
  title: "Rendering Dinamico",
  module: "Modulo React",
  objectives: `• Renderizzare liste in modo efficiente
• Usare condizioni per stati UI diversi
• Gestire empty state e azioni utente`,
  topics: `1. map() e key stabili
2. Rendering condizionale con && e ternary
3. Filtri e ordinamenti senza mutazioni
4. Empty state con call-to-action`,
  commands: `{items.map(item => <Row key={item.id} />)} - Rendering lista
{isLoading ? <Loader /> : <Content />} - Stato condizionale
setItems(prev => prev.filter(...)) - Rimozione immutabile`,
  reflectionQuestions: `Perché non usare l'indice come key in liste modificabili?
Quando ha senso nascondere con CSS invece di non renderizzare?`,
  homework: `Esercizio 1: Costruisci una task board con lista, stato "vuoto" e badge priorita.
Esercizio 2: Aggiungi eliminazione con conferma inline e aggiornamento immediato UI.`
};
