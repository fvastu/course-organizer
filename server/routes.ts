import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api, errorSchemas } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingLessons = await storage.getLessons();
  if (existingLessons.length === 0) {
    const initialLessons = [
      {
        lessonNumber: 1,
        title: "Git & GitHub Fundamentals",
        module: "Fondamenti",
        objectives: "Comprendere i concetti base del versionamento con Git.\nUtilizzare GitHub per la collaborazione e revisione del codice.\nApprendere un workflow professionale tramite branch feature e PR.",
        topics: "1. Cos'è Git: controllo di versione distribuito.\n2. Configurazione iniziale: git config --global user.name/email.\n3. Ciclo di vita dei file: untracked, modified, staged, committed.\n4. Branching strategy: main branch e feature branches.\n5. Remote repository: clonazione, push e pull.\n6. Pull Request (PR): processo di revisione e merge.\n7. Gestione dei conflitti: risoluzione manuale.",
        commands: "git init - Inizializza un repository\ngit clone <url> - Clona un repository remoto\ngit status - Mostra lo stato dei file\ngit add . - Aggiunge i file all'area di stage\ngit commit -m 'messaggio' - Crea un commit\ngit branch <nome> - Crea un nuovo branch\ngit checkout <nome> - Cambia branch\ngit push origin <branch> - Invia i cambiamenti al server\ngit pull origin <branch> - Scarica i cambiamenti dal server",
        homework: "1. Crea un repository personale su GitHub.\n2. Clona il repository in locale.\n3. Crea un branch chiamato 'feature-bio'.\n4. Aggiungi un file bio.txt con una breve descrizione.\n5. Fai commit e push sul branch remoto.\n6. Apri una Pull Request su GitHub e fai il merge."
      },
      {
        lessonNumber: 2,
        title: "React Basics",
        module: "Modulo React",
        objectives: "Comprendere l'architettura a componenti di React.\nUtilizzare JSX e props per la composizione dell'interfaccia.\nConfigurare l'ambiente di sviluppo con Vite.",
        topics: "1. Introduzione a React: libreria vs framework.\n2. Componenti: function components e arrow functions.\n3. JSX: JavaScript XML e regole di sintassi.\n4. Props: passaggio di dati tra componenti (top-down).\n5. Composizione: annidamento di componenti.\n6. Vite: creazione di un progetto React moderno.",
        commands: "npm create vite@latest - Crea un nuovo progetto\nnpm install - Installa le dipendenze\nnpm run dev - Avvia il server di sviluppo",
        homework: "1. Crea un progetto con Vite.\n2. Sviluppa un componente 'Header'.\n3. Crea un componente 'TaskList' che riceve un array di task via props.\n4. Crea un componente 'TaskItem' per visualizzare il singolo task."
      },
      {
        lessonNumber: 3,
        title: "Stato e interazioni",
        module: "Modulo React",
        objectives: "Comprendere il concetto di stato (state) e reattività.\nGestire input e form controllati.\nUtilizzare gli eventi di React.",
        topics: "1. Hook useState: inizializzazione e aggiornamento.\n2. Reattività: come React ri-renderizza i componenti.\n3. Event Handling: onClick, onChange, onSubmit.\n4. Form controllati: legare l'input allo stato.\n5. Validazione base: gestire messaggi d'errore.",
        commands: "import { useState } from 'react';\nconst [value, setValue] = useState(initial);",
        homework: "1. Aggiungi uno stato per gestire il testo di un nuovo task.\n2. Crea un form per aggiungere task alla lista.\n3. Implementa una validazione: non permettere task vuoti.\n4. Visualizza un messaggio di successo dopo l'aggiunta."
      },
      {
        lessonNumber: 4,
        title: "Rendering dinamico",
        module: "Modulo React",
        objectives: "Visualizzare liste di elementi dinamicamente.\nGestire il rendering condizionale.\nComprendere l'importanza della prop 'key'.",
        topics: "1. Metodo .map(): trasformare array in elementi JSX.\n2. Prop key: perché React ne ha bisogno per le performance.\n3. Rendering condizionale: operatori && e ternari.\n4. Empty states: cosa mostrare quando la lista è vuota.\n5. Pattern per la rimozione di elementi dallo stato.",
        commands: "{items.map(item => <Component key={item.id} />)}\n{isVisible && <Content />}\n{isLoggedIn ? <Logout /> : <Login />}",
        homework: "1. Implementa la cancellazione di un task tramite un bottone 'Rimuovi'.\n2. Mostra un messaggio 'Nessun task presente' quando la lista è vuota.\n3. Aggiungi un contatore dei task totali."
      },
      {
        lessonNumber: 5,
        title: "Stato avanzato e composizione",
        module: "Modulo React",
        objectives: "Gestire lo stato condiviso tra componenti (Lifting State Up).\nImplementare logica di filtraggio e ricerca.\nEvitare il Prop Drilling tramite la composizione.",
        topics: "1. Lifting State Up: spostare lo stato al parent comune.\n2. Filtraggio dati: usare .filter() basato su input di ricerca.\n3. Stato derivato: calcolare valori basati sullo stato esistente.\n4. Component Composition: passare componenti come figli.\n5. Gestione di stati complessi (oggetti/array).",
        commands: "const filtered = items.filter(item => item.text.includes(search));",
        homework: "1. Sposta lo stato dei task nel componente App.\n2. Aggiungi una barra di ricerca per filtrare i task per testo.\n3. Aggiungi filtri per stato: 'Tutti', 'Completati', 'Da completare'."
      },
      {
        lessonNumber: 6,
        title: "Side Effects e persistenza dati",
        module: "Modulo React",
        objectives: "Comprendere l'esecuzione di effetti collaterali con useEffect.\nPersistere i dati nel browser tramite localStorage.\nGestire il ciclo di vita dei componenti.",
        topics: "1. Hook useEffect: quando e perché usarlo.\n2. Dependency Array: controllare quando l'effetto viene eseguito.\n3. LocalStorage: salvataggio (setItem) e recupero (getItem).\n4. Cleanup function: evitare memory leaks.\n5. Sincronizzazione stato-storage.",
        commands: "useEffect(() => { ... }, [deps]);\nlocalStorage.setItem('key', JSON.stringify(data));\nJSON.parse(localStorage.getItem('key'));",
        homework: "1. Carica i task da localStorage all'avvio dell'app.\n2. Salva i task su localStorage ogni volta che lo stato cambia.\n3. Aggiungi un pulsante per 'Svuota tutto' che pulisce anche lo storage."
      },
      {
        lessonNumber: 7,
        title: "Fondamenti di Next.js",
        module: "Modulo Next.js",
        objectives: "Comprendere l'architettura di Next.js (App Router).\nDifferenziare tra Server e Client Components.\nGestire il routing basato su file system.",
        topics: "1. App Router: la cartella app e la struttura dei file.\n2. Routing: page.tsx, layout.tsx, loading.tsx.\n3. Server Components: default in Next.js, performance e SEO.\n4. Client Components: quando usare 'use client'.\n5. Metadata API: gestire title e meta tag.",
        commands: "npx create-next-app@latest\n'use client'; // Direttiva per componenti client",
        homework: "1. Crea un nuovo progetto Next.js.\n2. Crea una pagina 'About' (/about).\n3. Implementa un layout condiviso con Navbar e Footer.\n4. Personalizza i metadata per la home page."
      },
      {
        lessonNumber: 8,
        title: "Routing dinamico e Data Fetching",
        module: "Modulo Next.js",
        objectives: "Gestire rotte dinamiche tramite parametri nell'URL.\nImplementare il data fetching asincrono nei Server Components.\nUtilizzare fetch() con caching e revalidation.",
        topics: "1. Dynamic Routes: segmenti [slug] o [id].\n2. params e searchParams: recuperare dati dall'URL.\n3. Data Fetching asincrono: async components.\n4. generateStaticParams: pre-rendering di rotte dinamiche.\n5. Loading UI e Suspense.",
        commands: "export default async function Page({ params }) { ... }",
        homework: "1. Crea una rotta dinamica per i dettagli di un post (/blog/[id]).\n2. Effettua una fetch a un'API esterna (es. JSONPlaceholder) per mostrare i dati.\n3. Implementa una pagina di caricamento personalizzata con loading.tsx."
      },
      {
        lessonNumber: 9,
        title: "API Routes e form submission",
        module: "Modulo Next.js",
        objectives: "Creare endpoint API all'interno di Next.js.\nGestire invii di form con Server Actions o API.\nComprendere la gestione del body delle richieste.",
        topics: "1. Route Handlers: creare file route.ts per API GET/POST.\n2. Request e Response: gestire header e JSON.\n3. Server Actions: gestire form senza endpoint API (opzionale).\n4. Validazione server-side dei dati ricevuti.\n5. Gestione degli errori API.",
        commands: "export async function POST(request: Request) { ... }",
        homework: "1. Crea un'API Route per ricevere i dati di un contatto.\n2. Crea un form che invia i dati a questa API tramite fetch.\n3. Mostra un messaggio di conferma o errore basato sulla risposta del server."
      },
      {
        lessonNumber: 10,
        title: "Rendering strategies",
        module: "Modulo Next.js",
        objectives: "Differenziare tra SSG, SSR e ISR.\nScegliere la strategia migliore per le performance.\nOttimizzare il caricamento dei dati.",
        topics: "1. Static Site Generation (SSG): pre-build dei contenuti.\n2. Server-Side Rendering (SSR): rendering on-demand.\n3. Incremental Static Regeneration (ISR): aggiornare pagine statiche in background.\n4. Cache e Revalidation: usare next: { revalidate: 60 }.\n5. Client-side fetching: quando preferire SWR o React Query.",
        commands: "fetch(url, { next: { revalidate: 3600 } });",
        homework: "1. Configura una pagina per usare ISR (revalidate ogni 60 secondi).\n2. Confronta i tempi di caricamento tra una pagina SSR e una SSG.\n3. Implementa il fetching lato client per dati che cambiano frequentemente."
      },
      {
        lessonNumber: 11,
        title: "Deployment e ottimizzazione finale",
        module: "Modulo Next.js",
        objectives: "Preparare l'applicazione per la produzione.\nGestire variabili d'ambiente in modo sicuro.\nEffettuare il deployment su Vercel.",
        topics: "1. Build process: npm run build e controllo errori.\n2. Environment Variables: .env.local vs production secrets.\n3. Middleware: gestire reindirizzamenti o autenticazione base.\n4. Deployment su Vercel: integrazione con GitHub.\n5. Performance monitoring e Core Web Vitals.",
        commands: "npm run build - Crea la build di produzione\nnpm run start - Avvia la build locale",
        homework: "1. Collega il tuo repository GitHub a Vercel.\n2. Configura le variabili d'ambiente su Vercel.\n3. Esegui il deploy e verifica il funzionamento dell'app live.\n4. Controlla il report di Lighthouse per le performance."
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
    res.json(lessons);
  });

  app.get(api.lessons.get.path, async (req, res) => {
    const lesson = await storage.getLesson(Number(req.params.id));
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
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
