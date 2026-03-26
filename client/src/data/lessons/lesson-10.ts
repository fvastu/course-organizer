import type { CourseLesson } from "../lessons";

export const lesson10: CourseLesson = {
  id: 10,
  lessonNumber: 10,
  title: "Strategie di Rendering",
  module: "Modulo Next.js",
  isCompleted: false,

  objectives: `• Capire i tradeoff reali tra pagina statica, dinamica e contenuto revalidato in Next.js 16
• Scegliere una strategia di rendering in base a dominio, freschezza dati, costo e UX
• Collegare rendering, caching e invalidazione in un unico mental model
• Conoscere sia il modello storico SSG/SSR/ISR sia la narrativa moderna di Cache Components e PPR in Next.js 16`,

  topics: `1. Il problema vero non e "qual e la tecnica migliore?"
La domanda corretta e: che tipo di contenuto sto mostrando?
- stabile e pubblico
- aggiornato periodicamente
- personalizzato per utente
- mutato subito dopo un'azione
La strategia di rendering nasce da qui, non dal nome piu alla moda.

2. Lessico classico ancora utile: SSG, SSR, ISR
Anche se le docs di Next.js 16 parlano in modo sempre piu forte di caching esplicita e Cache Components, il linguaggio SSG/SSR/ISR resta molto utile come modello mentale operativo.
- SSG: HTML statico generato in anticipo
- SSR: rendering a richiesta con dati freschi
- ISR: statico con rigenerazione temporale o on-demand

3. SSG per contenuti stabili
Landing page, policy, documentazione e pagine marketing spesso beneficiano di contenuto prerenderizzato e altamente cacheabile.
👉 Vedi snippet 1.
Vantaggi: TTFB basso, costi ridotti, deployment prevedibile.
Limiti: contenuto meno fresco se cambia spesso.

4. SSR o dinamico per contenuti personalizzati
Dashboard utente, pannelli admin, prezzi personalizzati o dati dipendenti da cookie/sessione richiedono spesso rendering a richiesta.
👉 Vedi snippet 2.
Vantaggi: dati freschi e personalizzazione.
Contro: maggior costo compute e piu sensibilita a latenza backend.

5. ISR e revalidate per la via di mezzo
Per blog, listing editoriali, cataloghi aggiornati spesso ma non al secondo, la revalidation periodica e un ottimo compromesso.
👉 Vedi snippet 3.
In pratica: la pagina resta veloce ma non richiede rebuild completo per ogni piccolo cambio.

6. Revalidation on-demand
Se un CMS o un pannello admin modifica dati, puoi invalidare per path o per tag.
👉 Vedi snippet 4.
Questo rende l'app piu precisa di una semplice finestra temporale fissa.

7. Next.js 16 e Cache Components
La release ufficiale introduce e spinge il modello di Cache Components con \`cacheComponents: true\` e la direttiva \`"use cache"\`.
Questo sposta la conversazione da "tutta la pagina statica o dinamica?" a "quali parti stanno nella shell statica e quali fluiscono a request time?".
👉 Vedi snippet 5.
E la prosecuzione moderna del discorso su Partial Prerendering.

8. Static shell + parti dinamiche
Con Suspense e caching esplicita puoi avere una shell molto veloce e sezioni che streammano dopo.
Questo e particolarmente potente su pagine miste:
- hero e contenuto editoriale statico
- preferenze utente o widget personalizzati dinamici

9. Decision framework pratico
Chiediti:
- il contenuto cambia ogni request?
- e uguale per tutti o personalizzato?
- quanto costa rigenerarlo?
- quanto pesa servire un dato stale per 30, 60 o 300 secondi?
Una buona decisione di rendering e quasi sempre una decisione di prodotto, non solo tecnica.

10. Caso studio e-commerce
- homepage marketing: statica o molto cacheata
- category page: revalidate o tag-based invalidation
- product detail: cache con invalidazione su update inventario/contenuto
- cart e account: dinamici
Questo mix e molto piu realistico del "faccio tutto SSR" o "faccio tutto static".`,

  commands: `export const revalidate = 300 - revalidate time-based della route
export const dynamic = "force-dynamic" - forza rendering dinamico a richiesta
fetch(url, { cache: "force-cache" }) - fetch da cache server-side
fetch(url, { cache: "no-store" }) - dati sempre freschi
revalidatePath("/blog") - invalida una route specifica
revalidateTag("posts") - invalida dati associati a un tag
cacheComponents: true - abilita il modello Cache Components in next.config.ts`,

  reflectionQuestions: `Quale danno sarebbe peggiore nel tuo progetto: servire contenuto leggermente vecchio o rendere ogni richiesta piu lenta e costosa?
Quando una pagina apparentemente statica contiene in realta una piccola parte che dovrebbe restare dinamica?
In che casi useresti revalidation temporale e in che casi invalidazione on-demand?
Perche il linguaggio SSG/SSR/ISR resta utile anche se Next.js 16 introduce un modello di caching piu esplicito?
Quali pagine del tuo prodotto richiedono veramente personalizzazione request-by-request?`,

  homework: `Esercizio 1: Crea tre pagine con strategie differenti:
- landing page molto cacheata
- blog listing con \`revalidate = 60\`
- dashboard personale con rendering dinamico

Esercizio 2: Per ciascuna pagina scrivi in un commento:
- perche hai scelto quella strategia
- cosa rischieresti scegliendone un'altra

Esercizio 3: Implementa una mutazione admin o webhook che richiama \`revalidateTag("posts")\` o \`revalidatePath("/blog")\`.

Esercizio 4: In un progetto di test, abilita \`cacheComponents: true\` e prova a separare shell statica e blocco dinamico con Suspense.

Bonus 1: misura differenze percepite tra pagine con shell statica e pagine completamente dinamiche.
Bonus 2: crea una tabella decisionale personale per route -> strategia.
Bonus 3: documenta quando useresti \`force-dynamic\` e quando invece \`revalidate\`.`,

  resources: `https://nextjs.org/blog/next-16
https://nextjs.org/docs/app/getting-started/caching
https://nextjs.org/docs/app/api-reference/functions/fetch
https://nextjs.org/docs/app/api-reference/functions/revalidateTag`,

  bestPractices: `Decidi in base al valore del dato
Strategia di rendering e strategia di business devono stare insieme: freschezza, costo e UX vanno bilanciati caso per caso.
---
Evita soluzioni assolute
Fare tutto statico o tutto dinamico e quasi sempre un compromesso pigro. Le app reali sono miste.
---
Usa revalidation mirata quando i dati cambiano a eventi
Per CMS, blog e cataloghi, tag e path invalidation rendono il sistema piu preciso e meno costoso.
---
Mantieni un mental model coerente
SSG/SSR/ISR restano utili per orientarti, ma in Next.js 16 devi anche capire shell statica, Suspense e caching esplicita.
---
Documenta la scelta nel codice
Un \`revalidate = 300\` senza contesto futuro e facile da rompere o cambiare male.
---
Pensa in termini di shell e contenuto
Molte pagine possono essere veloci se la shell e statica, anche quando una parte dei dati resta dinamica.`,

  workflow: `1. Classifica ogni route per freschezza, personalizzazione e costo.
2. Scegli la strategia base: cacheata, dinamica o revalidata.
3. Valuta se la pagina puo essere spezzata in shell statica + blocchi dinamici.
4. Aggiungi invalidazione on-demand se il dato cambia su eventi noti.
5. Testa il comportamento percepito oltre a quello tecnico.
6. Documenta la decisione nel file o nel README del progetto.
7. Rivedi la strategia quando cambia il dominio, non solo quando compare una nuova API.`,

  snippets: `1. Pagina molto cacheata
tsx
export default async function MarketingPage() {
  const data = await fetch("https://api.example.com/landing", {
    cache: "force-cache",
  }).then((response) => response.json());

  return <Landing data={data} />;
}
---
2. Pagina dinamica
tsx
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const me = await getCurrentUser();
  return <Dashboard user={me} />;
}
---
3. Revalidate time-based
tsx
export const revalidate = 300;

export default async function BlogIndexPage() {
  const posts = await getPosts();
  return <BlogIndex posts={posts} />;
}
---
4. Revalidation on-demand
tsx
import { revalidateTag } from "next/cache";

export async function POST() {
  revalidateTag("posts");
  return Response.json({ ok: true });
}
---
5. Cache Components in next.config.ts
ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
};

export default nextConfig;
---
6. use cache per dato riusabile
tsx
export async function getCatalogData() {
  "use cache";

  const response = await fetch("https://api.example.com/catalog");
  return response.json();
}`,
};

export default lesson10;
