export type LessonSection = {
  title: string;
  paragraphs: string[];
  bullets: string[];
};

export type LessonSnapshot = {
  title: string;
  src: string;
  caption: string;
};

export type LessonAcademyContent = {
  intro: string;
  context: string[];
  sections: LessonSection[];
  commonMistakes: string[];
  checklist: string[];
  snapshots: LessonSnapshot[];
};

export const LESSON_ACADEMY: Record<number, LessonAcademyContent> = {
  1: {
    intro:
      "In questa lezione impari Git come sistema di controllo della conoscenza tecnica: ogni commit racconta una decisione, non solo una modifica.",
    context: [
      "Scenario didattico: lavori in team su un progetto semestrale e dovete evitare sovrascritture e perdita di lavoro.",
      "Scenario aziendale: una fix urgente deve arrivare in produzione senza rompere il ramo principale.",
    ],
    sections: [
      {
        title: "Modello mentale corretto",
        paragraphs: [
          "Git non e un cloud drive: e un grafo di commit immutabili collegati tra loro.",
          "Il branch e solo un puntatore mobile: capirlo chiarisce merge, rebase e conflitti.",
        ],
        bullets: [
          "Commit piccoli e atomici",
          "Messaggi che spiegano il perche",
          "PR focalizzate su una singola responsabilita",
        ],
      },
      {
        title: "Quando usare merge o rebase",
        paragraphs: [
          "Usa merge per preservare esplicitamente la storia di integrazione tra rami.",
          "Usa rebase nel branch feature per una storia lineare prima della pull request.",
        ],
        bullets: [
          "Mai rebase su branch condivisi gia pubblicati",
          "Mai force push su main",
        ],
      },
      {
        title: "Tag e deploy release-based",
        paragraphs: [
          "Un tag identifica in modo immutabile il commit di una release (es. v1.0.0).",
          "Deployare da tag rende il rilascio ripetibile: sai sempre esattamente quale commit e andato in produzione.",
        ],
        bullets: [
          "Preferisci tag annotati (`git tag -a`) per includere messaggio release",
          "Pipeline CI su pattern `v*` per deploy controllati",
          "Rollback rapido: ridistribuisci tag precedente stabile",
        ],
      },
    ],
    commonMistakes: [
      "Commit monolitici con file non correlati",
      "Messaggi vaghi tipo 'fix' o 'update'",
      "Conflitti risolti senza test finale locale",
      "Deploy da branch volatile senza tag di riferimento",
    ],
    checklist: [
      "Ho sincronizzato il branch con main",
      "Ogni commit ha una responsabilita chiara",
      "La PR include descrizione, contesto e test",
      "La release e marcata con tag annotato pubblicato su origin",
    ],
    snapshots: [
      {
        title: "Flusso completo workspace -> staging -> repository",
        src: "https://i.sstatic.net/qPcFI.png",
        caption: "Schema operativo con passaggi tra area di lavoro, staging, commit locale e remoto.",
      },
      {
        title: "Aree di Git: working directory, staging, repository",
        src: "/snapshots/git-areas.png",
        caption: "Schema delle tre aree principali del flusso Git (fonte: git-scm.com / Pro Git).",
      },
      {
        title: "Ciclo di vita dei file in Git",
        src: "/snapshots/git-lifecycle.png",
        caption: "Stati tipici di un file: untracked, modified, staged, committed (fonte: git-scm.com / Pro Git).",
      },
      {
        title: "Esempio di branching",
        src: "/snapshots/basic-branching-1.png",
        caption: "Vista grafica di un flusso branch/merge di base (fonte: git-scm.com / Pro Git).",
      },
      {
        title: "Mappa branch Git",
        src: "/snapshots/git-graph.svg",
        caption: "Visuale sintetica di main, feature e merge commit.",
      },
    ],
  },
  2: {
    intro:
      "React e una libreria per costruire interfacce moderne a componenti: la UI e descritta in modo dichiarativo e aggiornata in base a stato e props.",
    context: [
      "Scenario didattico: trasformare una pagina HTML monolitica in componenti riusabili e testabili.",
      "Scenario reale: ridurre duplicazione e regressioni quando il prodotto cresce con nuove schermate.",
    ],
    sections: [
      {
        title: "Cos'e React e perche si usa",
        paragraphs: [
          "React separa la UI in componenti indipendenti, facilitando manutenzione, riuso e collaborazione in team.",
          "Il modello dichiarativo riduce la manipolazione manuale del DOM e rende il comportamento dell'interfaccia piu prevedibile.",
        ],
        bullets: [
          "Componenti riusabili",
          "Flusso dati chiaro",
          "Ecosistema ricco (routing, form, state management, testing)",
        ],
      },
      {
        title: "Virtual DOM e reconciliation",
        paragraphs: [
          "React mantiene una rappresentazione virtuale della UI in memoria (Virtual DOM).",
          "A ogni aggiornamento confronta il nuovo albero con il precedente (diffing) e applica solo patch minime al DOM reale.",
          "Questo approccio migliora performance percepita e riduce aggiornamenti non necessari.",
        ],
        bullets: [
          "Aggiornamenti granulari",
          "Minor costo su operazioni DOM ripetute",
          "Importanza di key stabili nelle liste",
        ],
      },
      {
        title: "Component thinking",
        paragraphs: [
          "Parti dal layout e individua blocchi autonomi: header, hero, card, footer.",
          "Ogni componente riceve solo i dati che gli servono e non di piu.",
        ],
        bullets: ["Singola responsabilita", "Props tipizzate", "Nomi esplicativi"],
      },
      {
        title: "JSX con disciplina",
        paragraphs: [
          "JSX non e HTML puro: className, camelCase e espressioni in graffe sono regole fondamentali.",
        ],
        bullets: [
          "Preferisci mappe da array a blocchi duplicati",
          "Evita logica complessa direttamente nel return",
        ],
      },
    ],
    commonMistakes: [
      "Confondere React con un framework fullstack: React gestisce la UI, non tutto il backend",
      "Pensare che il Virtual DOM elimini sempre ogni problema di performance senza progettazione",
      "Componenti troppo grandi e poco testabili",
      "Props non tipizzate in TypeScript",
      "Mescolare dati hardcoded in piu punti",
    ],
    checklist: [
      "So spiegare React in 2 frasi (cosa fa e perche conviene)",
      "So spiegare il Virtual DOM e la reconciliation con un esempio",
      "Ho separato componenti presentazionali e container",
      "Le props sono tipizzate",
      "La UI e leggibile anche senza commenti",
    ],
    snapshots: [
      {
        title: "Albero componenti React",
        src: "/snapshots/react-tree.svg",
        caption: "Gerarchia parent/child con flusso unidirezionale delle props.",
      },
    ],
  },
  3: {
    intro:
      "Lo stato governa il comportamento dell'interfaccia: capire quando e come aggiornarlo evita il 70% dei bug UI.",
    context: [
      "Scenario login: validazione in tempo reale su email e password.",
      "Scenario dashboard: contatori e filtri che reagiscono agli eventi utente.",
    ],
    sections: [
      {
        title: "useState in pratica",
        paragraphs: [
          "L'aggiornamento e asincrono e batchato: ragiona in termini di prossimo stato, non stato immediato.",
        ],
        bullets: [
          "Usa update funzionali quando dipendi dal valore precedente",
          "Mantieni stato minimo indispensabile",
        ],
      },
      {
        title: "Form controllati",
        paragraphs: [
          "Input controllato significa sorgente di verita nel componente React.",
          "La validazione progressiva migliora UX e riduce errori al submit.",
        ],
        bullets: ["onChange + value", "Feedback contestuale", "Submit robusto"],
      },
    ],
    commonMistakes: [
      "Doppia fonte di verita tra DOM e stato React",
      "Validazione solo finale senza contesto",
      "Mutazione diretta di oggetti in stato",
    ],
    checklist: [
      "Ogni input usa value e onChange",
      "Gli errori appaiono vicino al campo",
      "Uso setState funzionale dove necessario",
    ],
    snapshots: [
      {
        title: "Flusso evento -> stato -> UI",
        src: "/snapshots/state-loop.svg",
        caption: "Schema del ciclo reattivo nei componenti React.",
      },
    ],
  },
  4: {
    intro: "Rendering dinamico significa tradurre dati in struttura visiva mantenendo identita stabile degli elementi.",
    context: [
      "Scenario task board con lista variabile e filtri.",
      "Scenario ecommerce con catalogo e stati vuoti.",
    ],
    sections: [
      {
        title: "Liste e key",
        paragraphs: [
          "La key non e un dettaglio: e il contratto di identita tra dato e nodo renderizzato.",
        ],
        bullets: ["Usa ID stabili", "Evita index su liste mutate"],
      },
      {
        title: "Condizioni leggibili",
        paragraphs: [
          "Una UI robusta mostra stati loading, empty, success, error in modo esplicito.",
        ],
        bullets: ["Ternary per biforcazioni brevi", "Componenti dedicati per stati complessi"],
      },
    ],
    commonMistakes: ["Key instabili", "Filtri distruttivi", "Empty state assente"],
    checklist: [
      "Ogni lista usa key stabile",
      "Esistono stati vuoti e di errore",
      "I filtri non mutano la sorgente originale",
    ],
    snapshots: [
      {
        title: "Vista stati UI",
        src: "/snapshots/ui-states.svg",
        caption: "Comparazione tra loading, empty e success state.",
      },
    ],
  },
  5: {
    intro: "La composizione avanzata ti permette di scalare il codice mantenendo chiarezza e riducendo accoppiamento.",
    context: [
      "Scenario board con toolbar e lista che condividono filtri.",
      "Scenario enterprise con layout riusabili in pagine diverse.",
    ],
    sections: [
      {
        title: "Lifting state up",
        paragraphs: [
          "Lo stato va posizionato nel punto piu alto che serve ai componenti coinvolti, non oltre.",
        ],
        bullets: ["Evita prop drilling eccessivo", "Introduci contesto solo quando necessario"],
      },
      {
        title: "Stato derivato",
        paragraphs: [
          "Se un valore puo essere calcolato da altri dati, derivarlo evita incoerenze e duplicazioni.",
        ],
        bullets: ["No copie inutili", "No sincronizzazioni manuali fragili"],
      },
    ],
    commonMistakes: ["Stato duplicato", "Callback non tipizzate", "Componenti troppo intelligenti"],
    checklist: ["Stato unico per i dati condivisi", "UI separata dalla logica", "Derivazioni calcolate on-demand"],
    snapshots: [
      {
        title: "Architettura parent/child",
        src: "/snapshots/composition-flow.svg",
        caption: "Il parent coordina stato e azioni, i child renderizzano.",
      },
    ],
  },
  6: {
    intro: "Gli effetti sono il ponte verso il mondo esterno: vanno usati con disciplina per evitare inconsistenza e leak.",
    context: [
      "Scenario salvataggio automatico locale.",
      "Scenario fetch con interruzione quando l'utente cambia pagina.",
    ],
    sections: [
      {
        title: "Dipendenze corrette",
        paragraphs: [
          "Un effect deve dichiarare tutte le dipendenze reali. Nascondere dipendenze crea bug intermittenti.",
        ],
        bullets: ["Effect piccolo e focalizzato", "Cleanup sempre presente quando serve"],
      },
      {
        title: "Persistenza e fetch robusti",
        paragraphs: [
          "Serializza e deserializza con fallback sicuri.",
          "Gestisci sempre loading, success e errore come stati espliciti.",
        ],
        bullets: ["AbortController", "try/catch", "fallback UX"],
      },
    ],
    commonMistakes: ["Effect gigante", "cleanup mancante", "JSON parse non protetto"],
    checklist: ["Dipendenze complete", "Abort sul fetch", "Persistenza con fallback"],
    snapshots: [
      {
        title: "Lifecycle effect",
        src: "/snapshots/effect-lifecycle.svg",
        caption: "Montaggio, aggiornamento e cleanup in sequenza.",
      },
    ],
  },
  7: {
    intro: "Next.js moderno richiede una scelta esplicita del confine Server/Client per ottimizzare performance e DX.",
    context: [
      "Scenario portale contenuti con SEO forte.",
      "Scenario app con aree con stato locale ma rendering server dominante.",
    ],
    sections: [
      {
        title: "App Router come architettura",
        paragraphs: [
          "Pensa a `app/` come gerarchia di layout e segmenti, non come elenco di pagine isolate.",
        ],
        bullets: ["layout annidati", "loading/error per segmento", "metadata centralizzati"],
      },
      {
        title: "Server-first",
        paragraphs: [
          "Mantieni lato server tutto cio che non richiede stato o eventi lato browser.",
        ],
        bullets: ["Riduci JS al client", "Migliora TTFB e hydration cost"],
      },
    ],
    commonMistakes: ["Use client ovunque", "Metadata assenti", "Confusione tra route handlers e componenti"],
    checklist: ["Confine client minimo", "File speciali presenti", "Metadata coerenti"],
    snapshots: [
      {
        title: "Mappa App Router",
        src: "/snapshots/next-app-router.svg",
        caption: "Schema di layout, page e segmenti dinamici.",
      },
    ],
  },
  8: {
    intro: "Il routing dinamico non e solo sintassi: e progettazione del ciclo dati, caching e fallback UX.",
    context: [
      "Scenario blog con slug variabili.",
      "Scenario catalogo prodotti con cache revalidata periodicamente.",
    ],
    sections: [
      {
        title: "Parametri dinamici robusti",
        paragraphs: [
          "Convalida sempre i parametri prima di usarli nel fetch.",
        ],
        bullets: ["notFound per entita assenti", "error boundary per eccezioni"],
      },
      {
        title: "Caching consapevole",
        paragraphs: [
          "Scegli tra no-store, default cache o revalidate in base alla volatilita dei dati.",
        ],
        bullets: ["Dati statici: cache", "Dati periodici: revalidate", "Dati critici realtime: no-store"],
      },
    ],
    commonMistakes: ["Slug non validato", "Strategia cache casuale", "Nessun loading stato"],
    checklist: ["Parametri validati", "notFound implementato", "Cache documentata"],
    snapshots: [
      {
        title: "Pipeline route dinamica",
        src: "/snapshots/dynamic-route-flow.svg",
        caption: "Dalla URL al fetch fino al fallback not-found.",
      },
    ],
  },
  9: {
    intro: "Le API non sono solo endpoint: sono contratti di validazione, semantica HTTP e gestione errori per il frontend.",
    context: [
      "Scenario form contatti con vincoli di input.",
      "Scenario dashboard admin con update parziale risorsa.",
    ],
    sections: [
      {
        title: "Contratto input/output",
        paragraphs: [
          "Con Zod definisci regole formali e messaggi consistenti.",
          "Gli status code devono raccontare lo stato reale della richiesta.",
        ],
        bullets: ["201 creazione", "422 validazione", "404 risorsa assente"],
      },
      {
        title: "Feedback utente",
        paragraphs: [
          "Errore globale + errori campo-specifici riducono attrito nel submit.",
        ],
        bullets: ["Pending state", "Retry chiaro", "Messaggi comprensibili"],
      },
    ],
    commonMistakes: ["Validazione solo client", "Response non uniformi", "Gestione errore incompleta"],
    checklist: ["Schema Zod completo", "Status code corretti", "Mappatura errori campo"],
    snapshots: [
      {
        title: "Flusso richiesta API",
        src: "/snapshots/api-contract.svg",
        caption: "Request -> validate -> response con stati codificati.",
      },
    ],
  },
  10: {
    intro: "SSG, SSR e ISR sono decisioni di prodotto e infrastruttura: non solo opzioni tecniche.",
    context: [
      "Scenario landing statica ad alto traffico.",
      "Scenario dashboard personalizzata con dati sensibili e freschi.",
    ],
    sections: [
      {
        title: "Scegliere la strategia",
        paragraphs: [
          "SSG massimizza velocita e scalabilita su contenuti stabili.",
          "SSR privilegia freschezza e personalizzazione per richiesta.",
          "ISR bilancia costo e aggiornamento periodico.",
        ],
        bullets: ["Valuta frequenza update", "Valuta personalizzazione", "Valuta costo compute"],
      },
      {
        title: "Revalidation",
        paragraphs: [
          "Con tag/path puoi aggiornare solo le parti cambiate evitando rebuild globali.",
        ],
        bullets: ["revalidateTag", "revalidatePath", "webhook CMS"],
      },
    ],
    commonMistakes: ["SSR usato ovunque", "ISR senza invalidazione", "Metriche non misurate"],
    checklist: ["Strategia esplicitata per pagina", "Caching testato", "Performance misurate"],
    snapshots: [
      {
        title: "Decision tree rendering",
        src: "/snapshots/rendering-decision.svg",
        caption: "Schema decisionale SSG vs SSR vs ISR.",
      },
    ],
  },
  11: {
    intro: "Deploy e ottimizzazione finale trasformano il codice in prodotto affidabile, monitorato e migliorabile nel tempo.",
    context: [
      "Scenario release continua con preview su PR.",
      "Scenario incidente post-deploy con rollback rapido.",
    ],
    sections: [
      {
        title: "Pipeline professionale",
        paragraphs: [
          "Ogni pull request deve generare un ambiente preview verificabile.",
          "La promozione in produzione deve passare da check automatici e review umana.",
        ],
        bullets: ["Build + typecheck", "Smoke test", "Rollback pronto"],
      },
      {
        title: "Performance e osservabilita",
        paragraphs: [
          "Misura prima di ottimizzare: web vitals, error rate e tempi server.",
        ],
        bullets: ["Lighthouse", "Bundle analysis", "Error logging"],
      },
    ],
    commonMistakes: ["Env sensibili esposte", "Nessun monitoraggio", "Deploy manuali non tracciati"],
    checklist: ["Preview attiva per ogni PR", "Env separate preview/prod", "Piano rollback testato"],
    snapshots: [
      {
        title: "Pipeline deploy",
        src: "/snapshots/deploy-pipeline.svg",
        caption: "Da commit a produzione con gate di qualita.",
      },
    ],
  },
};
