import type { CourseLesson } from "../lessons";

export const lesson03: CourseLesson = {
  id: 3,
  lessonNumber: 3,
  title: "Stato e Interazioni",
  module: "Modulo React",
  isCompleted: false,

  objectives: `• Capire con precisione differenza tra stato, props, variabili locali e valori derivati
• Usare \`useState\` con il giusto mental model, evitando letture stale e update fragili
• Gestire eventi React in modo dichiarativo, leggibile e testabile
• Costruire form controllati chiari, accessibili e con validazione progressiva
• Scegliere consapevolmente tra stato separato, stato a oggetto e valori derivati
• Aggiornare array e oggetti in modo immutabile, prevedibile e sicuro
• Riconoscere pro, contro e limiti di diversi approcci comuni nei componenti interattivi
• Evitare gli anti-pattern piu frequenti che generano bug UX e codice difficile da mantenere`,

  topics: `1. Cos'e davvero lo stato in React
Lo stato e la memoria del componente tra un render e il successivo. Se un dato puo cambiare nel tempo e il suo cambiamento deve riflettersi nella UI, probabilmente e stato.
👉 Vedi snippet 1.
Nota pratica: una variabile normale si ricalcola a ogni render, lo stato no.

2. Stato, props, variabili locali e valori derivati
- Props: dati ricevuti dal parent, da non modificare.
- Stato: dati che il componente possiede e aggiorna.
- Variabili locali: utili per calcoli temporanei dentro il render o dentro un handler.
- Valori derivati: dati calcolabili da altri dati gia disponibili.
Pro del tenere un valore nello stato: persiste tra i render e puo attivare una UI reattiva.
Contro: ogni pezzo di stato aggiunge complessita, sincronizzazione e possibili incoerenze.
Best practice: se puoi derivarlo, non salvarlo.

3. \`useState\` e mental model corretto
\`useState\` restituisce [valore, setter]. Quando chiami il setter, React pianifica un nuovo render; non stai mutando la variabile all'istante.
👉 Vedi snippet 2.
Errore tipico: aspettarsi che \`count\` abbia gia il nuovo valore nella riga subito dopo \`setCount(...)\`.
Modello corretto: descrivi il prossimo stato, poi lascia che React ridisegni la UI.

4. Quando usare update funzionali
Se il nuovo valore dipende da quello precedente, usa sempre \`setState(prev => ...)\`.
👉 Vedi snippet 3.
Pro: evita bug con batching, click rapidi e update multipli nello stesso tick.
Contro: leggermente piu verboso, ma quasi sempre piu robusto.
Da evitare: \`setCount(count + 1)\` ripetuto due volte aspettandosi +2.

5. Eventi in React: dichiarativi, non imperativi
In React non registriamo listener manuali con \`addEventListener\` nella maggior parte dei casi. Passiamo una funzione a \`onClick\`, \`onChange\`, \`onSubmit\`, \`onBlur\`.
👉 Vedi snippet 4.
Best practice: nomina gli handler in modo esplicito (\`handleSubmit\`, \`handleEmailChange\`, \`toggleTask\`) per chiarire intenzione e responsabilita.
Da evitare: logica lunga e poco leggibile direttamente inline nel JSX.

6. Form controllati: la sorgente di verita sta in React
Un input controllato collega \`value\` allo stato e aggiorna quel valore tramite \`onChange\`.
👉 Vedi snippet 5.
Pro: validazione piu semplice, dati sempre sincronizzati, UI prevedibile, reset immediato, integrazione facile con submit e disable button.
Contro: piu codice boilerplate rispetto a input non controllati, soprattutto su form molto grandi.
Quando usarli: quasi sempre nei form applicativi veri, specialmente se ci sono validazioni, UI dinamica o submit condizionale.

7. Controlled vs uncontrolled: confronto onesto
- Controlled input: React controlla il valore.
- Uncontrolled input: il valore vive nel DOM e lo leggi tramite ref o submit nativo.
Controlled pro: coerenza, validazione live, UX raffinata, logica centralizzata.
Controlled contro: piu render e piu codice, specie in form giganteschi.
Uncontrolled pro: rapido per prototipi o campi semplicissimi.
Uncontrolled contro: sincronizzazione piu difficile, piu scomodo per errori live e UI dipendente dal valore.
Regola pratica: per il corso e per la maggior parte delle app product, parti controlled; passa a librerie o pattern specializzati solo quando il form cresce davvero.

8. Validazione progressiva e timing del feedback
Una buona validazione non e solo "giusta", ma anche temporizzata bene. Un errore mostrato troppo presto infastidisce; troppo tardi rallenta.
👉 Vedi snippet 6.
Pattern sano:
- mostrare errori dopo interazione reale (\`touched\`, blur o submit tentato)
- disabilitare submit solo se l'utente capisce perche
- tenere messaggi vicini al campo
Da evitare: alert generici, errori tutti in cima senza contesto, validazione soltanto finale.

9. Scegliere la shape dello stato del form
Approccio A: uno state per campo (\`email\`, \`password\`, \`name\`).
Pro: semplice da leggere su form piccoli.
Contro: piu setter, piu rumore.
Approccio B: un oggetto \`form\`.
Pro: comodo quando i campi sono molti e vuoi passare l'intero payload.
Contro: ogni update richiede spread corretto e un minimo di attenzione in piu.
👉 Vedi snippet 7.
Best practice: per 2-3 campi va benissimo stato separato; oltre, spesso conviene oggetto ben tipizzato.

10. Immutabilita di array e oggetti
In React lo stato va trattato come snapshot immutabile. Non usare \`push\`, \`splice\`, assegnazioni dirette a proprieta o mutazioni annidate.
👉 Vedi snippet 8.
Usa spread, \`map\`, \`filter\`, \`slice\` e destrutturazione.
Perche e importante: mutare direttamente rende i bug meno visibili, complica il debug e rompe il mental model reattivo.

11. Stato minimo e stato derivato
Non salvare nello stato cio che puoi calcolare da altri valori gia presenti.
Esempi buoni di derivazione:
- \`isFormValid\` da email e password
- \`completedTasksCount\` da tasks
- \`hasErrors\` da oggetto errori
Pro del derivare: meno sincronizzazioni, meno bug, codice piu pulito.
Contro: se il calcolo e molto costoso va gestito diversamente, ma nei casi junior non e quasi mai il problema.

12. Flusso completo: evento -> update -> render -> UI
Il ciclo corretto e sempre questo:
utente interagisce -> handler legge il dato -> calcoli/validi -> aggiorni lo stato -> React rerenderizza -> la UI riflette il nuovo stato.
👉 Vedi snippet 9.
Se impari questo flusso, capisci quasi tutti i componenti interattivi.

13. Errori comuni da riconoscere subito
- leggere stato vecchio subito dopo un setter
- usare sia \`defaultValue\` sia \`value\` sullo stesso campo
- mutare array con \`push\` o oggetti con assegnazioni dirette
- salvare troppe cose nello stato
- mescolare dati, errori e loading in una struttura confusa
- dimenticare \`preventDefault()\` nei submit custom
- resettare il form anche quando il submit fallisce

14. Caso studio reale: task form piccolo ma professionale
Un form task ben fatto deve gestire:
- titolo obbligatorio
- priorita selezionabile
- errore mostrato nel momento giusto
- submit disabilitato o protetto
- reset solo dopo successo
- inserimento immutabile nella lista task
👉 Vedi snippet 10.
Questo pattern si riusa in login, filtri, checkout semplici e dashboard CRUD.`,

  commands: `const [count, setCount] = useState(0)
const [email, setEmail] = useState("")
const [form, setForm] = useState({ email: "", password: "" })
setCount((prev) => prev + 1)
onChange={(e) => setEmail(e.target.value)}
onSubmit={handleSubmit}
e.preventDefault()
setForm((prev) => ({ ...prev, email: value }))
setTasks((prev) => [...prev, newTask])
setTasks((prev) => prev.filter((task) => task.id !== id))
const isValid = email.includes("@") && password.trim().length >= 8`,

  reflectionQuestions: `Come distingueresti, con un esempio concreto, stato, prop, variabile locale e valore derivato?
Quali sono i segnali che ti dicono che stai salvando troppo stato e stai complicando il componente?
Quando uno state a oggetto e preferibile rispetto a piu useState separati, e quando invece peggiora la leggibilita?
Perche un form controllato tende a essere piu affidabile nei flussi reali rispetto a un form uncontrolled?
In quali casi mostrare subito un errore aiuta davvero l'utente, e in quali casi peggiora la UX?
Cosa puo andare storto se aggiorni array e oggetti mutandoli direttamente?
Perche \`setState(prev => ...)\` e la scelta giusta quando il nuovo stato dipende dal precedente?
Se un bottone submit e disabilitato, come fai a comunicare chiaramente all'utente cosa manca?`,

  homework: `Esercizio 1: Crea un contatore con Incrementa, Decrementa, Reset e bottone +2 implementato con due update funzionali consecutivi.

Esercizio 2: Costruisci un form login controllato con email e password. Aggiungi:
- validazione live sull'email
- password minima di 8 caratteri
- messaggi inline vicini ai campi
- stato \`touched\` oppure \`submitAttempted\` per non mostrare errori troppo presto
- bottone submit disabilitato quando il form non e valido

Esercizio 3: Crea un componente \`TaskForm\` con:
- titolo obbligatorio
- select priorita
- submit con \`preventDefault()\`
- reset solo dopo inserimento riuscito
- callback \`onAddTask\` passata dal parent

Esercizio 4: Nel parent salva una lista di task e implementa:
- aggiunta immutabile
- toggle completato con \`map\`
- rimozione con \`filter\`
- contatore derivato delle task completate

Bonus 1: raggruppa gli errori del form in un oggetto \`errors\` tipizzato.
Bonus 2: aggiungi uno stato \`isSubmitting\` simulando una chiamata async con \`setTimeout\`.
Bonus 3: confronta in un commento finale i pro e contro di usare stato separato vs oggetto \`form\` nel tuo esercizio.`,

  resources: `https://react.dev/learn/state-a-components-memory
https://react.dev/learn/responding-to-events
https://react.dev/learn/reacting-to-input-with-state
https://react.dev/learn/choosing-the-state-structure
https://react.dev/learn/updating-objects-in-state
https://react.dev/learn/updating-arrays-in-state
/snapshots/state-loop.svg`,

  bestPractices: `Mantieni stato minimo
Salva solo cio che serve davvero alla UI e che non puo essere derivato in modo affidabile. Meno stato significa meno bug e meno sincronizzazione mentale.
---
Scegli una shape coerente
Per form piccoli usa anche stati separati; per form medi puo convenire un oggetto \`form\`. La scelta giusta e quella che rende il componente piu leggibile, non quella piu "furba".
---
Usa update funzionali quando dipendi dal passato
Per contatori, toggle, liste e qualsiasi transizione basata sul valore precedente, \`prev => ...\` e il default sicuro.
---
Tratta array e oggetti come immutabili
React ragiona meglio con nuove copie che descrivono chiaramente la transizione di stato. Evita mutazioni nascoste.
---
Mostra feedback contestuale
Errori vicino al campo, helper text chiaro e submit coerente con lo stato del form migliorano UX e debug.
---
Non mischiare troppe responsabilita
Se un componente gestisce dati, validazione, loading, submit, lista e filtri tutti insieme, spezzalo. Piccoli componenti e funzioni aiutano a mantenere lucidita.
---
Evita doppie fonti di verita
Non usare contemporaneamente \`defaultValue\`, \`value\`, DOM diretto e stato React sullo stesso input. Scegli un modello e resta coerente.
---
Pensa per stati della UI
Un form reale ha almeno: idle, editing, invalid, submitting, success o error. Dare un nome a questi stati rende il codice piu progettato e meno casuale.`,

  workflow: `1. Parti sempre dal modello dati minimo: quali valori cambiano davvero e quali puoi derivare.
2. Disegna il flusso evento -> handler -> validazione -> update stato -> UI aggiornata.
3. Scegli se il form sara controlled o uncontrolled; nelle app di prodotto, quasi sempre controlled.
4. Decidi la shape dello stato prima di scrivere il JSX: stati separati o oggetto \`form\`.
5. Implementa prima il percorso felice, poi edge case come campo vuoto, submit doppio, reset e error timing.
6. Per array e oggetti, usa da subito \`map\`, \`filter\` e spread invece di correggere mutazioni dopo.
7. Prima di chiudere il componente, chiediti: c'e qualche valore salvato nello stato che potrei derivare?`,

  snippets: `1. Stato vs variabile locale
tsx
function Counter() {
  let localCount = 0;
  const [count, setCount] = useState(0);

  function handleClick() {
    localCount += 1;
    setCount((prev) => prev + 1);
    console.log("localCount", localCount);
  }

  return <button onClick={handleClick}>Count: {count}</button>;
}
---
2. Setter pianifica il prossimo render
tsx
function Example() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log(count); // stampa ancora il valore del render corrente
  }

  return <button onClick={handleClick}>{count}</button>;
}
---
3. Update funzionale corretto
tsx
function DoubleIncrement() {
  const [count, setCount] = useState(0);

  function handleDoubleClick() {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  }

  return <button onClick={handleDoubleClick}>Valore: {count}</button>;
}
---
4. Event handler leggibile
tsx
function LikeButton() {
  const [liked, setLiked] = useState(false);

  function handleToggleLike() {
    setLiked((prev) => !prev);
  }

  return (
    <button onClick={handleToggleLike}>
      {liked ? "Ti piace" : "Metti like"}
    </button>
  );
}
---
5. Input controllato
tsx
function EmailField() {
  const [email, setEmail] = useState("");

  return (
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="email@dominio.com"
    />
  );
}
---
6. Validazione progressiva con touched
tsx
function LoginForm() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const showError = touched && !email.includes("@");

  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched(true)}
      />
      {showError && <p>Inserisci un'email valida</p>}
    </div>
  );
}
---
7. Form come oggetto
tsx
type LoginFormState = {
  email: string;
  password: string;
};

function LoginForm() {
  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  function updateField<K extends keyof LoginFormState>(key: K, value: LoginFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <>
      <input value={form.email} onChange={(e) => updateField("email", e.target.value)} />
      <input value={form.password} onChange={(e) => updateField("password", e.target.value)} />
    </>
  );
}
---
8. Array immutabile: bene vs male
tsx
function TaskList() {
  const [tasks, setTasks] = useState([{ id: 1, title: "Studiare React", done: false }]);

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  return <button onClick={() => toggleTask(1)}>Toggle</button>;
}

// Da evitare:
// tasks[0].done = true
// tasks.push({ id: 2, title: "Nuovo task", done: false })
---
9. Stato derivato, non duplicato
tsx
function Summary() {
  const [tasks, setTasks] = useState([
    { id: 1, done: true },
    { id: 2, done: false },
  ]);

  const completedCount = tasks.filter((task) => task.done).length;

  return <p>Completate: {completedCount}</p>;
}
---
10. Task form completo e robusto
tsx
type Priority = "bassa" | "media" | "alta";

function TaskForm({ onAddTask }: { onAddTask: (task: { title: string; priority: Priority }) => void }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("media");
  const [touched, setTouched] = useState(false);

  const titleError = touched && title.trim().length === 0 ? "Il titolo e obbligatorio" : "";
  const isValid = title.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);

    if (!isValid) return;

    onAddTask({ title: title.trim(), priority });
    setTitle("");
    setPriority("media");
    setTouched(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder="Titolo task"
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
        <option value="bassa">Bassa</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>

      {titleError && <p>{titleError}</p>}
      <button type="submit" disabled={!isValid}>
        Aggiungi task
      </button>
    </form>
  );
}`,
};

export default lesson03;
