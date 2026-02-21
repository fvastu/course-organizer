import type { CourseLesson } from "../lessons";

export const lesson04: CourseLesson = {
  "id": 4,
  "lessonNumber": 4,
  "title": "Rendering Dinamico",
  "module": "Modulo React",
  "objectives": "• Renderizzare liste in modo corretto\n• Gestire condizioni UI\n• Progettare empty state utili",
  "topics": "1. map() e key stabili: perche usare id e non index\n2. Rendering condizionale: ternary, &&, fallback vuoto\n3. Filtri senza mutazione: filter/sort su copie, non sullo stato originale\n4. Empty states con CTA: esempio 'nessun task' con invito all'azione",
  "commands": "{items.map(item => <Row key={item.id} />)}\n{isLoading ? <Loader /> : <Content />}\nsetItems(prev => prev.filter(...))",
  "reflectionQuestions": "Perché evitare index come key in liste modificabili?\nQuando mostrare un componente vs nasconderlo via CSS?",
  "homework": "Esercizio 1: Crea una task board con empty state.\nEsercizio 2: Aggiungi eliminazione con conferma inline.",
  "isCompleted": false
};

export default lesson04;
