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
        objectives: "Comprendere i concetti base del versionamento con Git. Utilizzare GitHub per la collaborazione e revisione del codice. Apprendere un workflow professionale tramite branch feature e PR.",
        topics: "Creazione e clonazione di repository. Commit, branch e merge. Creazione di Pull Request e code review. Gestione dei conflitti e convenzioni di naming.",
        homework: "Creare un repository personale. Creare un branch di feature dedicato. Aprire una Pull Request, ricevere feedback e completare il merge."
      },
      {
        lessonNumber: 2,
        title: "React Basics",
        module: "Modulo React",
        objectives: "Comprendere l'architettura a componenti di React. Utilizzare JSX e props per la composizione dell'interfaccia.",
        topics: "Creazione e riuso di componenti. Props e flusso unidirezionale dei dati. Struttura di un progetto React creato con Vite o CRA.",
        homework: "Sviluppo componenti TaskList e TaskItem con dati mock."
      },
      {
        lessonNumber: 3,
        title: "Stato e interazioni",
        module: "Modulo React",
        objectives: "Comprendere il concetto di stato (state) e reattività del DOM virtuale. Gestire input e form controllati.",
        topics: "Hook useState. Gestione eventi (onClick, onChange). Form controllati e validazione base.",
        homework: "Implementare un form di aggiunta task con validazione sui campi."
      },
      {
        lessonNumber: 4,
        title: "Rendering dinamico",
        module: "Modulo React",
        objectives: "Visualizzare liste e contenuti condizionali. Comprendere come React aggiorna la UI in base ai dati.",
        topics: "Metodo .map() e prop key. Conditional rendering con operatori logici e ternari. Empty states e UX.",
        homework: "Implementare la rimozione di task e la gestione dello stato 'nessun elemento'."
      },
      {
        lessonNumber: 5,
        title: "Stato avanzato e composizione",
        module: "Modulo React",
        objectives: "Gestire più componenti che condividono stato. Applicare filtri, ricerche e ordinamenti ai dati.",
        topics: "Lifting state up. Funzioni di filtro e ricerca. Prop drilling e component composition.",
        homework: "Aggiungere ricerca e filtro per stato dei task (completati, in corso, ecc.)."
      },
      {
        lessonNumber: 6,
        title: "Side Effects e persistenza dati",
        module: "Modulo React",
        objectives: "Comprendere l'esecuzione di effetti collaterali. Salvare i dati localmente tra sessioni.",
        topics: "Hook useEffect. Sincronizzazione con localStorage. Ciclo di vita del componente e cleanup.",
        homework: "Una SPA completa per la gestione di task, persistente e interattiva."
      },
      {
        lessonNumber: 7,
        title: "Fondamenti di Next.js",
        module: "Modulo Next.js",
        objectives: "Comprendere la differenza tra React Client e App Router. Organizzare un progetto Next.js moderno.",
        topics: "File system routing. Layout, page, e componenti server/client. Gestione degli assets e metadata.",
        homework: "Creare una pagina 'About' con layout personalizzato."
      },
      {
        lessonNumber: 8,
        title: "Routing dinamico e Data Fetching",
        module: "Modulo Next.js",
        objectives: "Server vs Client Components. Creare rotte dinamiche e generare pagine a partire da dati. Imparare le modalità di data fetching nel server e nel client.",
        topics: "Segmenti dinamici [slug]. Funzioni generateStaticParams e fetch. Rendering condizionale basato sui dati.",
        homework: "Creare pagina dettaglio di un post con path dinamico."
      },
      {
        lessonNumber: 9,
        title: "API Routes e form submission",
        module: "Modulo Next.js",
        objectives: "Saper creare endpoint server-side all'interno di Next.js. Gestire invii di form e richieste POST dal frontend.",
        topics: "API Routes (GET, POST). Gestione del body e risposte JSON. Invio dati da un form React/Next.js.",
        homework: "Creare un semplice form per creare articoli e salvarli via API."
      },
      {
        lessonNumber: 10,
        title: "Rendering strategies",
        module: "Modulo Next.js",
        objectives: "Differenziare tra SSG, SSR e ISR. Valutare vantaggi e casi d'uso.",
        topics: "Static Site Generation (SSG). Server-Side Rendering (SSR). Incremental Static Regeneration (ISR). Ottimizzazione performance e SEO.",
        homework: "Realizzare un esempio pratico comparando le tre strategie."
      },
      {
        lessonNumber: 11,
        title: "Deployment e ottimizzazione finale",
        module: "Modulo Next.js",
        objectives: "Pubblicare un'app Next.js in ambiente di produzione. Configurare variabili d'ambiente e middleware base.",
        topics: "Gestione .env e segreti. Middleware e autenticazione di base. Deploy su Vercel (o Netlify). Troubleshooting post-deploy.",
        homework: "Nessun homework. Deployment completato."
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
