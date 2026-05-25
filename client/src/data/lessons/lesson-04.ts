import type { CourseLesson } from "../lessons";

export const lesson04: CourseLesson = {
  id: 4,
  lessonNumber: 4,
  title: "Rendering Dinamico",
  module: "Modulo React",
  isCompleted: false,

  objectives: `• Renderizzare array di dati in React usando \`map()\` in modo leggibile e prevedibile
• Capire davvero cosa rappresenta la \`key\` e perche una key stabile evita bug sottili
• Progettare conditional rendering chiaro per stati diversi della UI
• Gestire empty state, count e feedback visivo senza duplicare logica
• Implementare rimozione di elementi in modo immutabile e immediatamente riflesso nella UI
• Distinguere tra dati sorgente, dati filtrati e valori derivati senza perdere consistenza
• Evitare anti-pattern comuni come index come key, filtri distruttivi e condizioni annidate poco leggibili`,

  topics: `1. Dal dato alla UI: \`map()\` come ponte tra array e componenti
Renderizzare dinamicamente significa trasformare dati in elementi visivi. In React lo facciamo quasi sempre con \`array.map()\`, creando un componente per ogni elemento.
👉 Vedi snippet 1.
Mental model: non stai "aggiungendo nodi al DOM" manualmente, stai descrivendo come la UI deve apparire dato un array.

2. La \`key\` come identita, non come silenziatore di warning
La \`key\` serve a far capire a React quale elemento della lista corrisponde a quale nodo renderizzato tra un render e l'altro.
👉 Vedi snippet 2.
Se usi una key instabile, React puo riutilizzare il nodo sbagliato e produrre comportamenti strani su input, animazioni, focus o stato locale dei child.

3. Perche evitare l'index come key nelle liste mutate
Usare l'indice come key sembra innocuo, ma diventa fragile quando aggiungi, rimuovi, riordini o filtri elementi.
Pro dell'index: rapido in demo statiche e liste davvero immutabili.
Contro: identita errata quando la posizione cambia.
Regola pratica: se la lista puo cambiare, usa un ID stabile del dato.

4. Conditional rendering: la UI deve esplicitare i suoi stati
Una schermata reale non e solo "mostra lista". Ha stati come lista piena, nessun risultato, submit in corso, errore o filtro senza match.
👉 Vedi snippet 3.
Piuttosto che nascondere parti via CSS, spesso e meglio non renderizzarle affatto quando non hanno senso nel flusso utente.

5. \`&&\`, ternary e early return: come scegliere
- \`&&\` funziona bene per dettagli opzionali brevi
- il ternary va bene per biforcazioni semplici tra due UI alternative
- per logica complessa, meglio una variabile intermedia o un return separato
👉 Vedi snippet 4.
Best practice: privilegia leggibilita e intenzione, non la forma piu corta.
⚠️ Attenzione al gotcha di \`&&\` con valori falsy numerici: \`{count && <List />}\` renderizza \`0\` a schermo quando \`count === 0\`, perche React mostra i numeri. Usa sempre \`{count > 0 && <List />}\` o un ternary esplicito.
👉 Vedi snippet 4b.

6. Empty states utili, non vuoti
Uno stato "nessun elemento" non deve sembrare un errore tecnico. Deve spiegare cosa sta succedendo e suggerire il prossimo passo.
👉 Vedi snippet 5.
Un empty state buono contiene contesto, tono corretto e una CTA chiara come "Aggiungi il primo task".

7. Dati filtrati senza distruggere la sorgente
Se hai una lista di task e applichi un filtro, il filtro dovrebbe produrre una vista derivata, non modificare la lista originale.
👉 Vedi snippet 6.
Errore tipico: usare \`setTasks(tasks.filter(...))\` per applicare un filtro temporaneo e perdere la sorgente completa.

8. Rimuovere elementi in modo immutabile
La rimozione da una lista React si fa quasi sempre con \`filter()\`, creando un nuovo array senza l'elemento scelto.
👉 Vedi snippet 7.
Questo mantiene il mental model coerente: descrivi il nuovo stato invece di mutare quello precedente.

9. Stato minimo, contatori derivati e UX coerente
Una task board puo mostrare totale task, completate, pendenti o messaggi diversi in base al filtro attivo. Questi valori spesso si derivano dalla stessa sorgente dati.
👉 Vedi snippet 8.
Salvare questi numeri in stato separato aggiunge rischio di incoerenza; derivarli rende il componente piu affidabile.

10. Caso studio reale: task list che cambia davvero nel tempo
In una mini task app professionale devi saper gestire:
- lista iniziale vuota o popolata
- rendering con key affidabili
- eliminazione immediata
- filtro per stato
- empty state globale e empty state di filtro
- messaggi comprensibili quando non ci sono risultati
👉 Vedi snippet 9.
Questa lezione e il ponte naturale tra form controllati della lezione 3 e lifting state/filtering della lezione 5.`,

  commands: `{tasks.map((task) => <TaskItem key={task.id} task={task} />)}
{tasks.length === 0 && <EmptyState />}
{isLoading ? <Loader /> : <TaskList />}
{filteredTasks.length > 0 ? <TaskList tasks={filteredTasks} /> : <NoResults />}
const filteredTasks = tasks.filter((task) => task.status === activeFilter)
setTasks((prev) => prev.filter((task) => task.id !== id))
const completedCount = tasks.filter((task) => task.done).length
const hasTasks = tasks.length > 0`,

  reflectionQuestions: `Perche la \`key\` e un'identita del dato e non un semplice requisito sintattico di React?
In quali casi usare l'indice come key puo sembrare funzionare, e perche rimane comunque fragile?
Quando preferisci \`&&\`, quando il ternary e quando invece e meglio preparare una variabile prima del \`return\`?
Qual e la differenza tra empty state globale e empty state dovuto a un filtro attivo?
Che problemi nascono se applichi un filtro sovrascrivendo direttamente la lista originale?
Perche la rimozione con \`filter()\` rispetta meglio il mental model di React rispetto a una mutazione diretta?
Quali valori della tua task board salveresti nello stato e quali invece deriveresti a ogni render?
Quando e meglio non renderizzare un blocco UI invece di nasconderlo con CSS?`,

  homework: `Esercizio 1: Crea un componente \`TaskList\` che riceve un array di task e li renderizza con \`map()\` usando \`key\` stabili.

Esercizio 2: Costruisci una \`TaskBoard\` con:
- lista iniziale di almeno 5 task mock
- bottone elimina su ogni task
- aggiornamento immediato della UI dopo la rimozione
- messaggio "nessun task disponibile" quando la lista diventa vuota

Esercizio 3: Aggiungi un filtro \`all | open | done\` senza modificare la sorgente originale dei task.
Se il filtro non produce risultati, mostra uno stato dedicato tipo "Nessun task completato".

Esercizio 4: Mostra nella UI:
- numero totale task
- task completate
- task visibili dopo il filtro
Questi valori devono essere derivati, non salvati in stato separato.

Bonus 1: evidenzia visivamente il filtro attivo.
Bonus 2: aggiungi una CTA nell'empty state per reinserire task mock o crearne uno nuovo.
Bonus 3: crea un bug demo usando \`index\` come key, poi documenta in un commento perche puo rompersi quando rimuovi il primo elemento.`,

  resources: `https://react.dev/learn/rendering-lists
https://react.dev/learn/conditional-rendering
https://react.dev/learn/choosing-the-state-structure
https://react.dev/learn/updating-arrays-in-state
/snapshots/ui-states.svg`,

  bestPractices: `Usa key stabili dal dato
La key deve rappresentare l'identita reale dell'elemento, non la sua posizione momentanea nella lista.
---
Deriva le viste, non distruggere la sorgente
Filtri, ordinamenti e conteggi dovrebbero nascere dai dati base, non sostituirli se non e davvero quella la transizione di stato voluta.
---
Rendi espliciti gli stati della UI
Loading, empty, no-results, success ed error non sono eccezioni: sono parte della progettazione dell'interfaccia.
---
Tieni le condizioni leggibili
Se il JSX inizia a sembrare un puzzle di ternary annidati, fermati e sposta parte della logica in variabili o componenti dedicati.
---
Rimuovi in modo immutabile
\`filter()\` e la forma piu chiara e sicura per eliminare elementi da un array in stato.
---
Progetta empty state con intenzione
Uno stato vuoto deve orientare l'utente, non limitarsi a comunicare assenza di dati.
---
Non duplicare conteggi o flag derivabili
Se puoi calcolare \`hasTasks\`, \`completedCount\` o \`visibleTasks\` dai dati correnti, non salvarli separatamente.
---
Mantieni separati dato, vista e presentazione
La lista sorgente rappresenta il dominio; filtro, ordinamento e rendering sono trasformazioni della vista.`,

  workflow: `1. Parti dalla struttura dati: ogni task deve avere almeno un ID stabile, un titolo e uno stato.
2. Renderizza la lista base con \`map()\` prima di introdurre filtri o condizioni.
3. Scegli subito una \`key\` affidabile basata sul dato, non sulla posizione.
4. Definisci gli stati della UI che vuoi coprire: lista piena, lista vuota, nessun risultato da filtro.
5. Calcola eventuali viste derivate in variabili leggibili, ad esempio \`filteredTasks\` o \`completedCount\`.
6. Implementa la rimozione con \`filter()\` sullo stato sorgente.
7. Solo alla fine rifinisci empty state, CTA e micro-copy per rendere la UI comprensibile anche senza spiegazioni esterne.`,

  snippets: `1. Renderizzare una lista con map
tsx
type Task = {
  id: string;
  title: string;
};

function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
}
---
2. Key stabile corretta
tsx
type Task = {
  id: string;
  title: string;
};

function TaskRows({ tasks }: { tasks: Task[] }) {
  return tasks.map((task) => (
    <TaskRow key={task.id} task={task} />
  ));
}
---
3. Conditional rendering semplice
tsx
function TaskSection({ tasks }: { tasks: { id: string; title: string }[] }) {
  if (tasks.length === 0) {
    return <p>Nessun task disponibile.</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
}
---
4. Scegliere tra && e ternary
tsx
function TaskSummary({
  hasOverdue,
  total,
}: {
  hasOverdue: boolean;
  total: number;
}) {
  return (
    <section>
      <h2>{total > 0 ? "Task totali: " + total : "Nessun task"}</h2>
      {hasOverdue && <p>Hai task in scadenza oggi.</p>}
    </section>
  );
}
---
4b. Gotcha: && con valore numerico 0
tsx
// BUG: se tasks.length e 0, React renderizza "0" a schermo
function BuggyCounter({ tasks }: { tasks: { id: string }[] }) {
  return (
    <div>
      {tasks.length && <p>Hai {tasks.length} task</p>}
    </div>
  );
}

// FIX: confronto esplicito che produce un booleano
function FixedCounter({ tasks }: { tasks: { id: string }[] }) {
  return (
    <div>
      {tasks.length > 0 && <p>Hai {tasks.length} task</p>}
    </div>
  );
}
---
5. Empty state con CTA
tsx
function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div>
      <h3>Nessun task presente</h3>
      <p>Aggiungi il primo task per iniziare a organizzare il lavoro.</p>
      <button onClick={onCreate}>Crea task</button>
    </div>
  );
}
---
6. Vista filtrata derivata
tsx
type Filter = "all" | "open" | "done";

function TaskBoard({
  tasks,
  filter,
}: {
  tasks: { id: string; done: boolean }[];
  filter: Filter;
}) {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "done") return task.done;
    return !task.done;
  });

  return <TaskList tasks={filteredTasks} />;
}
---
7. Rimozione immutabile con filter
tsx
function removeTask(id: string) {
  setTasks((prev) => prev.filter((task) => task.id !== id));
}
---
8. Conteggi derivati
tsx
const totalCount = tasks.length;
const completedCount = tasks.filter((task) => task.done).length;
const visibleCount = filteredTasks.length;
const hasTasks = totalCount > 0;
---
9. Empty state globale vs empty state di filtro
tsx
function TaskBoard({
  tasks,
  filteredTasks,
}: {
  tasks: { id: string; title: string }[];
  filteredTasks: { id: string; title: string }[];
}) {
  if (tasks.length === 0) {
    return <p>Non hai ancora creato task.</p>;
  }

  if (filteredTasks.length === 0) {
    return <p>Nessun task corrisponde al filtro selezionato.</p>;
  }

  return (
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
}`,
};

export default lesson04;
