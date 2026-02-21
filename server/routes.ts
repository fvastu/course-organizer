import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

// COSTANTE PER LA GESTIONE DELLO SBLOCCO (SEQUENZIALE)
const REQUIRE_SEQUENTIAL_UNLOCK = false;

async function seedDatabase() {
  const existingLessons = await storage.getLessons();
  if (existingLessons.length === 0) {
    const initialLessons = [
      {
        lessonNumber: 1,
        title: "Git & GitHub Fundamentals",
        module: "Fondamenti",
        objectives: "• Comprendere l'architettura interna di <strong>Git</strong> come sistema distribuito.\n• Padroneggiare il flusso di lavoro professionale su <strong>GitHub</strong>.\n• Risolvere conflitti complessi e gestire il versionamento in team.",
        topics: "1. <strong>Architettura di Git</strong>: Capire il database a oggetti (.git folder) e l'integrità dei dati tramite SHA-1.\n2. <strong>Staging Area</strong>: Perché esiste questo 'limbo' tra il working directory e il repository.\n3. <strong>Branching Avanzato</strong>: Creazione di rami paralleli per isolare lo sviluppo di nuove feature.\n4. <strong>Remote Workflow</strong>: Configurazione di remote multiple e gestione di upstream.\n5. <strong>Pull Requests & Code Review</strong>: Come commentare il codice altrui e richiedere modifiche.\n6. <strong>Merge vs Rebase</strong>: Scegliere la strategia migliore per mantenere pulita la cronologia.\n7. <strong>Conflitti</strong>: Identificare le righe in conflitto e risolverle manualmente senza perdere dati.",
        commands: "git init - Inizializza un nuovo repository\ngit clone <url> - Copia un progetto remoto in locale\ngit add . - Prepara tutti i file modificati per il commit\ngit commit -m 'descrizione' - Crea un'istantanea definitiva delle modifiche\ngit checkout -b <nome> - Crea e passa a un nuovo branch\ngit push origin <branch> - Invia i tuoi commit al server remoto\ngit pull origin <branch> - Recupera e unisce le novità dal server\ngit stash - Salva temporaneamente le modifiche non completate\ngit log --oneline - Visualizza una cronologia compatta",
        reflectionQuestions: "Perché Git è definito 'distribuito' e non 'centralizzato'?\nCosa accade tecnicamente quando facciamo un commit?\nQual è il rischio di fare un rebase su un branch condiviso con altri?",
        homework: "1. <strong>Repo Setup</strong>: Inizializza un progetto locale e collegalo a un nuovo repo GitHub.\n2. <strong>Branching</strong>: Crea un branch per aggiungere un file .gitignore configurato per Node.js.\n3. <strong>Merge Conflict</strong>: Simula un conflitto modificando lo stesso file su due branch diversi e risolvilo.\n4. <strong>PR</strong>: Apri una Pull Request con una descrizione dettagliata di cosa hai imparato."
      },
      {
        lessonNumber: 2,
        title: "React Basics",
        module: "Modulo React",
        objectives: "• Comprendere il paradigma <strong>dichiarativo</strong> vs imperativo.\n• Creare interfacce modulari tramite <strong>Componenti</strong>.\n• Padroneggiare la sintassi <strong>JSX</strong> e il passaggio di <strong>Props</strong>.",
        topics: "1. <strong>Virtual DOM</strong>: Come React ottimizza le performance aggiornando solo le parti necessarie.\n2. <strong>Function Components</strong>: Scrivere UI usando funzioni JavaScript pulite.\n3. <strong>Regole di JSX</strong>: Perché dobbiamo ritornare un singolo elemento radice (o un Fragment).\n4. <strong>Props Pattern</strong>: Passare dati, configurazioni e persino funzioni tra componenti.\n5. <strong>Composizione</strong>: Evitare componenti giganti assemblando piccoli pezzi riutilizzabili.\n6. <strong>Vite Ecosystem</strong>: Configurare un ambiente di sviluppo ultra-rapido.\n7. <strong>Prop Types & TypeScript</strong>: Accenni alla validazione dei dati in ingresso.",
        commands: "npm create vite@latest - Inizializza l'ambiente di lavoro\nnpm install - Scarica le librerie necessarie (node_modules)\nnpm run dev - Avvia l'anteprima in tempo reale con HMR",
        reflectionQuestions: "In che modo React si differenzia da jQuery nella manipolazione del DOM?\nCosa sono le props e perché sono immutabili per il componente che le riceve?\nPerché preferiamo i componenti funzionali a quelli di classe?",
        homework: "1. <strong>Component Hub</strong>: Crea una struttura di cartelle pulita (components, pages).\n2. <strong>Lego Blocks</strong>: Realizza una Navbar, un MainContent e un Footer come componenti separati.\n3. <strong>Data Flow</strong>: Passa il nome dell'utente dalla radice dell'app fino al componente Welcome.\n4. <strong>Fragment</strong>: Usa <> </> per evitare div inutili nel DOM finale."
      },
      {
        lessonNumber: 3,
        title: "Stato e interazioni",
        module: "Modulo React",
        objectives: "• Gestire la <strong>reattività</strong> tramite lo hook <strong>useState</strong>.\n• Creare <strong>Form controllati</strong> per input utente sicuri.\n• Gestire eventi complessi e prevenire refresh indesiderati.",
        topics: "1. <strong>Hook useState</strong>: Il motore segreto che innesca il re-render.\n2. <strong>Batching</strong>: Capire come React raggruppa gli aggiornamenti di stato per efficienza.\n3. <strong>Single Source of Truth</strong>: Perché il valore dell'input deve essere pilotato dallo stato.\n4. <strong>Event Handlers</strong>: onClick, onChange, onSubmit e la sintassi arrow function.\n5. <strong>Validazione Live</strong>: Mostrare messaggi di errore mentre l'utente digita.\n6. <strong>Stato Complesso</strong>: Gestire oggetti e array nello stato senza mutarli direttamente.\n7. <strong>Functional Updates</strong>: Usare setState(prev => ...) per evitare race conditions.",
        commands: "const [state, setState] = useState(initial) - Crea uno stato\ne.preventDefault() - Ferma il comportamento di default del browser\ne.target.name - Identifica quale input ha scatenato l'evento",
        reflectionQuestions: "Perché chiamare setState non cambia il valore della variabile 'state' istantaneamente?\nQual è il vantaggio dei componenti controllati rispetto a quelli non controllati?\nCosa succede se dimentichi di creare una copia dell'array prima di aggiornarlo?",
        homework: "1. <strong>Interattività</strong>: Crea un contatore con pulsanti +/- e uno stato per il colore del testo.\n2. <strong>Login Form</strong>: Implementa un form con email e password e valida che l'email contenga '@'.\n3. <strong>Multi-Input</strong>: Gestisci più campi usando un singolo handler e uno stato oggetto.\n4. <strong>UI Feedback</strong>: Disabilita il tasto 'Invia' se i campi non sono validi."
      },
      {
        lessonNumber: 4,
        title: "Rendering dinamico",
        module: "Modulo React",
        objectives: "• Gestire <strong>collezioni di dati</strong> reali nel frontend.\n• Implementare logiche <strong>condizionali</strong> per interfacce intelligenti.\n• Ottimizzare il rendering di liste tramite <strong>Keys</strong> univoche.",
        topics: "1. <strong>Iterazione con .map()</strong>: Trasformare array di dati in array di elementi JSX.\n2. <strong>L'importanza della Key</strong>: Aiutare React a identificare quali elementi sono cambiati, aggiunti o rimossi.\n3. <strong>Short-circuit Evaluation</strong>: Usare l'operatore && per mostrare componenti 'on-demand'.\n4. <strong>Ternary Operator</strong>: Gestire stati binari (es. Caricamento vs Risultati).\n5. <strong>Pattern della Cancellazione</strong>: Passare l'ID dell'elemento a una funzione di rimozione.\n6. <strong>Empty States</strong>: Progettare la UX per quando non ci sono dati da mostrare.\n7. <strong>Rendering di Liste Annidate</strong>: Gestire strutture dati gerarchiche.",
        commands: "{items.map(item => <Card key={item.id} />)} - Ciclo di rendering\n{show && <Modal />} - Mostra solo se vero\n{isOk ? <OkIcon /> : <ErrorIcon />} - Switch visivo",
        reflectionQuestions: "Perché non dovresti mai usare Math.random() per generare una key?\nIn quali scenari è meglio nascondere un elemento con i CSS invece di non renderizzarlo?\nCome influisce la lunghezza di un array sulle performance di renderizzazione?",
        homework: "1. <strong>Task Board</strong>: Mostra una lista di task salvati in un array costante.\n2. <strong>Delete Action</strong>: Implementa un tasto 'Elimina' che filtra l'array per ID.\n3. <strong>No Results</strong>: Se la lista è vuota, mostra un bottone 'Crea il tuo primo task'.\n4. <strong>Conditional Styling</strong>: Applica una classe CSS diversa se un task è segnato come importante."
      },
      {
        lessonNumber: 5,
        title: "Stato avanzato e composizione",
        module: "Modulo React",
        objectives: "• Risolvere il problema del <strong>Prop Drilling</strong>.\n• Implementare <strong>Lifting State Up</strong> in architetture complesse.\n• Creare logiche di <strong>filtraggio e ricerca</strong> performanti.",
        topics: "1. <strong>Sollevamento dello Stato</strong>: Spostare la logica al 'Common Ancestor' più vicino.\n2. <strong>Stato Derivato vs Stato Sincronizzato</strong>: Perché non duplicare mai i dati.\n3. <strong>Pattern di Composizione</strong>: Usare la prop <strong>children</strong> per creare layout flessibili.\n4. <strong>Input di Ricerca</strong>: Creare filtri in tempo reale che agiscono su liste visualizzate.\n5. <strong>Passaggio di Funzioni</strong>: Permettere ai figli di comunicare cambiamenti al padre.\n6. <strong>Separazione delle Responsabilità</strong>: Componenti Smart (logica) vs Dumb (presentazione).\n7. <strong>Accenni a Context API</strong>: Quando lo stato diventa troppo profondo.",
        commands: "const filtered = data.filter(d => d.active) - Logica derivata\n<Layout><Sidebar /><Content /></Layout> - Esempio di composizione",
        reflectionQuestions: "Come identifichi il punto esatto dove deve risiedere uno stato condiviso?\nPerché il Prop Drilling è considerato un 'code smell'?\nQual è la differenza tra passare un componente come prop e passarlo come child?",
        homework: "1. <strong>Global State</strong>: Sposta la lista dei task nel componente principale App.\n2. <strong>Search Bar</strong>: Implementa un filtro che aggiorna la lista mentre l'utente scrive.\n3. <strong>Category Tabs</strong>: Aggiungi pulsanti per filtrare i task per categoria (Lavoro, Casa, Studio).\n4. <strong>Wrapper Component</strong>: Crea un componente 'Container' che aggiunge padding e bordi a qualsiasi contenuto."
      },
      {
        lessonNumber: 6,
        title: "Side Effects e persistenza dati",
        module: "Modulo React",
        objectives: "• Dominare lo hook <strong>useEffect</strong> per gestire il mondo esterno.\n• Sincronizzare l'app con il <strong>LocalStorage</strong> del browser.\n• Gestire correttamente il <strong>Cleanup</strong> per evitare perdite di memoria.",
        topics: "1. <strong>Effetti Collaterali</strong>: Cosa sono e perché React vuole che siano isolati.\n2. <strong>Dependency Array</strong>: Controllo granulare su quando eseguire l'effetto (Mount, Update).\n3. <strong>Data Fetching</strong>: Chiamare API esterne e salvare i risultati nello stato.\n4. <strong>Browser Storage</strong>: Salvare preferenze utente e dati di sessione in modo persistente.\n5. <strong>Ciclo di Vita</strong>: Montaggio, aggiornamento e smontaggio dei componenti.\n6. <strong>Cleanup Function</strong>: Rimuovere listener di eventi e cancellare timer.\n7. <strong>Async in useEffect</strong>: Gestire correttamente le promesse e lo stato di caricamento.",
        commands: "useEffect(() => { ... }, []) - Esegui una volta al caricamento\nlocalStorage.setItem('user', JSON.stringify(obj)) - Persistenza\nJSON.parse(localStorage.getItem('user')) - Recupero dati",
        reflectionQuestions: "Cosa accade se ometti completamente l'array di dipendenze in useEffect?\nPerché dobbiamo trasformare gli oggetti in stringhe per salvarli in localStorage?\nQuando è necessario restituire una funzione alla fine di un effetto?",
        homework: "1. <strong>Auto-Save</strong>: Salva la lista dei task su localStorage ad ogni modifica.\n2. <strong>Data Restore</strong>: All'avvio, recupera i dati e popola l'app automaticamente.\n3. <strong>Window Resize</strong>: Registra un evento di resize della finestra e mostra la larghezza dello schermo.\n4. <strong>Cleanup Test</strong>: Assicurati che l'evento di resize venga rimosso quando cambi pagina."
      },
      {
        lessonNumber: 7,
        title: "Fondamenti di Next.js",
        module: "Modulo Next.js",
        objectives: "• Comprendere la rivoluzione dell'<strong>App Router</strong>.\n• Scegliere tra <strong>Server</strong> e <strong>Client Components</strong>.\n• Sfruttare il <strong>File-system Routing</strong> per velocità di sviluppo.",
        topics: "1. <strong>Next.js Framework</strong>: Perché è diventato lo standard per app React in produzione.\n2. <strong>Routing Basato su Cartelle</strong>: Creare rotte semplicemente aggiungendo cartelle app/.\n3. <strong>Server Components (RSC)</strong>: Renderizzare sul server per caricamenti istantanei e SEO.\n4. <strong>Client Components</strong>: Quando e perché aggiungere l'interattività con 'use client'.\n5. <strong>Layout & Template</strong>: Gestire parti della UI che non devono ricaricarsi (Sidebar, Nav).\n6. <strong>Metadata API</strong>: Gestire tag <title> e <meta> in modo dinamico per i social.\n7. <strong>Image Optimization</strong>: Caricare immagini pesanti in modo intelligente.",
        commands: "npx create-next-app@latest - Boilerplate ufficiale completo\n'use client' - Direttiva per passare al rendering lato client",
        reflectionQuestions: "Perché i Server Components sono più sicuri per gestire chiavi API?\nIn che modo Next.js migliora la velocità percepita rispetto a una SPA?\nQual è la differenza principale tra un file layout.tsx e uno page.tsx?",
        homework: "1. <strong>Project Setup</strong>: Inizializza un'app Next.js con Tailwind e App Router.\n2. <strong>Multi-Page</strong>: Crea le pagine /blog, /chi-siamo e /contatti.\n3. <strong>Nested Layout</strong>: Crea un layout specifico per la sezione blog che mostri una sidebar diversa.\n4. <strong>SEO Check</strong>: Imposta un titolo dinamico per ogni pagina usando l'oggetto metadata."
      },
      {
        lessonNumber: 8,
        title: "Routing dinamico e Data Fetching",
        module: "Modulo Next.js",
        objectives: "• Creare <strong>Rotte Dinamiche</strong> tramite parametri URL.\n• Implementare <strong>Fetching asincrono</strong> direttamente nei componenti.\n• Gestire stati di caricamento tramite <strong>Streaming e Suspense</strong>.",
        topics: "1. <strong>Dynamic Segments</strong>: Creare rotte come /prodotto/[id] per gestire migliaia di pagine.\n2. <strong>Async Components</strong>: Usare async/await direttamente dentro la definizione del componente.\n3. <strong>La funzione Fetch</strong>: Caricare dati con caching automatico e deduplicazione.\n4. <strong>Loading UI</strong>: Creare file loading.tsx per mostrare skeleton screen mentre i dati arrivano.\n5. <strong>Error Handling</strong>: Gestire crash di singole sezioni tramite error.tsx.\n6. <strong>Static Params</strong>: Pre-generare rotte dinamiche al build time per performance estreme.\n7. <strong>Search Params</strong>: Leggere query string come ?categoria=react.",
        commands: "export default async function Page({ params }) { ... } - Componente asincrono\nfetch(url, { cache: 'no-store' }) - Forza dati freschi",
        reflectionQuestions: "Perché non abbiamo più bisogno dello hook useEffect per caricare dati in Next.js?\nIn che modo 'loading.tsx' aiuta a prevenire la fuga degli utenti da un sito lento?\nQual è il vantaggio di conoscere in anticipo gli ID delle pagine dinamiche?",
        homework: "1. <strong>Dynamic Blog</strong>: Crea una rotta blog/[slug] che mostra lo slug nell'interfaccia.\n2. <strong>Real Data</strong>: Fetch dei post da un'API esterna (es. JSONPlaceholder) e mostrali in lista.\n3. <strong>Skeleton</strong>: Implementa un caricamento animato per la lista dei post.\n4. <strong>Not Found</strong>: Mostra una pagina 404 personalizzata se il post richiesto non esiste."
      },
      {
        lessonNumber: 9,
        title: "API Routes e form submission",
        module: "Modulo Next.js",
        objectives: "• Costruire <strong>Backend API</strong> all'interno dello stesso progetto.\n• Gestire <strong>Server Actions</strong> per invii di form sicuri.\n• Validazione robusta dei dati lato server tramite <strong>Zod</strong>.",
        topics: "1. <strong>Route Handlers</strong>: Creare endpoint HTTP (GET, POST, etc.) in file route.ts.\n2. <strong>Server Actions</strong>: La rivoluzione di Next.js per gestire form senza scrivere API manuali.\n3. <strong>Request Body Parsing</strong>: Estrarre JSON e dati form dalle richieste in ingresso.\n4. <strong>Response Object</strong>: Inviare messaggi di successo, errori e codici di stato appropriati.\n5. <strong>Database Connection</strong>: Accenni a come collegare un database (Postgres/MongoDB).\n6. <strong>Protezione dei Dati</strong>: Validare input per prevenire attacchi comuni (SQL Injection, XSS).\n7. <strong>Revalidation</strong>: Aggiornare la cache del frontend dopo che un'azione ha cambiato i dati.",
        commands: "export async function POST(req) { const data = await req.json(); ... }\n'use server'; // Abilita una funzione come Server Action",
        reflectionQuestions: "Perché le Server Actions rendono il codice più pulito rispetto a fetch(api)?\nQual è il rischio di inviare dati al server senza una validazione Zod?\nIn che modo Next.js gestisce la sicurezza delle Server Actions?",
        homework: "1. <strong>Contact API</strong>: Crea un endpoint che logga nel server i messaggi di contatto ricevuti.\n2. <strong>Action Form</strong>: Crea un form che usa una Server Action per aggiungere un commento.\n3. <strong>Zod Validation</strong>: Impedisci l'invio se il messaggio è più lungo di 200 caratteri.\n4. <strong>Toast Feedback</strong>: Mostra una notifica all'utente dopo che l'azione è completata."
      },
      {
        lessonNumber: 10,
        title: "Rendering strategies",
        module: "Modulo Next.js",
        objectives: "• Padroneggiare <strong>SSG, SSR e ISR</strong>.\n• Ottimizzare il <strong>Time to First Byte (TTFB)</strong>.\n• Scegliere la strategia giusta per ogni pagina dell'app.",
        topics: "1. <strong>SSG (Static Site Generation)</strong>: Generare HTML una sola volta al build time.\n2. <strong>SSR (Server Side Rendering)</strong>: Generare HTML fresco per ogni singola richiesta.\n3. <strong>ISR (Incremental Static Regeneration)</strong>: Aggiornare pagine statiche in background senza rebuild.\n4. <strong>Cache Control</strong>: Usare header e tempi di scadenza per la gestione dei dati.\n5. <strong>Dynamic Rendering</strong>: Quando Next.js decide autonomamente di passare a SSR.\n6. <strong>Partial Prerendering</strong>: Il futuro (sperimentale) che unisce statico e dinamico.\n7. <strong>Performance Audit</strong>: Misurare l'impatto di queste scelte sui Core Web Vitals.",
        commands: "export const revalidate = 3600 - Aggiorna la pagina ogni ora\nexport const dynamic = 'force-dynamic' - Disabilita la cache statica",
        reflectionQuestions: "In quale caso ISR è preferibile a un sito completamente statico?\nPerché un'app bancaria dovrebbe usare quasi esclusivamente SSR?\nIn che modo la cache influisce sui costi di gestione del server?",
        homework: "1. <strong>Hybrid App</strong>: Crea una pagina statica (Home) e una dinamica (Profilo).\n2. <strong>ISR Test</strong>: Imposta una pagina con revalidate: 10 e osserva come i dati cambiano ogni 10s.\n3. <strong>Log Analysis</strong>: Osserva i log di build per vedere quali rotte sono statiche (lambda vs cerchio).\n4. <strong>Caching</strong>: Implementa una fetch con tag e usa revalidateTag per svuotarla manualmente."
      },
      {
        lessonNumber: 11,
        title: "Deployment e ottimizzazione finale",
        module: "Modulo Next.js",
        objectives: "• Pubblicare l'app su <strong>Vercel</strong> con Continuous Deployment.\n• Gestire <strong>Variabili d'Ambiente</strong> e segreti in produzione.\n• Analizzare e risolvere i colli di bottiglia delle <strong>Performance</strong>.",
        topics: "1. <strong>Vercel Deployment</strong>: Collegare GitHub e automatizzare i rilasci ad ogni push.\n2. <strong>Environment Variables</strong>: .env.local per lo sviluppo e Secrets per la produzione.\n3. <strong>Middleware</strong>: Intercettare le richieste per gestire auth, redirect e geolocalizzazione.\n4. <strong>Lighthouse & Vitals</strong>: Leggere i report di Google per migliorare accessibilità e velocità.\n5. <strong>Bundle Analyzer</strong>: Identificare pacchetti troppo pesanti che rallentano l'app.\n6. <strong>Custom Domains & SSL</strong>: Configurare l'indirizzo web definitivo con certificato sicuro.\n7. <strong>Troubleshooting</strong>: Leggere i log di produzione per risolvere bug 'introvabili'.",
        commands: "npm run build - Genera i file pronti per il server\nvercel deploy - Comando manuale per il rilascio rapido",
        reflectionQuestions: "Perché è pericoloso usare variabili d'ambiente senza il prefisso NEXT_PUBLIC_ nel client?\nQual è il vantaggio di usare Vercel rispetto a un server tradizionale VPS?\nCome gestiresti un calo improvviso delle performance dopo un aggiornamento?",
        homework: "1. <strong>Go Live</strong>: Esegui il deploy della tua app su Vercel.\n2. <strong>Secrets Setup</strong>: Configura una variabile d'ambiente segreta e usala nel server.\n3. <strong>Final Audit</strong>: Ottieni un punteggio superiore a 90 su Lighthouse per la tua home page.\n4. <strong>Certificate</strong>: Condividi l'URL pubblico del tuo capolavoro!"
      }
    ];

    for (const lesson of initialLessons) {
      await storage.createLesson(lesson);
    }
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Call seed at startup
  await seedDatabase();

  app.get(api.lessons.list.path, async (req, res) => {
    const lessons = await storage.getLessons();
    
    // GESTIONE BLOCCO LEZIONI (LOGICA SERVER)
    if (REQUIRE_SEQUENTIAL_UNLOCK) {
      const processedLessons = lessons.map((lesson, index) => {
        if (index === 0) return { ...lesson, isLocked: false };
        const previousLesson = lessons[index - 1];
        return {
          ...lesson,
          isLocked: !previousLesson.isCompleted
        };
      });
      return res.json(processedLessons);
    }

    res.json(lessons.map(l => ({ ...l, isLocked: false })));
  });

  app.get(api.lessons.get.path, async (req, res) => {
    const lessonId = Number(req.params.id);
    const lesson = await storage.getLesson(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // GESTIONE BLOCCO SINGOLA LEZIONE
    if (REQUIRE_SEQUENTIAL_UNLOCK && lesson.lessonNumber > 1) {
      const allLessons = await storage.getLessons();
      const previousLesson = allLessons.find(l => l.lessonNumber === lesson.lessonNumber - 1);
      if (previousLesson && !previousLesson.isCompleted) {
        return res.status(403).json({ message: 'Questa lezione è bloccata. Completa la precedente per continuare.' });
      }
    }

    res.json(lesson);
  });

  app.patch(api.lessons.update.path, async (req, res) => {
    try {
      const input = api.lessons.update.input.parse(req.body);
      const updated = await storage.updateLesson(Number(req.params.id), input);
      if (!updated) {
        return res.status(404).json({ message: 'Lesson not found' });
      }
      res.status(200).json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
