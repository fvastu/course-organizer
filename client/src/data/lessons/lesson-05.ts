import type { CourseLesson } from "../lessons";

export const lesson05: CourseLesson = {
  id: 5,
  lessonNumber: 5,
  title: "Stato Avanzato e Composizione",
  module: "Modulo React",
  isCompleted: false,

  objectives: `• Capire quando il problema non e piu "scrivere JSX", ma distribuire bene responsabilita e stato
• Applicare il lifting state up senza trasformare il parent in un componente ingestibile
• Passare callback chiare e tipizzate dai parent ai child per gestire azioni utente
• Usare stato derivato per ricerca, filtri, sorting e conteggi senza duplicazioni fragili
• Sfruttare children e composizione per costruire layout riusabili e componenti piu flessibili
• Separare componenti smart e presentazionali con un flusso dati leggibile
• Evitare anti-pattern frequenti come prop drilling inutile, stato duplicato e child troppo accoppiati`,

  topics: `1. Il vero problema: dove deve vivere lo stato
Quando due o piu componenti hanno bisogno dello stesso dato, lo stato va spostato nel loro antenato comune piu vicino. Questo e il principio del lifting state up.
👉 Vedi snippet 1.
Obiettivo: avere una sola sorgente di verita e lasciare ai child la sola responsabilita di mostrare dati o emettere eventi.

2. Come trovare il livello giusto dello stato
Portare tutto nello stesso parent non e sempre la soluzione migliore. Il criterio pratico e: lo stato deve vivere nel componente piu in alto necessario, ma non piu in alto del necessario.
Se solo \`TaskToolbar\` e \`TaskList\` usano \`query\`, lo stato puo stare in \`TaskBoard\`, non per forza in \`App\`.
Troppo in alto: piu prop drilling e componenti rumorosi.
Troppo in basso: dati duplicati e UI che si disallineano.

3. Callback props: il child non modifica il mondo da solo
In React i dati scendono, gli eventi risalgono. Un child riceve i dati via props e notifica il parent tramite callback come \`onDeleteTask\`, \`onFilterChange\`, \`onSubmit\`.
👉 Vedi snippet 2.
Best practice: usa nomi che descrivono l'intenzione, non l'implementazione. \`onQueryChange\` comunica molto meglio di \`setQuery\` passato direttamente ovunque.

4. Stato derivato per filtri e ricerca
Una ricerca testuale o un filtro per stato dovrebbero quasi sempre essere viste derivate dalla lista base, non una seconda lista persistita in stato.
👉 Vedi snippet 3.
Pro: meno inconsistenze, meno reset da ricordare, meno bug quando cambiano i dati sorgente.
Errore comune: salvare sia \`tasks\` sia \`filteredTasks\` nello stato e poi dimenticare di aggiornarli entrambi.

5. Separare logica e presentazione
Un componente puo essere:
- container o smart: gestisce stato, trasformazioni, callback
- presentazionale: riceve dati gia pronti e si concentra sulla UI
👉 Vedi snippet 4.
Non e una regola rigida, ma un buon mental model per mantenere i componenti leggibili quando il progetto cresce.

6. Composizione tramite children
La prop \`children\` permette di creare wrapper riusabili come Card, Modal, Section, Stack, SidebarLayout.
👉 Vedi snippet 5.
Vantaggio: separi struttura e contenuto. Il wrapper definisce stile, spacing e layout; il contenuto cambia senza duplicare markup.

7. Prop drilling: quando e normale e quando inizia a pesare
Passare due o tre livelli di props e perfettamente normale. Diventa un problema quando componenti intermedi ricevono props che non usano davvero.
Prima di introdurre Context o librerie globali, chiediti:
- il problema e davvero la profondita?
- oppure la responsabilita e ancora poco chiara?
Per un corso junior, una buona composizione batte spesso un contesto prematuro.

8. Modellare una task board reale
Una board con ricerca, filtro e delete tipicamente ha questo flusso:
- il parent possiede \`tasks\`, \`query\`, \`filter\`
- la toolbar emette eventi
- la lista mostra i task derivati
- le card emettono azioni locali come toggle o delete
👉 Vedi snippet 6.
Questo pattern e riusabile in dashboard, cataloghi, inbox e pannelli admin.

9. Anti-pattern da riconoscere
- Child che muta un array ricevuto via props
- Parent che passa direttamente tutto a tutti
- Stato duplicato in toolbar e lista
- Dati trasformati in un punto e filtrati in un altro senza naming chiaro
- Wrapper che fa sia layout sia business logic

10. Regola finale di progettazione
Se un componente sta diventando difficile da nominare, probabilmente sta facendo troppe cose.
Se per capire chi cambia cosa devi inseguire cinque file, il flusso dati va semplificato.
Se la stessa informazione esiste in due stati diversi, quasi certamente hai introdotto una fonte di bug evitabile.
Questa lezione prende le basi di rendering dinamico della lezione 4 e le scala verso architetture multi-componente. La lezione 6 introdurra gli effetti collaterali per connettere questa struttura al mondo esterno.`,

  commands: `const [tasks, setTasks] = useState<Task[]>([]) - stato sorgente nel parent
const [query, setQuery] = useState("") - filtro di ricerca condiviso
const filteredTasks = tasks.filter(...) - vista derivata, non nuovo stato
<TaskToolbar query={query} onQueryChange={setQuery} /> - child controllato dal parent
<TaskList tasks={filteredTasks} onDeleteTask={handleDeleteTask} /> - dati giu, eventi su
function Card({ children }: { children: React.ReactNode }) { ... } - composizione UI con children`,

  reflectionQuestions: `Come capisci se uno stato deve vivere nel parent immediato o ancora piu in alto?
Qual e la differenza pratica tra passare una callback \`onDeleteTask\` e passare direttamente \`setTasks\`?
Perche mantenere una lista filtrata separata dallo stato sorgente tende a produrre bug appena la UI cresce?
In quali casi un po' di prop drilling e del tutto accettabile?
Quali componenti della tua task board dovrebbero essere presentazionali e quali invece gestire logica?
Quando la prop \`children\` rende davvero il codice piu semplice, e quando invece e superflua?`,

  homework: `Esercizio 1: Crea una \`TaskBoard\` con stato nel parent per:
- lista task
- query di ricerca
- filtro \`all | open | done\`

Esercizio 2: Crea i componenti:
- \`TaskToolbar\`
- \`TaskList\`
- \`TaskCard\`
La toolbar deve emettere eventi, non gestire la lista.

Esercizio 3: Implementa:
- ricerca per testo
- filtro per stato
- rimozione task
- toggle completato
Tutte queste viste devono derivare da un'unica sorgente di verita.

Esercizio 4: Crea un wrapper \`Panel\` o \`Card\` che usa \`children\` e riutilizzalo in almeno 3 punti diversi della UI.

Bonus 1: separa la logica di filtro in una funzione pura testabile.
Bonus 2: aggiungi un componente \`TaskSummary\` che riceve solo valori gia derivati.
Bonus 3: annota in un commento quali props rappresentano dati e quali invece eventi.`,

  resources: `https://react.dev/learn/sharing-state-between-components
https://react.dev/learn/passing-props-to-a-component
https://react.dev/learn/responding-to-events
https://react.dev/learn/conditional-rendering
/snapshots/composition-flow.svg`,

  bestPractices: `Alza lo stato solo quanto basta
Se due componenti devono condividere un dato, sposta lo stato nel loro antenato comune piu vicino. Evita sia la duplicazione sia il centralizzare tutto prematuramente.
---
I child descrivono eventi, non manipolano il parent
Passa callback come \`onDeleteTask\`, \`onToggleTask\`, \`onQueryChange\`. La responsabilita dell'update resta nel parent.
---
Deriva le viste dalla sorgente
Filtri, ricerche, ordinamenti e conteggi dovrebbero nascere dalla stessa lista base. Meno sorgenti di verita, meno incoerenze.
---
Dai nomi chiari alle props
\`tasks\`, \`visibleTasks\`, \`onFilterChange\`, \`onTaskSelect\` spiegano molto piu di nomi generici come \`data\` o \`handle\`.
---
Usa children per layout riusabili
Se stai copiando spesso la stessa struttura visiva, crea un wrapper compositivo invece di duplicare markup.
---
Separa logica e presentazione quando il file inizia a pesare
Un componente che filtra, ordina, muta dati e gestisce layout puo spesso essere spezzato in container + child presentazionali.
---
Accetta un po' di prop drilling normale
Non introdurre Context o stato globale al primo fastidio. Prima prova a migliorare gerarchia e naming.`,

  workflow: `1. Elenca quali dati cambiano davvero e chi li usa.
2. Trova il piu basso antenato comune per ogni stato condiviso.
3. Mantieni nel parent la logica di update e passa callback chiare ai child.
4. Calcola ricerche, filtri e conteggi come valori derivati nel parent o in helper puri.
5. Tieni i componenti presentazionali leggeri: ricevono props e rendono UI.
6. Estrai wrapper con \`children\` quando noti markup strutturale ripetuto.
7. Prima di chiudere il refactor, controlla che esista una sola sorgente di verita per ogni informazione importante.`,

  snippets: `1. Lifting state up essenziale
tsx
type Task = { id: string; title: string; done: boolean };

function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <>
      <TaskForm onAddTask={(task) => setTasks((prev) => [...prev, task])} />
      <TaskList tasks={tasks} />
    </>
  );
}
---
2. Callback props tipizzate
tsx
type TaskCardProps = {
  task: { id: string; title: string };
  onDeleteTask: (id: string) => void;
};

function TaskCard({ task, onDeleteTask }: TaskCardProps) {
  return <button onClick={() => onDeleteTask(task.id)}>Elimina</button>;
}
---
3. Stato derivato per ricerca e filtro
tsx
const visibleTasks = tasks.filter((task) => {
  const matchesQuery = task.title.toLowerCase().includes(query.toLowerCase());
  const matchesFilter =
    filter === "all" ? true : filter === "done" ? task.done : !task.done;

  return matchesQuery && matchesFilter;
});
---
4. Container + componente presentazionale
tsx
function TaskBoard() {
  const [tasks] = useState(seedTasks);
  const doneCount = tasks.filter((task) => task.done).length;

  return <TaskSummary total={tasks.length} done={doneCount} />;
}

function TaskSummary({ total, done }: { total: number; done: number }) {
  return <p>{done} / {total} completate</p>;
}
---
5. Wrapper con children
tsx
function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border p-4">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
---
6. Flusso completo board -> toolbar -> list
tsx
type Task = { id: string; title: string; done: boolean };

function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(seedTasks);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "open" | "done">("all");

  const visibleTasks = tasks.filter((task) => {
    const matchesQuery = task.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter =
      filter === "all" ? true : filter === "done" ? task.done : !task.done;
    return matchesQuery && matchesFilter;
  });

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <>
      <TaskToolbar
        query={query}
        filter={filter}
        onQueryChange={setQuery}
        onFilterChange={setFilter}
      />
      <TaskList tasks={visibleTasks} onDeleteTask={handleDeleteTask} />
      <TaskSummary total={tasks.length} visible={visibleTasks.length} />
    </>
  );
}
---
7. Anti-pattern: stato duplicato vs derivato
tsx
// SBAGLIATO: due stati che devono restare sincronizzati
const [tasks, setTasks] = useState<Task[]>(seedTasks);
const [filteredTasks, setFilteredTasks] = useState<Task[]>(seedTasks);

// Ogni volta che tasks cambia, devi ricordarti di aggiornare anche filteredTasks.
// Se dimentichi, la UI mostra dati stale.

// CORRETTO: una sola sorgente, una vista derivata
const [tasks, setTasks] = useState<Task[]>(seedTasks);
const filteredTasks = tasks.filter((task) => task.done);
// filteredTasks e sempre coerente con tasks, zero rischio di disallineamento.`,
};

export default lesson05;
