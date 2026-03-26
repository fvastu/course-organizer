import type { CourseLesson } from "../lessons";

export const lesson06: CourseLesson = {
  id: 6,
  lessonNumber: 6,
  title: "Side Effects e Persistenza Dati",
  module: "Modulo React",
  isCompleted: false,

  objectives: `• Capire davvero cosa sia un side effect e perche non tutto va dentro \`useEffect\`
• Usare \`useEffect\` con dipendenze corrette evitando loop, dati stantii e comportamenti opachi
• Distinguere tra effetti di sincronizzazione, subscribe/unsubscribe e fetch asincroni
• Salvare e recuperare dati da \`localStorage\` con parse sicuro e fallback robusti
• Gestire fetch con loading, error, success e cleanup corretta tramite \`AbortController\`
• Riconoscere i casi in cui un valore puo essere derivato invece di essere sincronizzato con un effetto
• Evitare i bug piu frequenti: dipendenze mancanti, timer zombie, listener duplicati e reset involontari`,

  topics: `1. Cosa e un side effect
Un side effect e qualsiasi operazione che esce dal puro calcolo del render: leggere o scrivere storage, parlare con il network, registrare listener, usare timer, sincronizzare librerie esterne.
Render ideale: dato lo stesso stato, restituisce la stessa UI.
Effect: sincronizza il componente con qualcosa fuori da React.

2. La domanda giusta non e "dove metto il codice?" ma "devo davvero usare useEffect?"
Molti principianti usano \`useEffect\` per calcoli che possono stare direttamente nel render.
Esempio:
- derivare \`completedCount\` da \`tasks\` non richiede un effect
- salvare su \`localStorage\` quando \`tasks\` cambia si, perche stai sincronizzando verso l'esterno
👉 Vedi snippet 1.

3. Mental model di useEffect
\`useEffect(() => { ... }, [deps])\` significa: dopo il render, se queste dipendenze sono cambiate, esegui questo blocco e opzionalmente la cleanup precedente.
👉 Vedi snippet 2.
Le tre situazioni classiche sono:
- mount iniziale
- re-run su cambiamento dipendenze
- cleanup prima del re-run o su unmount

4. Dipendenze corrette: onesta verso React
La dependency array non e un trucco per "farlo partire meno volte". E la dichiarazione dei valori da cui l'effetto dipende davvero.
Se mancano dipendenze, rischi closure vecchie e comportamento incoerente.
Se ne aggiungi troppe senza criterio, l'effetto puo diventare rumoroso o ciclico.
Regola pratica: prima rendi l'effetto corretto, poi semplifica il design se diventa scomodo.

5. Persistenza con localStorage
\`localStorage\` e ottimo per bozze, preferenze, tema, piccole liste locali e progressi utente.
Serve pero una strategia chiara:
- leggere una volta all'avvio
- fare parse con try/catch
- validare la shape minima del dato
- scrivere solo quando il dato sorgente cambia
👉 Vedi snippet 3.

6. Fetch asincroni: stato esplicito della UI
Una fetch ben progettata non si limita a "chiamare un endpoint". Deve esplicitare almeno:
- loading
- success
- error
- eventuale empty
👉 Vedi snippet 4.
Questi stati rendono la UI comprensibile e testabile.

7. Cleanup: timer, listener, subscribe e fetch
Ogni volta che registri qualcosa fuori da React, devi pensare anche a come disregistrarlo.
👉 Vedi snippet 5.
Esempi tipici:
- \`clearTimeout\`
- \`clearInterval\`
- \`removeEventListener\`
- \`abort()\` di una fetch

8. AbortController e fetch robuste
Se l'utente cambia pagina o il componente si smonta durante una richiesta, e buona pratica interromperla.
👉 Vedi snippet 6.
Questo evita warning, aggiornamenti fantasma e codice piu fragile durante navigazioni rapide.

9. Sincronizzare senza creare loop
Un effect che legge uno stato e lo aggiorna senza condizioni puo entrare in loop.
Esempio pericoloso:
\`useEffect(() => setCount(count + 1), [count])\`
Spesso il problema non e nell'effect ma nel fatto che la logica andava modellata diversamente.

10. Checklist mentale prima di scrivere un effect
- Sto sincronizzando qualcosa esterno a React?
- Posso invece derivare questo valore nel render?
- Ho dichiarato tutte le dipendenze reali?
- Ho previsto la cleanup?
- La UI mostra chiaramente loading, error o assenza dati?

11. Caso studio: mini task app professionale
Una versione matura della task app del corso dovrebbe:
- persistere task e filtro selezionato
- recuperare dati iniziali in sicurezza
- mostrare loading e fallback vuoto
- pulire timer e fetch al cambio pagina
Questa lezione e il ponte perfetto tra React puro e l'arrivo di Next.js nella parte successiva del corso.`,

  commands: `useEffect(() => { ... }, []) - effetto iniziale al mount
useEffect(() => { ... }, [tasks]) - sincronizza quando cambia la dipendenza
localStorage.getItem("tasks") - legge dati persistiti nel browser
localStorage.setItem("tasks", JSON.stringify(tasks)) - salva snapshot corrente
const controller = new AbortController() - crea segnale di cancellazione
fetch("/api/tasks", { signal: controller.signal }) - fetch abortibile
return () => controller.abort() - cleanup su unmount o rerun`,

  reflectionQuestions: `Quali tipi di logica dovrebbero restare nel render e quali invece richiedono davvero un side effect?
Perche usare \`useEffect\` per derivare dati da altro stato tende a complicare il componente?
Cosa rischi se ometti dipendenze reali per "far girare meno volte" un effect?
Qual e la differenza tra cleanup utile e cleanup superflua?
In quali casi \`localStorage\` e una soluzione corretta e in quali casi e solo un palliativo?
Come comunicheresti in UI la differenza tra "sto caricando", "non ci sono dati" e "la richiesta e fallita"?`,

  homework: `Esercizio 1: Nella task app salva automaticamente in \`localStorage\`:
- lista task
- filtro attivo
- ultima query di ricerca

Esercizio 2: All'avvio dell'app:
- leggi i dati salvati
- gestisci parse error con fallback sicuro
- inizializza lo stato senza crash

Esercizio 3: Crea un componente \`RemoteTasks\` che:
- esegue fetch da un endpoint mock
- mostra loading skeleton
- mostra errore se la chiamata fallisce
- mostra empty state se l'array e vuoto

Esercizio 4: Usa \`AbortController\` per interrompere la richiesta quando il componente si smonta.

Bonus 1: aggiungi un listener \`window.resize\` con cleanup corretta.
Bonus 2: salva timestamp ultimo aggiornamento e visualizzalo in pagina.
Bonus 3: commenta un caso in cui hai evitato un \`useEffect\` usando un valore derivato.`,

  resources: `https://react.dev/learn/synchronizing-with-effects
https://react.dev/learn/you-might-not-need-an-effect
https://react.dev/learn/lifecycle-of-reactive-effects
https://react.dev/learn/removing-effect-dependencies
/snapshots/effect-lifecycle.svg`,

  bestPractices: `Usa useEffect solo per sincronizzare con l'esterno
Se il codice puo vivere nel render o in un event handler, di solito e meglio li. Non trasformare \`useEffect\` nel cestino della logica incerta.
---
Dichiara dipendenze onestamente
Le dependency array devono descrivere i valori letti dall'effect. Saltare dipendenze crea bug sottili molto piu costosi della "performance" guadagnata.
---
Pensa sempre alla cleanup
Timer, listener, subscribe e richieste pendenti hanno quasi sempre bisogno di chiusura o abort.
---
Esplicita gli stati asincroni
Loading, error, success ed empty non sono dettagli di implementazione: sono parte del contratto della UI.
---
Persisti il minimo indispensabile
Salva in \`localStorage\` solo cio che serve davvero a ripristinare l'esperienza, non copie inutili di valori derivabili.
---
Tieni parsing e fallback difensivi
I dati del browser possono essere corrotti, vecchi o assenti. Gestisci sempre il caso peggiore senza rompere l'app.`,

  workflow: `1. Verifica se la logica e davvero un effect o puo restare nel render.
2. Definisci quali dipendenze reali usa il blocco.
3. Se sincronizzi con storage o network, modella esplicitamente loading, error e successo.
4. Aggiungi cleanup prima di considerare l'effect completo.
5. Testa il caso di mount, rerender e unmount.
6. Simula dati corrotti o assenti per verificare i fallback.
7. Fai un ultimo controllo: c'e qualche effect che sta solo compensando una modellazione sbagliata dello stato?`,

  snippets: `1. Valore derivato senza useEffect
tsx
function TaskSummary({ tasks }: { tasks: { done: boolean }[] }) {
  const completedCount = tasks.filter((task) => task.done).length;
  return <p>Completate: {completedCount}</p>;
}
---
2. Effect con dipendenza esplicita
tsx
useEffect(() => {
  document.title = query ? "Ricerca: " + query : "Task board";
}, [query]);
---
3. Persistenza localStorage sicura
tsx
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

function readTasks() {
  try {
    const raw = localStorage.getItem("tasks");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
---
4. Fetch con loading, success, error
tsx
useEffect(() => {
  let ignore = false;

  async function loadTasks() {
    setStatus("loading");
    try {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      if (!ignore) {
        setTasks(data);
        setStatus("success");
      }
    } catch {
      if (!ignore) setStatus("error");
    }
  }

  loadTasks();
  return () => {
    ignore = true;
  };
}, []);
---
5. Listener con cleanup
tsx
useEffect(() => {
  function handleResize() {
    setIsMobile(window.innerWidth < 768);
  }

  window.addEventListener("resize", handleResize);
  handleResize();

  return () => window.removeEventListener("resize", handleResize);
}, []);
---
6. Fetch abortibile
tsx
useEffect(() => {
  const controller = new AbortController();

  async function load() {
    const response = await fetch("/api/tasks", {
      signal: controller.signal,
    });
    const data = await response.json();
    setTasks(data);
  }

  load().catch((error) => {
    if (error.name !== "AbortError") {
      setStatus("error");
    }
  });

  return () => controller.abort();
}, []);`,
};

export default lesson06;
