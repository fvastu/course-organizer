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
        objectives: "• Comprendere i concetti base del versionamento con Git.\n• Utilizzare GitHub per la collaborazione e revisione del codice.\n• Apprendere un workflow professionale tramite branch feature e PR.",
        topics: "1. **Cos'è Git**: Controllo di versione distribuito e perché è vitale per un developer.\n2. **Configurazione iniziale**: Impostare `user.name` e `user.email` globalmente.\n3. **Il ciclo di vita dei file**: Comprendere la differenza tra file untracked, modified, staged e committed.\n4. **Branching Strategy**: Perché non lavoriamo mai direttamente sul branch `main`.\n5. **Remote Repository**: Collegare il lavoro locale a GitHub (push/pull/fetch).\n6. **Pull Request (PR)**: Il cuore della collaborazione moderna e della code review.\n7. **Merge & Conflict**: Cosa succede quando due persone toccano la stessa riga di codice.",
        commands: "git init - Inizializza un nuovo repository locale\ngit clone <url> - Scarica un repository esistente da remoto\ngit status - Controlla lo stato dei file (staged vs unstaged)\ngit add <file> - Sposta i cambiamenti nell'area di stage\ngit commit -m 'messaggio' - Salva uno snapshot dei cambiamenti\ngit branch <nome> - Crea un nuovo ramo di sviluppo\ngit checkout -b <nome> - Crea e passa istantaneamente a un nuovo branch\ngit push origin <branch> - Invia i commit locali al server remoto\ngit pull origin <branch> - Scarica e unisce i cambiamenti remoti nel locale",
        reflectionQuestions: "Perché è fondamentale usare i branch per ogni nuova funzionalità?\nQual è il vantaggio di avere una cronologia dei commit chiara e descrittiva?\nCome cambierebbe il tuo modo di lavorare se non potessi usare Git?",
        homework: "1. **Setup**: Crea un account GitHub se non lo hai e configura Git sul tuo PC.\n2. **Repo**: Crea un repository pubblico chiamato 'esercitazione-git'.\n3. **Feature**: Crea un branch 'add-readme', aggiungi un file README.md con una breve descrizione del corso.\n4. **PR**: Fai il push del branch, apri una Pull Request su GitHub e uniscila (merge) al main.\n5. **Sync**: Torna sul branch main in locale e fai 'git pull' per sincronizzarti."
      },
      {
        lessonNumber: 2,
        title: "React Basics",
        module: "Modulo React",
        objectives: "• Comprendere l'architettura a componenti (LEGO style).\n• Utilizzare JSX per scrivere interfacce dichiarative.\n• Padroneggiare il passaggio di dati tramite Props.",
        topics: "1. **Libreria vs Framework**: Perché React è una libreria e cosa comporta.\n2. **Componenti**: Funzioni che ritornano UI. Pensare a componenti atomici.\n3. **JSX**: Regole d'oro (un solo elemento radice, camelCase per attributi).\n4. **Props**: L'unico modo per far parlare i componenti tra loro (flusso unidirezionale).\n5. **Vite**: Perché lo preferiamo a Create React App per velocità e modernità.",
        commands: "npm create vite@latest - Comando rapido per iniziare un progetto\nnpm install - Installa tutto ciò che serve per far girare l'app\nnpm run dev - Accende il motore di sviluppo con Hot Module Replacement",
        reflectionQuestions: "Cosa rende un componente 'riutilizzabile' secondo te?\nPerché React impedisce ai componenti figli di modificare le props dei padri?\nIn che modo JSX rende più semplice la vita rispetto a document.createElement?",
        homework: "1. **Progetto**: Inizializza una nuova app con Vite chiamata 'task-manager'.\n2. **Componenti**: Crea una cartella 'components' e scrivi i file Header.jsx, TaskList.jsx e TaskItem.jsx.\n3. **Props**: Passa una stringa 'titolo' all'Header e un oggetto 'task' al TaskItem tramite props mock.\n4. **Styling**: Applica delle classi CSS base per distinguere i componenti visivamente."
      },
      {
        lessonNumber: 3,
        title: "Stato e interazioni",
        module: "Modulo React",
        objectives: "• Comprendere il concetto di 'Stato' come memoria del componente.\n• Gestire i form in modo 'controllato'.\n• Intercettare e gestire eventi utente.",
        topics: "1. **useState Hook**: Dichiarare variabili che, se cambiate, aggiornano la UI.\n2. **Immutabilità**: Perché non facciamo mai `state = 'nuovo'` ma usiamo `setState`.\n3. **Eventi**: onClick, onChange e l'oggetto `event`.\n4. **Controlled Components**: Il 'Single Source of Truth' negli input dei form.\n5. **Validazione**: Gestire stati di errore visivi durante l'inserimento dati.",
        commands: "const [data, setData] = useState(init) - Definizione dello stato\ne.preventDefault() - Impedisce il refresh della pagina all'invio del form\ne.target.value - Recupera il valore digitato in un input",
        reflectionQuestions: "Qual è la differenza tra una variabile locale e uno stato di React?\nPerché è importante l'immutabilità quando aggiorniamo un array nello stato?\nCosa succede all'interfaccia se chiami setState dentro il corpo del componente (loop)?",
        homework: "1. **Form**: Nel tuo Task Manager, aggiungi un input di testo e un bottone 'Aggiungi'.\n2. **State**: Crea uno stato per catturare ciò che l'utente scrive.\n3. **Interazione**: Al click del bottone, stampa in console il valore dello stato.\n4. **Bonus**: Pulisci l'input dopo l'invio e impedisci l'invio se il testo è più corto di 3 caratteri."
      },
      {
        lessonNumber: 4,
        title: "Rendering dinamico",
        module: "Modulo React",
        objectives: "• Generare interfacce basate su liste di dati.\n• Implementare logica condizionale complessa nella UI.\n• Risolvere bug legati alle 'key' mancanti.",
        topics: "1. **Array.map()**: Trasformare dati grezzi in elementi visivi in modo elegante.\n2. **La Prop Key**: Perché è l'identità del componente per React.\n3. **Short-circuit (&&)**: Visualizzare elementi solo se una condizione è vera.\n4. **Operatore Ternario**: Gestire switch tra due stati visivi (es. caricamento/dati).\n5. **Delete Pattern**: Filtrare l'array di stato per rimuovere elementi per ID.",
        commands: "list.map(item => <Item key={item.id} />) - Rendering di liste\n{loading && <Spinner />} - Rendering condizionale rapido\n{items.length > 0 ? <List /> : <Empty />} - Rendering condizionale con fallback",
        reflectionQuestions: "Perché usare l'indice dell'array come 'key' è considerato una cattiva pratica?\nIn quali casi preferiresti un && rispetto a un operatore ternario?\nCome gestisci l'esperienza utente (UX) quando non ci sono dati da mostrare?",
        homework: "1. **Lista**: Crea uno stato 'tasks' (array di oggetti) e mostralo usando .map().\n2. **Delete**: Aggiungi un'icona cestino a ogni task. Al click, rimuovi quel task dallo stato.\n3. **Empty State**: Se l'array è vuoto, mostra un messaggio illustrato o un testo 'Tutto fatto!'.\n4. **ID**: Usa `crypto.randomUUID()` o un contatore per dare ID univoci ai nuovi task."
      },
      {
        lessonNumber: 5,
        title: "Stato avanzato e composizione",
        module: "Modulo React",
        objectives: "• Condividere logica tra componenti distanti.\n• Implementare sistemi di ricerca e filtri in tempo reale.\n• Ottimizzare la struttura dei componenti per evitare confusione.",
        topics: "1. **Lifting State Up**: Quando due componenti hanno bisogno dello stesso dato.\n2. **Filtri dinamici**: Creare stati per i criteri di ricerca (search query, categoria).\n3. **Stato Derivato**: Perché non serve un nuovo `useState` per i risultati filtrati.\n4. **Prop Drilling**: Come riconoscerlo e come la composizione può risolverlo.\n5. **Composizione**: Usare la prop `children` per creare wrapper flessibili.",
        commands: "const visibleTasks = tasks.filter(t => t.text.includes(query)) - Calcolo derivato\n<Wrapper>{children}</Wrapper> - Esempio di composizione",
        reflectionQuestions: "Qual è il segnale che ti indica che devi 'alzare' lo stato al padre?\nPerché calcolare i dati filtrati durante il render è meglio che salvarli in un secondo stato?\nCome immagini di organizzare un'app con centinaia di componenti senza impazzire?",
        homework: "1. **Search**: Aggiungi un input di ricerca sopra la lista.\n2. **Filter**: Implementa dei bottoni (Pillole) per filtrare tra 'Tutti', 'Aperti', 'Completati'.\n3. **Stats**: Mostra una stringa dinamica: 'Stai visualizzando X task su Y totali'.\n4. **Toggle**: Permetti di segnare un task come completato cliccando sul testo."
      },
      {
        lessonNumber: 6,
        title: "Side Effects e persistenza dati",
        module: "Modulo React",
        objectives: "• Gestire operazioni 'fuori dal controllo' di React.\n• Rendere l'applicazione persistente al refresh della pagina.\n• Sincronizzare lo stato con le API del browser.",
        topics: "1. **useEffect**: Il coltellino svizzero per fetch, timer e storage.\n2. **Array di dipendenze**: Capire quando l'effetto deve 'scattare' (mount, update, unmount).\n3. **LocalStorage**: La memoria a lungo termine del browser.\n4. **Parsing JSON**: Trasformare oggetti in stringhe e viceversa per lo storage.\n5. **Ciclo di vita**: Cosa succede quando un componente 'muore' (Cleanup function).",
        commands: "useEffect(() => { ... }, []) - Esegue il codice solo all'avvio\nlocalStorage.getItem('tasks') - Recupera i dati salvati\nlocalStorage.setItem('tasks', JSON.stringify(val)) - Salva i dati",
        reflectionQuestions: "Cosa accadrebbe se facessi una fetch dentro useEffect senza array di dipendenze?\nIn che modo localStorage migliora la User Experience?\nPerché dobbiamo trasformare i nostri array in stringhe prima di salvarli?",
        homework: "1. **Persistenza**: Salva l'array dei task su localStorage ogni volta che cambia.\n2. **Init**: Al caricamento dell'app, controlla se ci sono task salvati e impostali come stato iniziale.\n3. **Cleanup**: Aggiungi un `console.log` che avvisa quando un TaskItem viene rimosso dal DOM.\n4. **Final Check**: Assicurati che l'app funzioni anche dopo aver ricaricato la pagina (F5)."
      },
      {
        lessonNumber: 7,
        title: "Fondamenti di Next.js",
        module: "Modulo Next.js",
        objectives: "• Comprendere il passaggio da SPA a Multi-Page Application.\n• Padroneggiare l'App Router e la gerarchia dei file.\n• Scegliere saggiamente tra Server e Client Components.",
        topics: "1. **App Router**: La rivoluzione della cartella `app/`.\n2. **File Speciali**: page.tsx (UI), layout.tsx (struttura), loading.tsx (skeleton).\n3. **Server Components**: Perché il 90% del tuo codice dovrebbe girare sul server.\n4. **Client Components**: Quando serve interattività (eventi, state, hooks).\n5. **SEO Out-of-the-box**: Gestire i Metadata in modo dichiarativo.",
        commands: "npx create-next-app@latest - Lo scaffold ufficiale\n'use client' - La direttiva magica per abilitare gli hook",
        reflectionQuestions: "Qual è il limite principale di una SPA tradizionale per la SEO?\nPerché i Server Components riducono drasticamente la dimensione del bundle JS inviato al client?\nCome cambia il tuo modo di pensare se il codice gira prima sul server?",
        homework: "1. **Setup**: Crea un nuovo progetto Next.js chiamato 'my-content-hub'.\n2. **Pagine**: Crea le rotte `/about`, `/contact` e `/blog` usando le cartelle.\n3. **Layout**: Crea un layout principale con una testata scura e un footer.\n4. **Metadata**: Aggiungi titoli e descrizioni uniche per ogni pagina."
      },
      {
        lessonNumber: 8,
        title: "Routing dinamico e Data Fetching",
        module: "Modulo Next.js",
        objectives: "• Creare migliaia di pagine con un solo file.\n• Recuperare dati dal server con zero sforzo (async/await).\n• Gestire stati di caricamento eleganti con Suspense.",
        topics: "1. **Dynamic Segments**: Usare le parentesi quadre `[slug]` o `[id]`.\n2. **Params**: Come leggere i dati dall'URL dentro il componente.\n3. **Server-side Fetching**: Dimentica `useEffect` e `loading states`, usa `await fetch()`.\n4. **Caching**: Capire come Next.js memorizza le risposte delle API.\n5. **generateStaticParams**: Generare pagine statiche velocissime al build time.",
        commands: "export default async function Page({ params }) { ... } - Firma di una pagina dinamica",
        reflectionQuestions: "Perché è meglio fare fetch sul server rispetto al client per la sicurezza (API Keys)?\nIn che modo `loading.tsx` migliora la percezione di velocità dell'app?\nQual è la differenza tra un parametro di rotta (`/post/1`) e una query string (`/search?q=react`)?",
        homework: "1. **Blog Dinamico**: Crea la rotta `blog/[id]`. Mostra l'ID nell'interfaccia.\n2. **Fetch**: Usa `JSONPlaceholder` per recuperare un post specifico tramite l'ID dell'URL.\n3. **Async**: Trasforma il componente in `async` e usa `await` per i dati.\n4. **Fallback**: Crea un file `not-found.tsx` per gestire ID inesistenti."
      },
      {
        lessonNumber: 9,
        title: "API Routes e form submission",
        module: "Modulo Next.js",
        objectives: "• Costruire il proprio backend dentro Next.js.\n• Gestire l'invio di dati complessi dal frontend al server.\n• Validare i dati con criteri di sicurezza.",
        topics: "1. **Route Handlers**: Creare endpoint `GET`, `POST`, `DELETE` in file `route.ts`.\n2. **Request Body**: Leggere JSON inviati dal client.\n3. **Server Actions**: La nuova via per gestire i form senza API esterne.\n4. **Status Codes**: Rispondere con 201 (Created), 400 (Bad Request), 500 (Error).\n5. **Zod Integration**: Validare che i dati siano nel formato corretto.",
        commands: "export async function POST(req: Request) { ... } - Definizione di un endpoint POST",
        reflectionQuestions: "Perché preferiresti una Server Action rispetto a una classica API Route?\nIn che modo il server protegge il tuo database dagli attacchi malevoli?\nCosa succede se il client invia dati nel formato sbagliato? Come risponde la tua API?",
        homework: "1. **API**: Crea un endpoint `api/posts` che accetta una `POST` per creare un nuovo articolo.\n2. **Form**: Crea un form React nella pagina `/blog/new`.\n3. **Submission**: All'invio, usa `fetch` per mandare i dati all'API appena creata.\n4. **Redirect**: Dopo il successo, reindirizza l'utente alla lista dei post."
      },
      {
        lessonNumber: 10,
        title: "Rendering strategies",
        module: "Modulo Next.js",
        objectives: "• Diventare un esperto di performance web.\n• Scegliere il bilanciamento perfetto tra velocità e freschezza dei dati.\n• Implementare l'aggiornamento incrementale dei contenuti.",
        topics: "1. **SSG (Static)**: Velocità imbattibile, ma dati fissi al build.\n2. **SSR (Dynamic)**: Dati sempre freschi, ma un po' più lento.\n3. **ISR (Incremental)**: Il meglio dei due mondi. Aggiorna lo statico ogni X secondi.\n4. **Revalidation**: Usare tag o tempi per svuotare la cache.\n5. **Client Fetching**: Quando i dati sono privati (es. dashboard utente).",
        commands: "fetch(url, { next: { revalidate: 60 } }) - Abilita ISR su una fetch",
        reflectionQuestions: "Per un sito di news, quale strategia sceglieresti e ogni quanto tempo?\nE per un pannello di controllo bancario? Perché?\nIn che modo ISR aiuta a scalare applicazioni con milioni di pagine?",
        homework: "1. **ISR**: Imposta la tua pagina blog per rigenerarsi ogni 30 secondi.\n2. **Dynamic**: Trasforma una pagina in 'force-dynamic' e osserva la differenza nei log del server.\n3. **Experiment**: Cambia un dato nell'API esterna e osserva dopo quanto tempo la tua pagina Next.js si aggiorna."
      },
      {
        lessonNumber: 11,
        title: "Deployment e ottimizzazione finale",
        module: "Modulo Next.js",
        objectives: "• Portare il lavoro dal locale al mondo intero.\n• Gestire i segreti di produzione con professionalità.\n• Analizzare i Core Web Vitals per una SEO da primo posto.",
        topics: "1. **Vercel**: Il paradiso del deployment per Next.js.\n2. **Environment Variables**: `.env.production` e i segreti nel pannello di controllo.\n3. **Middleware**: Proteggere rotte intere con poche righe di codice.\n4. **Lighthouse**: Misurare performance, accessibilità e SEO.\n5. **Bundle Analysis**: Vedere quali librerie pesano troppo e rimuoverle.",
        commands: "npm run build - Il test finale prima del lancio\nmiddleware.ts - Il file guardiano all'ingresso dell'app",
        reflectionQuestions: "Perché non usiamo mai le chiavi API 'in chiaro' nel codice sorgente?\nQual è il vantaggio di collegare GitHub a Vercel per il Continuous Deployment?\nCosa faresti se il tuo punteggio Lighthouse fosse basso in 'Performance'?",
        homework: "1. **Deploy**: Carica il progetto finale su GitHub e collegalo a Vercel.\n2. **Secrets**: Aggiungi una variabile d'ambiente `API_KEY` su Vercel.\n3. **Audit**: Lancia un report Lighthouse sulla tua app live e salva lo screenshot.\n4. **Certificazione**: Condividi il link dell'app funzionante!"
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
