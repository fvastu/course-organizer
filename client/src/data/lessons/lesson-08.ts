import type { CourseLesson } from "../lessons";

export const lesson08: CourseLesson = {
  id: 8,
  lessonNumber: 8,
  title: "Routing Dinamico e Data Fetching",
  module: "Modulo Next.js",
  isCompleted: false,

  objectives: `• Costruire route dinamiche robuste con segmenti come \`[slug]\` e \`[id]\`
• Recuperare dati nei Server Components usando le API di fetch e caching di Next.js 16
• Scegliere tra cache default, \`force-cache\`, \`no-store\` e \`next.revalidate\` con criterio
• Gestire \`loading.tsx\`, \`error.tsx\` e \`not-found.tsx\` per una UX professionale
• Comprendere memoization server-side, cache tags e i principali tradeoff del data fetching moderno`,

  topics: `1. Segmenti dinamici: \`[slug]\` e \`[id]\`
Con App Router le route dinamiche nascono dal file system. Una cartella \`[slug]\` rappresenta un parametro variabile nella URL.
👉 Vedi snippet 1.
Usa \`slug\` per contenuti leggibili lato marketing/blog, \`id\` quando l'identita tecnica conta piu della leggibilita.

2. Params nel modello documentato piu recente
Nella documentazione Next.js aggiornata, i params di una pagina server possono essere tipizzati come Promise e letti con \`await params\`.
Questo dettaglio e utile soprattutto quando confronti snippet ufficiali nuovi con tutorial vecchi.

3. Fetch direttamente nei Server Components
In Next.js puoi usare \`await fetch(...)\` direttamente dentro pagine, layout e altri Server Components.
👉 Vedi snippet 2.
Questo riduce boilerplate e ti permette di lavorare vicino al rendering reale della pagina.

4. Caching di fetch in Next.js 16
La documentazione ufficiale di \`fetch\` distingue chiaramente:
- default \`auto no cache\`
- \`cache: "force-cache"\`
- \`cache: "no-store"\`
- \`next: { revalidate: number }\`
👉 Vedi snippet 3.
Regola pratica:
- contenuto stabile: cache o revalidate lunga
- dashboard o dati utente: \`no-store\`
- contenuto editoriale aggiornato spesso: revalidate controllata

5. Memoization durante il render server
Le fetch GET identiche chiamate piu volte nello stesso passaggio di render vengono memoizzate automaticamente nel tree React server.
Questo significa meno chiamate duplicate se piu componenti richiedono gli stessi dati.
Nota importante dai docs: questa memoization non si applica ai Route Handlers.

6. loading.tsx, streaming e percezione di velocita
\`loading.tsx\` non e un dettaglio cosmetico: e il punto in cui trasformi attesa tecnica in feedback comprensibile.
👉 Vedi snippet 4.
Una pagina puo iniziare a mostrare shell e fallback mentre il contenuto dati arriva.

7. error.tsx come boundary di segmento
Se qualcosa fallisce nel segmento, \`error.tsx\` puo mostrare un fallback chiaro e permettere retry o navigazione alternativa.
Separare errore tecnico e contenuto mancante migliora molto l'esperienza.

8. notFound() e contenuti assenti
Quando una risorsa non esiste, non e un errore generico: spesso e un caso di \`notFound()\`.
👉 Vedi snippet 5.
Questo attiva \`not-found.tsx\` e rende il comportamento semantico e UX molto piu puliti.

9. Cache tags e invalidazione mirata
Le docs moderne mostrano anche \`next.tags\` su fetch per associare tag ai dati e revalidarli su eventi successivi tramite \`revalidateTag\`.
Non serve usarlo ovunque, ma e un pattern fortissimo per CMS, blog e cataloghi.
👉 Vedi snippet 6.

10. Casi reali
- blog pubblico: \`revalidate\` o cache con tag
- product page stabile: \`force-cache\`
- area privata con dati freschi: \`no-store\`
- contenuto inesistente: \`notFound()\`
- fetch lenta: \`loading.tsx\` + Suspense-aware UX`,

  commands: `fetch(url) - fetch server-side con comportamento cache di default di Next.js
fetch(url, { cache: "no-store" }) - dati sempre freschi a ogni richiesta
fetch(url, { next: { revalidate: 120 } }) - revalidate time-based in secondi
fetch(url, { next: { tags: ["posts"] } }) - assegna cache tag per invalidazione on-demand
import { notFound } from "next/navigation" - helper per contenuti mancanti
notFound() - attiva il file not-found.tsx del segmento`,

  reflectionQuestions: `Come distingui un contenuto mancante da un errore tecnico temporaneo?
Quando il default di caching di Next.js e sufficiente e quando conviene esplicitare \`no-store\` o \`revalidate\`?
Perche una pagina veloce dal punto di vista tecnico puo comunque sembrare lenta senza un buon \`loading.tsx\`?
In quali casi i cache tag ti danno un vantaggio reale rispetto a una semplice revalidation temporale?
Quali route del tuo progetto corso dovrebbero essere dinamiche per slug e quali invece per id?`,

  homework: `Esercizio 1: Crea una route \`app/blog/[slug]/page.tsx\` con dati mock e fallback \`notFound()\` se lo slug non esiste.

Esercizio 2: Aggiungi \`loading.tsx\` e \`error.tsx\` al segmento del blog con micro-copy chiara e bottone retry.

Esercizio 3: Integra una fetch reale in un Server Component usando:
- default cache
- \`no-store\`
- \`revalidate: 60\`
Poi annota le differenze di comportamento.

Esercizio 4: Tagga una fetch con \`next.tags\` e prepara il terreno per revalidarla in una lezione successiva.

Bonus 1: crea una pagina \`courses/[id]\` e confrontala con \`courses/[slug]\`.
Bonus 2: aggiungi skeleton visivi in \`loading.tsx\`.
Bonus 3: scrivi un commento finale con la tua decisione di caching per ciascuna route.`,

  resources: `https://nextjs.org/docs/app/api-reference/functions/fetch
https://nextjs.org/docs/app/deep-dive/caching
https://nextjs.org/docs/app/getting-started/caching
https://nextjs.org/docs/app/api-reference/functions/not-found`,

  bestPractices: `Scegli cache in base al dominio, non all'abitudine
Ogni pagina ha un bisogno diverso di freschezza. Evita sia \`no-store\` ovunque sia caching aggressiva senza criterio.
---
Tratta il contenuto mancante come caso di prodotto
\`notFound()\` comunica meglio di un generico errore 500 quando la risorsa non esiste.
---
Progetta loading ed error come parte della route
\`loading.tsx\` e \`error.tsx\` non sono extra: fanno parte della UX del segmento.
---
Preferisci fetch nei Server Components quando puoi
Riduci boilerplate client e sfrutti al meglio il modello App Router.
---
Usa tag solo dove portano valore
Per contenuti mutabili da CMS o backoffice, i cache tag sono ottimi. Per pagine semplici, una revalidate temporale puo bastare.
---
Documenta la tua decisione di caching
Se chi legge il file non capisce perche hai scelto \`no-store\` o \`revalidate\`, la manutenzione diventera piu difficile.`,

  workflow: `1. Parti dal dominio della route: contenuto stabile, editoriale o personalizzato?
2. Definisci il segmento dinamico piu chiaro (\`[slug]\`, \`[id]\`, ecc.).
3. Scrivi la pagina server con fetch diretta.
4. Decidi esplicitamente caching e revalidation.
5. Gestisci i tre stati chiave della UX: loading, errore, contenuto assente.
6. Se i dati devono essere invalidati da eventi futuri, aggiungi tag significativi.
7. Verifica il comportamento in dev e con refresh reale, ricordando che la HMR cache puo influenzare la percezione locale.`,

  snippets: `1. Pagina dinamica con params
tsx
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return <article>{post.title}</article>;
}
---
2. Fetch in un Server Component
tsx
export default async function BlogPage() {
  const response = await fetch("https://api.vercel.app/blog");
  const posts = await response.json();

  return (
    <ul>
      {posts.map((post: { id: string; title: string }) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
---
3. Revalidate time-based
tsx
const posts = await fetch("https://api.example.com/posts", {
  next: { revalidate: 120 },
}).then((response) => response.json());
---
4. loading.tsx minimale
tsx
export default function Loading() {
  return (
    <div>
      <p>Sto caricando il contenuto...</p>
      <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
    </div>
  );
}
---
5. not-found.tsx personalizzato
tsx
export default function NotFound() {
  return (
    <section>
      <h1>Contenuto non trovato</h1>
      <p>Lo slug richiesto non esiste oppure e stato rimosso.</p>
    </section>
  );
}
---
6. Fetch con cache tag
tsx
const posts = await fetch("https://api.example.com/posts", {
  next: { tags: ["posts"] },
}).then((response) => response.json());`,
};

export default lesson08;
