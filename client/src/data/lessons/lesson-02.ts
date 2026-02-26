import { CourseLesson } from "../lessons";

const lesson02: CourseLesson = {
  id: 2,
  lessonNumber: 2,
  title: "Basi di React",
  module: "Modulo React",
  isCompleted: false,

  objectives: `• Capire cos'è React e in quali scenari conviene usarlo
• Comprendere il DOM e i suoi limiti
• Comprendere il Virtual DOM e il processo di reconciliation
• Creare componenti riutilizzabili con props tipizzate`,

  topics: `1. Cos’è il DOM (Document Object Model)
Il DOM rappresenta la pagina HTML come un albero di nodi manipolabili con JavaScript. Possiamo leggere o modificare il contenuto, aggiungere classi o ascoltare eventi.
👉 Vedi snippet 1.
Nota mentale: il DOM tradizionale può diventare costoso da aggiornare in applicazioni grandi.

2. Limiti del DOM tradizionale
Con UI complesse e molte mutazioni manuali, il codice imperativo diventa difficile da mantenere. Reflow e repaint rallentano la pagina, e i bug diventano più frequenti.
👉 Vedi snippet 1 per osservare quanto il codice imperativo possa diventare verboso e fragile.

3. Perché nasce React
React nasce per creare UI prevedibili e modulari. Introduce il paradigma dichiarativo: descriviamo lo stato finale della UI invece di dire al browser come aggiornarla.
Imperativo: "Fai questo, poi quello, poi quest’altro."
Dichiarativo: "Questa è la UI che voglio dato uno stato."
👉 Vedi snippet 2.

4. Virtual DOM e Reconciliation
React usa un Virtual DOM in memoria. Quando lo stato cambia, crea una nuova versione, confronta la nuova con la precedente (diffing) e aggiorna solo le parti necessarie (reconciliation). Batching raggruppa più aggiornamenti.
👉 Vedi snippet 3.
Nota: React ottimizza gli aggiornamenti, migliorando le performance percepite.

5. JSX e regole fondamentali
JSX combina JavaScript e markup. Regole principali:
- Un solo elemento padre (uso di fragment '<> </>' se necessario)
- Espressioni JS dentro '{}'
- 'className' al posto di 'class'
👉 Vedi snippet 4.

6. Componenti funzione e composizione
Un componente React è una funzione pura che riceve props e restituisce UI. Le UI complesse si costruiscono componendo componenti piccoli e con una sola responsabilità.
👉 Vedi snippet 5.
Nota: componenti piccoli = meno bug e più riutilizzabili.

7. Props e flusso dati unidirezionale
I dati in React fluiscono sempre dal parent al child. Le props sono immutabili, garantendo comportamenti prevedibili. Possiamo passare callback per comunicare eventi verso l’alto. Tipizzare le props con TypeScript aumenta sicurezza.
👉 Vedi snippet 6.

8. Rendering liste e key
Quando renderizziamo liste, ogni elemento deve avere una 'key' stabile. Permette a React di aggiornare solo gli elementi cambiati.
👉 Vedi snippet 7.
Senza key corrette: comportamenti strani, re-render inutili, peggiori performance.

9. Mental Model Finale
React segue la regola:
UI = funzione dello stato
Cambiando lo stato, React aggiorna automaticamente la UI.`,

  commands: `npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
npm run build
npm run preview`,

  reflectionQuestions: `Quali sono i limiti del DOM tradizionale?
Come il paradigma dichiarativo migliora manutenzione e leggibilità?
Perché React usa il Virtual DOM?
Cosa succede se non usiamo key corrette nelle liste?`,

  homework: `Esercizio 1: Crea Navbar, Hero e Footer come componenti separati.
Esercizio 2: Tipizza tutte le props con interfacce TypeScript.
Esercizio 3: Crea un file config.ts e passa tutti i dati tramite props.
Bonus: rendi componenti riutilizzabili come Button e Card con varianti tipizzate.`,

  bestPractices: `1. Non manipolare il DOM direttamente.
2. Pensa sempre in componenti.
3. Mantieni i componenti piccoli e con una sola responsabilità.
4. Tipizza sempre le props.
5. UI = funzione dello stato.
6. Non ottimizzare troppo presto.
7. Usa nomi chiari per componenti e props.
8. Se duplici codice, crea componenti riutilizzabili.`,

  snippets: `1. DOM tradizionale
js
const button = document.getElementById("btn");

button.addEventListener("click", () => {
  document.getElementById("title").textContent = "Cliccato!";
});
---
2. Paradigma dichiarativo
tsx
function App({ clicked }: { clicked: boolean }) {
  return <h1>{clicked ? "Cliccato!" : "Clicca"}</h1>;
}
---
3. Virtual DOM concettuale
tsx
function App({ logged }: { logged: boolean }) {
  return logged ? <Dashboard /> : <Login />;
}
---
4. JSX base
tsx
function App() {
  const name = "Mario";

  return (
    <>
      <h1>Ciao {name}</h1>
      <p>Benvenuto in React</p>
    </>
  );
}
---
5. Composizione componenti
tsx
function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
}
---
6. Props tipizzate
tsx
interface ButtonProps {
  label: string;
}

function Button({ label }: ButtonProps) {
  return <button>{label}</button>;
}
---
7. Lista con key
tsx
function List({ items }: { items: { id: number; name: string }[] }) {
  return (
    <ul>
      {items.map((i) => (
        <li key={i.id}>{i.name}</li>
      ))}
    </ul>
  );
}`
};

export default lesson02;