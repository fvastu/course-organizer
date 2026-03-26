import type { CourseLesson } from "../lessons";

export const lesson07: CourseLesson = {
  id: 7,
  lessonNumber: 7,
  title: "Fondamenti di Next.js",
  module: "Modulo Next.js",
  isCompleted: false,

  objectives: `• Comprendere il modello App Router di Next.js 16 e la differenza rispetto a un'app React SPA pura
• Capire perche pagine e layout sono Server Components di default e quando introdurre Client Components
• Organizzare correttamente cartelle, segmenti e file speciali dell'app directory
• Gestire metadata statici e dinamici in modo moderno e coerente
• Avviare un nuovo progetto Next.js 16 con setup aggiornato, Turbopack di default e struttura pulita
• Riconoscere pattern moderni introdotti o chiariti in Next.js 16, come il ruolo di \`proxy.ts\` e il confine client minimale`,

  topics: `1. Cosa aggiunge Next.js a React
React costruisce componenti e UI. Next.js aggiunge routing, rendering server, data fetching integrato, metadata, bundling, ottimizzazioni e struttura applicativa.
In pratica: passi da una SPA generica a un framework full-stack con convenzioni forti.

2. Next.js 16: cosa tenere a mente oggi
Secondo la release ufficiale di Next.js 16, Turbopack e il bundler di default per i nuovi progetti, \`create-next-app\` ha un flusso semplificato e la caching story e diventata piu esplicita.
Inoltre \`proxy.ts\` sostituisce \`middleware.ts\` come naming principale per il confine di rete Node.js.
Questi dettagli contano perche molti tutorial in giro descrivono ancora versioni o pattern precedenti.

3. App Router come mental model
La cartella \`app/\` rappresenta l'albero delle route. Ogni segmento di cartella puo contenere file speciali che definiscono pagina, layout, loading, error o not-found.
👉 Vedi snippet 1.
Pensalo come un file system che descrive la struttura dell'app, non solo l'URL.

4. File speciali fondamentali
- \`page.tsx\`: UI della route
- \`layout.tsx\`: wrapper condiviso e persistente tra navigazioni del segmento
- \`loading.tsx\`: fallback visuale durante rendering/streaming
- \`error.tsx\`: boundary di errore per il segmento
- \`not-found.tsx\`: UI per contenuti mancanti
Questa convenzione riduce boilerplate e rende il routing molto leggibile.

5. Server Components di default
In Next.js 16 pagine e layout sono Server Components di default. Questo significa che possono:
- leggere segreti lato server
- fetchare dati vicino alla sorgente
- ridurre il JavaScript spedito al browser
👉 Vedi snippet 2.
Client Components servono solo quando ti servono stato, event handler, hook client o API browser.

6. Il vero significato di 'use client'
\`"use client"\` non e un flag generico per "questo file usa React". E il confine tra module graph server e client.
Una volta marcato il file, anche i suoi import e child finiscono nel bundle client.
👉 Vedi snippet 3.
Per questo conviene spingere il confine il piu in basso possibile.

7. Layout annidati e route groups
Con App Router puoi avere layout diversi per sezioni diverse dell'app e usare route groups per organizzare il codice senza cambiare l'URL.
Esempio:
- \`app/(marketing)/page.tsx\`
- \`app/(dashboard)/dashboard/page.tsx\`
Ottimo per separare marketing site e area autenticata.

8. Metadata moderni
Next.js gestisce SEO e social preview con l'export \`metadata\` e \`generateMetadata\`, supportati solo nei Server Components.
👉 Vedi snippet 4.
Questo evita \`react-helmet\` o soluzioni client-only meno robuste.

9. Params e pagine dinamiche nel modello moderno
Nella documentazione aggiornata i params in App Router possono arrivare come Promise nei componenti server tipizzati. E un dettaglio da conoscere quando leggi snippet recenti ufficiali.
Non serve memorizzarlo in modo dogmatico, ma e utile per non confondersi con esempi piu vecchi.

10. Caso studio consigliato
Per fissare il mental model, immagina un sito corsi con:
- home marketing
- pagina corso
- dashboard utente
- navbar interattiva
La maggior parte della UI puo restare server-rendered; solo ricerca, menu e preferenze richiedono spesso client state.`,

  commands: `npx create-next-app@latest - crea un nuovo progetto Next.js 16 con setup aggiornato
npx @next/codemod@canary upgrade latest - aggiorna un progetto esistente alla versione piu recente
npm run dev - avvia il server di sviluppo
next dev --webpack - fallback a webpack se il progetto dipende ancora da setup custom
export const metadata = { title: "Corso Premium" } - metadata statici di route
"use client" - dichiara il confine client per componenti interattivi`,

  reflectionQuestions: `Perche un layout o una pagina dovrebbero restare Server Components finche non emerge un bisogno reale di client interactivity?
Quali problemi possono nascere se aggiungi \`"use client"\` troppo in alto nella gerarchia?
In che modo App Router cambia il tuo modo di pensare la struttura del progetto rispetto a React Router?
Quali parti della tua app corso potrebbero essere server-rendered e quali invece richiederebbero davvero il browser?
Perche i metadata gestiti sul server sono piu robusti di una soluzione client-only per SEO?`,

  homework: `Esercizio 1: Crea una nuova app Next.js 16 con:
- home page
- pagina \`/chi-siamo\`
- pagina \`/contatti\`
- layout condiviso con header e footer

Esercizio 2: Aggiungi una navbar con un piccolo componente client per aprire/chiudere il menu mobile, mantenendo tutto il resto del layout lato server.

Esercizio 3: Crea una route group per separare:
- area marketing
- area dashboard

Esercizio 4: Implementa metadata statici sulla home e metadata dinamici su una pagina \`app/corsi/[slug]/page.tsx\`.

Bonus 1: aggiungi un file \`loading.tsx\` e uno \`not-found.tsx\`.
Bonus 2: prova il codemod di upgrade in un progetto di test e annota cosa ha cambiato.
Bonus 3: documenta in un README quali file speciali hai usato e perche.`,

  resources: `https://nextjs.org/blog/next-16
https://nextjs.org/docs/app
https://nextjs.org/docs/app/getting-started/server-and-client-components
https://nextjs.org/docs/app/getting-started/metadata-and-og-images`,

  bestPractices: `Server first come default
In Next.js 16 il punto di partenza naturale e il server. Sposta sul client solo i componenti che richiedono davvero interattivita o API browser.
---
Usa il file system come architettura
Nomina e organizza bene segmenti, layout e route groups: la leggibilita del progetto migliora subito.
---
Tieni il confine client piccolo
Un singolo componente interattivo puo stare dentro un layout server-rendered senza trascinare tutta la pagina nel bundle client.
---
Allinea il materiale alle versioni recenti
Molti tutorial online usano ancora pattern pre-16. Controlla sempre release notes e docs ufficiali prima di adottare convenzioni.
---
Gestisci metadata dove vive il dato
\`metadata\` e \`generateMetadata\` stanno bene nei Server Components: SEO e social preview restano consistenti e centralizzati.
---
Non confondere convenzione con rigidita
Next.js ha convenzioni forti, ma puoi comunque comporre segmenti e layout in modo elegante se il mental model e chiaro.`,

  workflow: `1. Parti da \`create-next-app\` e osserva la struttura iniziale generata.
2. Mappa le route che vuoi creare prima di scrivere componenti complessi.
3. Mantieni pagine e layout server-rendered finche non compare un bisogno concreto di stato o eventi client.
4. Isola i componenti interattivi con \`"use client"\` il piu in basso possibile.
5. Aggiungi metadata e file speciali del segmento man mano che la route prende forma.
6. Verifica se stai leggendo guide aggiornate a Next.js 16 prima di copiare snippet esterni.
7. Chiudi sempre con un controllo su bundle, struttura e chiarezza dei segmenti.`,

  snippets: `1. Struttura minima App Router
tsx
app/
  layout.tsx
  page.tsx
  chi-siamo/
    page.tsx
  contatti/
    page.tsx
  corsi/
    [slug]/
      page.tsx
      loading.tsx
      not-found.tsx
---
2. Pagina server di default
tsx
export default async function Page() {
  const courses = await getCourses();

  return (
    <main>
      <h1>Corsi disponibili</h1>
      <ul>{courses.map((course) => <li key={course.id}>{course.title}</li>)}</ul>
    </main>
  );
}
---
3. Confine client minimale
tsx
"use client";

import { useState } from "react";

export function MobileMenuToggle() {
  const [open, setOpen] = useState(false);

  return <button onClick={() => setOpen((v) => !v)}>{open ? "Chiudi" : "Menu"}</button>;
}
---
4. Metadata statici
tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corso React e Next.js",
  description: "Percorso pratico con App Router e best practice moderne",
};
---
5. Metadata dinamici con params
tsx
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: "Corso " + slug,
    description: "Dettagli del corso " + slug,
  };
}
---
6. proxy.ts nel naming moderno
ts
import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/old-home") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}`,
};

export default lesson07;
