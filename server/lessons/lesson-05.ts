import type { InsertLesson } from "../../shared/schema.ts";

export const lesson05: InsertLesson = {
  lessonNumber: 5,
  title: "Stato Avanzato e Composizione",
  module: "Modulo React",
  objectives: `• Sollevare lo stato nel punto corretto senza centralizzare prematuramente
• Passare callback tipizzate dai parent ai child per gestire azioni utente
• Derivare viste filtrate, ricerche e conteggi senza duplicare stato
• Separare componenti smart e presentazionali con flusso dati leggibile
• Usare children e composizione per layout riusabili
• Riconoscere quando il prop drilling e normale e quando inizia a pesare`,
  topics: `1. Lifting state up e callback props
2. Come trovare il livello giusto dello stato
3. Callback props: il child notifica, il parent decide
4. Stato derivato (filter/search) vs stato duplicato
5. Separare logica e presentazione (smart vs presentazionali)
6. children prop e layout componibili
7. Prop drilling: quando e normale e quando diventa un problema
8. Modellare una task board reale con flusso parent-child
9. Anti-pattern da riconoscere`,
  commands: `const [tasks, setTasks] = useState<Task[]>([]) - stato sorgente nel parent
const filteredTasks = tasks.filter(...) - vista derivata, non nuovo stato
<TaskToolbar query={query} onQueryChange={setQuery} /> - child controllato
<TaskList tasks={filteredTasks} onDeleteTask={handleDeleteTask} /> - dati giu, eventi su
function Card({ children }: { children: React.ReactNode }) { ... } - composizione con children
const doneCount = tasks.filter((t) => t.done).length - conteggio derivato`,
  reflectionQuestions: `Come capisci se uno stato deve vivere nel parent immediato o ancora piu in alto?
Qual e la differenza pratica tra passare una callback onDeleteTask e passare direttamente setTasks?
Perche mantenere una lista filtrata separata dallo stato sorgente tende a produrre bug?
In quali casi un po' di prop drilling e del tutto accettabile?
Quali componenti della tua task board dovrebbero essere presentazionali e quali gestire logica?
Quando la prop children rende davvero il codice piu semplice, e quando invece e superflua?`,
  homework: `Esercizio 1: Crea una TaskBoard con stato nel parent per lista task, query di ricerca e filtro all/open/done.
Esercizio 2: Separa TaskToolbar, TaskList e TaskCard come componenti presentazionali che emettono eventi.
Esercizio 3: Implementa ricerca per testo + filtro per stato + rimozione + toggle, tutto derivato da un'unica sorgente.
Esercizio 4: Crea un wrapper Panel o Card con children e riutilizzalo in almeno 3 punti della UI.`
};
