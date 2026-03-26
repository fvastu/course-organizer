import type { CourseLesson } from "../lessons";

export const lesson11: CourseLesson = {
  id: 11,
  lessonNumber: 11,
  title: "Deployment e Ottimizzazione Finale",
  module: "Modulo Next.js",
  isCompleted: false,

  objectives: `• Portare un'app Next.js 16 in deploy con un processo ripetibile e leggibile
• Gestire ambienti, variabili e segreti senza esporre informazioni sensibili al client
• Verificare performance reali tramite build output, bundle analysis e metriche utente
• Chiudere il corso con una checklist professionale di release, monitoraggio e rollback`,

  topics: `1. Dal repository alla produzione
Un deploy serio non e solo "funziona sul mio computer". Serve un flusso:
- branch e pull request
- preview deployment
- review
- merge su main
- production deployment
Questo rende il rilascio osservabile e ripetibile.

2. Preview e produzione
Vercel e il target naturale per molte app Next.js, ma il principio vale ovunque:
- preview per ogni PR
- produzione solo da branch o tag controllati
- rollback rapido se qualcosa va storto
Il valore vero non e la piattaforma, ma la disciplina di rilascio.

3. Variabili ambiente: server-only vs pubbliche
Tutto cio che parte da \`NEXT_PUBLIC_\` finisce nel bundle client.
Quindi:
- API key private, secret e token interni restano server-only
- solo configurazioni realmente pubbliche possono avere prefisso \`NEXT_PUBLIC_\`
👉 Vedi snippet 1.
Questo e uno degli errori piu costosi nei progetti junior.

4. Build output e segnali utili
Next.js 16 migliora anche i log di build, mostrando meglio i tempi dei vari step.
Leggere il build output aiuta a capire:
- cosa compila lentamente
- quante pagine statiche stai generando
- dove investire in ottimizzazione

5. Ottimizzazioni ad alto impatto
- usare \`next/image\` per immagini ottimizzate
- usare \`next/font\` per font stabili e meno layout shift
- mantenere piccolo il confine client
- caricare dinamicamente solo cio che serve
- evitare fetch inutili o duplicate
👉 Vedi snippet 2.

6. Bundle analysis e auditing
Una buona ottimizzazione nasce da misure, non da intuizioni. Analizza:
- bundle size
- componenti client troppo grandi
- librerie duplicate o sproporzionate
- performance Lighthouse e Web Vitals
👉 Vedi snippet 3.

7. Monitoraggio post-release
Dopo il deploy ti servono almeno:
- error logging
- analytics essenziali
- metriche prestazionali
- alerting minimo
Se scopri i bug solo dai messaggi degli utenti, stai monitorando troppo tardi.

8. Rollback, hotfix e triage
Non tutti gli incident richiedono la stessa risposta.
- rollback: se la regressione e ampia e il fix non e immediato
- hotfix: se il problema e isolato, compreso e correggibile in sicurezza
Avere preview, tag o deployment history rende tutto piu semplice.

9. Checklist finale di release
Prima del rilascio chiediti:
- build pulita?
- env corrette?
- pagine principali testate?
- route sensibili protette?
- metriche osservabili?
- piano di rollback pronto?
Questa disciplina vale piu di qualunque micro-ottimizzazione.

10. Chiusura del percorso
Sei partito da Git, sei passato da React e sei arrivato a un'app full-stack moderna con Next.js 16.
L'ultimo salto di maturita non e scrivere piu codice, ma rendere il software distribuibile, misurabile e affidabile.`,

  commands: `vercel - collega il progetto e prepara il deploy
vercel --prod - pubblica in produzione
vercel env pull .env.local - sincronizza variabili ambiente locali
npm run build - verifica la build di produzione in locale
ANALYZE=true npm run build - esegue build con analisi bundle se configurata
next build --webpack - fallback a webpack se il progetto non e ancora pronto per Turbopack in build`,

  reflectionQuestions: `Quali dati del tuo progetto devono restare rigorosamente lato server e quali possono essere pubblici?
Come cambierebbe il tuo processo di rilascio se ogni PR avesse una preview verificabile?
Qual e la differenza tra ottimizzare per impressione e ottimizzare usando metriche reali?
Quando un rollback rapido e piu responsabile di un hotfix immediato?
Quali segnali minimi vorresti vedere entro cinque minuti da un rilascio in produzione?`,

  homework: `Esercizio 1: Esegui un deploy completo dell'app su Vercel con:
- ambiente preview per PR
- ambiente production per merge su main
- verifica manuale delle route principali

Esercizio 2: Crea un file di checklist release con:
- build
- env
- smoke test
- monitoraggio
- rollback

Esercizio 3: Aggiungi almeno 5 ottimizzazioni misurabili, ad esempio:
- immagini con \`next/image\`
- font con \`next/font\`
- confine client ridotto
- rimozione libreria pesante non necessaria
- caricamento dinamico di una feature secondaria

Esercizio 4: Configura una forma minima di monitoraggio errori o analytics e annota dove guarderesti dopo il rilascio.

Bonus 1: documenta le variabili ambiente distinguendo server-only e client-exposed.
Bonus 2: fai un audit Lighthouse prima e dopo le ottimizzazioni.
Bonus 3: scrivi un mini runbook: "se il deploy rompe login, cosa faccio nei primi 10 minuti?"`,

  resources: `https://nextjs.org/blog/next-16
https://nextjs.org/docs/app/getting-started/deploying
https://nextjs.org/docs/app/getting-started/images
https://nextjs.org/docs/app/getting-started/fonts`,

  bestPractices: `Rilascia in modo ripetibile
Preview per ogni PR e produzione controllata riducono ansia, regressioni e tempo perso nei rilasci.
---
Proteggi i segreti
Se una variabile ha prefisso \`NEXT_PUBLIC_\`, assume che il browser possa leggerla. Tutto il resto va tenuto lato server.
---
Misura prima di ottimizzare
Bundle analysis, Lighthouse e Web Vitals battono opinioni e intuizioni.
---
Riduci JavaScript dove conta
Più UI resta server-rendered, meno JS devi spedire, idratare e mantenere.
---
Ottimizza gli asset nativi del framework
\`next/image\` e \`next/font\` esistono per un motivo: sfruttali prima di inseguire ottimizzazioni esotiche.
---
Prepara sempre il giorno dopo il deploy
Log, metriche e rollback non sono optional: fanno parte della definizione di "rilasciato".`,

  workflow: `1. Verifica build e smoke test locali.
2. Controlla le env per preview e production.
3. Pubblica prima una preview e fai validazione sulle route chiave.
4. Analizza bundle, immagini, font e confine client.
5. Rilascia in produzione solo dopo il passaggio precedente.
6. Osserva metriche, log ed errori immediatamente dopo il deploy.
7. Se compare una regressione, scegli consapevolmente tra rollback e hotfix.`,

  snippets: `1. Variabile server-only
ts
const internalApiKey = process.env.INTERNAL_API_KEY;

if (!internalApiKey) {
  throw new Error("INTERNAL_API_KEY mancante");
}
---
2. Immagine ottimizzata
tsx
import Image from "next/image";

export function HeroImage() {
  return (
    <Image
      src="/hero-course.jpg"
      alt="Corso Next.js"
      width={1200}
      height={800}
      priority
    />
  );
}
---
3. Caricamento dinamico di feature secondaria
tsx
import dynamic from "next/dynamic";

const CourseChart = dynamic(() => import("./course-chart"), {
  loading: () => <p>Carico il grafico...</p>,
});
---
4. next/font locale o Google
tsx
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <html className={geist.className}>{children}</html>;
}
---
5. Checklist di release in codice
md
- build eseguita con successo
- env verificate
- homepage, login e dashboard testate
- monitoraggio attivo
- rollback plan noto dal team`,
};

export default lesson11;
