import type { LessonDemo } from "@/components/LessonDemoFrame";

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
  demo: LessonDemo;
};

export const LESSON_ACADEMY: Record<number, LessonAcademyContent> = {
  1: {
    intro:
      "In questa lezione impari Git come sistema di controllo della conoscenza tecnica: ogni commit racconta una decisione, non solo una modifica.",
    context: [
      "Scenario universitario: lavori in team su un progetto semestrale e dovete evitare sovrascritture e perdita di lavoro.",
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
    ],
    commonMistakes: [
      "Commit monolitici con file non correlati",
      "Messaggi vaghi tipo 'fix' o 'update'",
      "Conflitti risolti senza test finale locale",
    ],
    checklist: [
      "Ho sincronizzato il branch con main",
      "Ogni commit ha una responsabilita chiara",
      "La PR include descrizione, contesto e test",
    ],
    snapshots: [
      {
        title: "Mappa branch Git",
        src: "/snapshots/git-graph.svg",
        caption: "Visuale sintetica di main, feature e merge commit.",
      },
    ],
    demo: {
      title: "Simulatore semplificato di commit e merge",
      description: "Premi i pulsanti per vedere come cresce la storia del repository.",
      html: '<h4>Repository Demo</h4><div style="display:flex;gap:8px;margin:8px 0"><button id="commitBtn">Nuovo Commit</button><button id="branchBtn">Nuovo Branch</button><button id="mergeBtn">Merge</button></div><div id="graph"></div>',
      css: '#graph{font-family:monospace;font-size:13px;line-height:1.5} button{padding:6px 10px;border-radius:8px;border:1px solid #d6a84f;background:#231a10;color:#f3e7c8;cursor:pointer}',
      js: 'let commit=1;let branch=0;const graph=document.getElementById("graph");function render(){graph.textContent=`main: c1..c${commit} | feature branches: ${branch}`;}document.getElementById("commitBtn").onclick=()=>{commit++;render();};document.getElementById("branchBtn").onclick=()=>{branch++;render();};document.getElementById("mergeBtn").onclick=()=>{if(branch>0){branch--;commit++;console.log("Merge eseguito in main");render();}else{console.log("Nessun branch da mergiare");}};render();',
      instructions: [
        "Aggiungi commit e osserva la cronologia.",
        "Crea branch e poi integra con merge.",
        "Leggi l'output per capire l'effetto delle azioni.",
      ],
    },
  },
  2: {
    intro:
      "React va studiato come modello di composizione: la UI e una funzione dello stato e delle proprieta in ingresso.",
    context: [
      "Scenario didattico: trasformare una pagina statica in componenti riusabili.",
      "Scenario reale: ridurre duplicazione quando il design system cresce.",
    ],
    sections: [
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
      "Componenti troppo grandi e poco testabili",
      "Props non tipizzate in TypeScript",
      "Mescolare dati hardcoded in piu punti",
    ],
    checklist: [
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
    demo: {
      title: "Render dinamico da configurazione",
      description: "Modifica il titolo e osserva come la UI si aggiorna in modo dichiarativo.",
      html: '<label>Titolo: <input id="titleInput" value="Corso React" /></label><h2 id="title"></h2>',
      css: 'input{margin-left:8px;padding:6px 8px;border-radius:8px;border:1px solid #a6823b;background:#151311;color:#f4e8c9} h2{margin-top:12px}',
      js: 'const input=document.getElementById("titleInput");const title=document.getElementById("title");function render(){title.textContent=`Hero: ${input.value}`;}input.addEventListener("input",render);render();',
      instructions: [
        "Scrivi un nuovo titolo.",
        "Osserva l'aggiornamento immediato.",
        "Collega il comportamento al concetto di UI dichiarativa.",
      ],
    },
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
    demo: {
      title: "Validazione live email",
      description: "Prova indirizzi validi/non validi e osserva il feedback.",
      html: '<input id="email" placeholder="nome@dominio.com" /><p id="msg"></p>',
      css: 'input{width:100%;max-width:320px;padding:8px;border-radius:8px;border:1px solid #a6823b;background:#151311;color:#f4e8c9} #msg{margin-top:8px;font-size:13px}',
      js: 'const email=document.getElementById("email");const msg=document.getElementById("msg");const re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;email.addEventListener("input",()=>{if(!email.value){msg.textContent="Inserisci un indirizzo email";return;}msg.textContent=re.test(email.value)?"Formato corretto":"Formato non valido";});',
      instructions: [
        "Scrivi email incomplete e poi complete.",
        "Osserva quando la validazione passa a stato corretto.",
      ],
    },
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
    demo: {
      title: "Filtro lista in tempo reale",
      description: "Digita una lettera e guarda come la lista si adatta.",
      html: '<input id="q" placeholder="Filtra..." /><ul id="list"></ul>',
      css: 'input{padding:7px;border-radius:8px;border:1px solid #a6823b;background:#151311;color:#f4e8c9} ul{margin-top:10px;padding-left:18px}',
      js: 'const data=["React","Redux","Router","Recharts","Radix"];const q=document.getElementById("q");const list=document.getElementById("list");function render(){list.innerHTML="";const f=data.filter(i=>i.toLowerCase().includes(q.value.toLowerCase()));if(f.length===0){list.innerHTML="<li>Nessun risultato</li>";return;}f.forEach(i=>{const li=document.createElement("li");li.textContent=i;list.appendChild(li);});}q.addEventListener("input",render);render();',
      instructions: ["Filtra per prefisso e sottostringa", "Verifica comportamento in empty state"],
    },
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
    demo: {
      title: "Stato condiviso toolbar + lista",
      description: "Un unico stato guida due viste diverse.",
      html: '<select id="status"><option value="all">Tutti</option><option value="todo">Todo</option><option value="done">Done</option></select><p id="count"></p>',
      css: 'select{padding:6px 8px;border-radius:8px;border:1px solid #a6823b;background:#151311;color:#f4e8c9}',
      js: 'const tasks=[{t:"UI",s:"todo"},{t:"API",s:"done"},{t:"Test",s:"todo"}];const status=document.getElementById("status");const count=document.getElementById("count");function render(){const v=status.value;const filtered=v==="all"?tasks:tasks.filter(x=>x.s===v);count.textContent=`Elementi visibili: ${filtered.length}`;}status.addEventListener("change",render);render();',
      instructions: ["Cambia filtro", "Osserva che tutto dipende da un solo stato"],
    },
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
    demo: {
      title: "Autosave locale",
      description: "Scrivi testo e verifica salvataggio/ripristino automatico.",
      html: '<textarea id="note" rows="5" style="width:100%" placeholder="Scrivi appunti..."></textarea><p id="saved"></p>',
      css: 'textarea{padding:8px;border-radius:8px;border:1px solid #a6823b;background:#151311;color:#f4e8c9} #saved{font-size:12px;color:#cdb37a}',
      js: 'const key="demo_note";const note=document.getElementById("note");const saved=document.getElementById("saved");note.value=localStorage.getItem(key)||"";note.addEventListener("input",()=>{localStorage.setItem(key,note.value);saved.textContent="Salvato in localStorage";});',
      instructions: ["Ricarica il frame con Esegui", "Verifica che il testo venga ripristinato"],
    },
  },
  7: {
    intro: "Next.js moderno richiede una scelta esplicita del confine Server/Client per ottimizzare performance e DX.",
    context: [
      "Scenario portale contenuti con SEO forte.",
      "Scenario app con aree interattive ma rendering server dominante.",
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
          "Mantieni lato server tutto cio che non richiede interazione diretta utente.",
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
    demo: {
      title: "Simulatore Server vs Client boundary",
      description: "Attiva/disattiva blocchi client-only e osserva il carico JS simulato.",
      html: '<label><input type="checkbox" id="c1" checked/> Navbar client</label><br/><label><input type="checkbox" id="c2"/> Hero client</label><br/><label><input type="checkbox" id="c3"/> Sidebar client</label><p id="score"></p>',
      css: 'label{display:block;margin-bottom:4px} #score{margin-top:8px;font-weight:600}',
      js: 'const checks=["c1","c2","c3"].map(id=>document.getElementById(id));const score=document.getElementById("score");function render(){const active=checks.filter(c=>c.checked).length;score.textContent=`Componenti client: ${active} | costo JS stimato: ${active*25}kb`; }checks.forEach(c=>c.addEventListener("change",render));render();',
      instructions: ["Riduci i componenti client", "Mantieni client solo dove serve interazione"],
    },
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
    demo: {
      title: "Resolver slug",
      description: "Prova slug validi/non validi e osserva il fallback.",
      html: '<input id="slug" value="react"/><button id="go">Risolvi</button><p id="res"></p>',
      css: 'input,button{padding:6px 8px;margin-right:6px;border-radius:8px;border:1px solid #a6823b;background:#151311;color:#f4e8c9}',
      js: 'const posts=["react","nextjs","typescript"];const slug=document.getElementById("slug");const res=document.getElementById("res");document.getElementById("go").onclick=()=>{res.textContent=posts.includes(slug.value)?`Post trovato: ${slug.value}`:"notFound()";};',
      instructions: ["Inserisci slug inesistenti", "Confronta esito trovato vs notFound"],
    },
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
    demo: {
      title: "Validatore payload",
      description: "Simula una POST e verifica se il payload e valido.",
      html: '<input id="email" placeholder="email"/><input id="msg" placeholder="messaggio"/><button id="send">Valida</button><p id="out"></p>',
      css: 'input,button{display:block;margin:6px 0;padding:6px 8px;border-radius:8px;border:1px solid #a6823b;background:#151311;color:#f4e8c9}',
      js: 'const out=document.getElementById("out");document.getElementById("send").onclick=()=>{const email=document.getElementById("email").value;const msg=document.getElementById("msg").value;const ok=email.includes("@")&&msg.length>=10;out.textContent=ok?"201 Created":"422 Validation Error";};',
      instructions: ["Inserisci messaggi troppo brevi", "Osserva la differenza 201 vs 422"],
    },
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
    demo: {
      title: "Scelta strategia rendering",
      description: "Imposta frequenza aggiornamento e personalizzazione per ottenere una raccomandazione.",
      html: '<label>Aggiornamento dati: <select id="freq"><option value="rare">Raro</option><option value="medium">Medio</option><option value="high">Alto</option></select></label><label>Personalizzazione: <select id="personal"><option value="no">No</option><option value="yes">Si</option></select></label><p id="ans"></p>',
      css: 'label{display:block;margin:6px 0} select{margin-left:8px;padding:6px;border-radius:8px;border:1px solid #a6823b;background:#151311;color:#f4e8c9}',
      js: 'const freq=document.getElementById("freq");const personal=document.getElementById("personal");const ans=document.getElementById("ans");function evalMode(){if(personal.value==="yes") ans.textContent="Suggerito: SSR";else if(freq.value==="high") ans.textContent="Suggerito: ISR";else ans.textContent="Suggerito: SSG";}freq.onchange=evalMode;personal.onchange=evalMode;evalMode();',
      instructions: ["Prova tutte le combinazioni", "Collega il risultato al caso prodotto"],
    },
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
    demo: {
      title: "Checklist pre-deploy",
      description: "Spunta i controlli e verifica quando il rilascio e consentito.",
      html: '<label><input type="checkbox" class="c"/> Typecheck</label><label><input type="checkbox" class="c"/> Build</label><label><input type="checkbox" class="c"/> Preview QA</label><label><input type="checkbox" class="c"/> Env validate</label><p id="go"></p>',
      css: 'label{display:block;margin:4px 0} #go{margin-top:8px;font-weight:700}',
      js: 'const checks=[...document.querySelectorAll(".c")];const go=document.getElementById("go");function render(){const ok=checks.every(c=>c.checked);go.textContent=ok?"Deploy consentito":"Deploy bloccato: checklist incompleta";}checks.forEach(c=>c.addEventListener("change",render));render();',
      instructions: ["Completa i controlli uno alla volta", "Osserva la regola di gate prima del deploy"],
    },
  },
};
