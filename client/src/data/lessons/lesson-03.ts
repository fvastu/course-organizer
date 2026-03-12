import type { CourseLesson } from "../lessons";

export const lesson03: CourseLesson = {
  id: 3,
  lessonNumber: 3,
  title: "Stato e Interazioni",
  module: "Modulo React",
  isCompleted: false,

  objectives: `• Comprendere davvero cos'e lo stato e quando usarlo
• Gestire eventi utente con onClick, onChange e onSubmit
• Costruire form controllati con validazione progressiva
• Aggiornare array e oggetti in modo immutabile e sicuro`,

  topics: `1. Cos’è lo stato in React
Lo stato e il dato che puo cambiare nel tempo dentro un componente e che, quando cambia, provoca un nuovo render. Serve per rappresentare cio che l'utente modifica: input, contatori, checkbox, filtri, task completati.
👉 Vedi snippet 1.
Nota mentale: se un dato cambia e deve riflettersi nella UI, probabilmente deve vivere nello stato.

2. useState e ciclo di aggiornamento
\`useState\` restituisce una coppia: valore corrente e funzione di aggiornamento. Quando chiamiamo la funzione setter, React pianifica un rerender e aggiorna la UI con il nuovo stato.
👉 Vedi snippet 2.
Nota: il setter non modifica subito la variabile nella stessa riga di codice. React batcha gli aggiornamenti per ottimizzare i render.

3. Eventi in React
Gli eventi in React seguono una sintassi dichiarativa: passiamo una funzione a props come \`onClick\`, \`onChange\` o \`onSubmit\`. Non interagiamo direttamente con \`addEventListener\` come nel DOM tradizionale.
👉 Vedi snippet 3.
Evento comune: click per aggiornare contatori, change per leggere input, submit per inviare un form.

4. Form controllati
Un input controllato ha il suo valore collegato allo stato React tramite \`value\` e \`onChange\`. In questo modo React diventa la fonte di verita del form.
👉 Vedi snippet 4.
Vantaggi: validazione piu semplice, dati sempre sincronizzati, UI prevedibile.

5. Validazione progressiva e UX
Una buona validazione non deve comparire solo alla fine. Possiamo mostrare errori vicino ai campi, disabilitare il submit quando i dati non sono validi e dare feedback immediato.
👉 Vedi snippet 5.
Esempio: email senza @, password troppo corta, campo task vuoto.

6. Aggiornamenti basati sul valore precedente
Quando il nuovo stato dipende dal precedente, bisogna usare l'update funzionale: \`setState(prev => ...)\`. Questo evita bug dovuti a render ravvicinati o batch multipli.
👉 Vedi snippet 6.
Caso tipico: contatore con piu incrementi consecutivi o toggle booleano.

7. Immutabilita di array e oggetti
In React non dobbiamo mutare direttamente array e oggetti nello stato. Usiamo spread operator, \`map\`, \`filter\` e destructuring per creare nuove copie aggiornate.
👉 Vedi snippet 7.
Mutare direttamente produce bug difficili da tracciare e impedisce a React di capire bene cosa e cambiato.

8. Caso studio: mini task form
Nel task manager del corso, il form di inserimento task usera stato locale per titolo, priorita, errori e reset del form dopo il submit. Questo collega la teoria a un caso realistico e prepara la lezione successiva sul rendering dinamico.
👉 Vedi snippet 8.
Mental model finale: evento utente -> update stato -> rerender -> UI aggiornata.`,

  commands: `const [count, setCount] = useState(0)
const [form, setForm] = useState({ title: "", email: "" })
onClick={() => setCount((prev) => prev + 1)}
onChange={(e) => setValue(e.target.value)}
e.preventDefault()
setTasks((prev) => [...prev, newTask])
setTasks((prev) => prev.filter((task) => task.id !== id))`,

  reflectionQuestions: `Qual e la differenza tra una variabile normale e uno stato React?
Perche un input controllato e piu affidabile di uno non controllato nei form complessi?
Quando conviene usare \`setState(prev => ...)\` invece di \`setState(nuovoValore)\`?
Cosa rischiamo se mutiamo direttamente un array o un oggetto nello stato?`,

  homework: `Esercizio 1: Crea un contatore con pulsanti Incrementa, Decrementa e Reset usando update funzionali.
Esercizio 2: Costruisci un form login controllato con email e password, messaggi di errore inline e submit bloccato se i dati sono invalidi.
Esercizio 3: Crea un form "Aggiungi task" con titolo obbligatorio, select priorita e reset automatico dopo submit.
Bonus: salva gli errori del form in un oggetto \`errors\` e mostra un riepilogo sopra al form se esistono campi non validi.`,

  resources: `https://react.dev/learn/state-a-components-memory
https://react.dev/learn/responding-to-events
https://react.dev/learn/updating-arrays-in-state
https://react.dev/learn/updating-objects-in-state
/snapshots/state-loop.svg`,

  bestPractices: `1. Mantieni nello stato solo i dati che cambiano davvero.
2. Non duplicare stato che puo essere derivato da altri valori.
3. Usa input controllati nei form importanti.
4. Mostra errori vicino al campo, non solo in alert generici.
5. Usa update funzionali quando dipendi dal valore precedente.
6. Non mutare mai direttamente array e oggetti nello stato.
7. Dai nomi espliciti agli handler: \`handleSubmit\`, \`handleChange\`, \`toggleTask\`.
8. Se la logica del form cresce troppo, spezzala in funzioni chiare o componenti dedicati.`,

  snippets: `1. Stato base con useState
tsx
function Counter() {
  const [count, setCount] = useState(0);

  return <p>Conteggio: {count}</p>;
}
---
2. Aggiornamento stato e rerender
tsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((prev) => prev + 1)}>
      Incrementa: {count}
    </button>
  );
}
---
3. Gestione evento click
tsx
function LikeButton() {
  const [liked, setLiked] = useState(false);

  function handleClick() {
    setLiked((prev) => !prev);
  }

  return <button onClick={handleClick}>{liked ? "Piaciuto" : "Metti like"}</button>;
}
---
4. Input controllato
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
5. Validazione semplice
tsx
function LoginForm() {
  const [email, setEmail] = useState("");

  const emailError = email.length > 0 && !email.includes("@")
    ? "Inserisci un'email valida"
    : "";

  return (
    <>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      {emailError && <p>{emailError}</p>}
    </>
  );
}
---
6. Update funzionale corretto
tsx
function DoubleIncrement() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  }

  return <button onClick={handleClick}>{count}</button>;
}
---
7. Aggiornare array in modo immutabile
tsx
function TaskList() {
  const [tasks, setTasks] = useState(["Studiare React"]);

  function addTask() {
    setTasks((prev) => [...prev, "Nuovo task"]);
  }

  return <button onClick={addTask}>Aggiungi task</button>;
}
---
8. Form task completo
tsx
function TaskForm() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("media");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Il titolo e obbligatorio");
      return;
    }

    setError("");
    console.log({ title, priority });
    setTitle("");
    setPriority("media");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="bassa">Bassa</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>
      {error && <p>{error}</p>}
      <button type="submit">Aggiungi</button>
    </form>
  );
}`,
};

export default lesson03;
