import type { CourseLesson } from "../lessons";

export const lesson09: CourseLesson = {
  id: 9,
  lessonNumber: 9,
  title: "API Routes e Form Submission",
  module: "Modulo Next.js",
  isCompleted: false,

  objectives: `• Creare Route Handlers robusti in App Router per GET, POST e mutazioni comuni
• Validare payload lato server con Zod senza affidarsi alla sola UI
• Distinguere bene tra Route Handlers e Server Actions nel modello moderno di Next.js 16
• Gestire form submission con pending state, errori per campo e flussi chiari di successo/fallimento
• Revalidare dati dopo una mutazione usando gli strumenti corretti del framework`,

  topics: `1. Route Handlers in App Router
In Next.js gli endpoint HTTP vivono tipicamente in file \`route.ts\` dentro \`app/api/.../\`.
👉 Vedi snippet 1.
Puoi esportare funzioni come \`GET\`, \`POST\`, \`PATCH\`, \`DELETE\` e restituire \`Response.json(...)\`.

2. Quando usare Route Handlers
Sono ideali quando:
- vuoi esporre un endpoint HTTP consumabile anche da client esterni
- hai bisogno di integrare webhook o servizi terzi
- vuoi gestire API pubbliche o semi-pubbliche
Ricorda il punto di sicurezza delle docs: vanno trattati come endpoint esposti, con auth e autorizzazione quando necessario.

3. Validazione Zod lato server
La validazione client migliora UX, ma non e una garanzia di sicurezza o integrita. Sul server devi sempre validare di nuovo.
👉 Vedi snippet 2.
Pattern consigliato:
- parse body
- \`safeParse\`
- mappa errori per campo
- rispondi con status coerente, spesso 422 per dati non validi

4. Status code che raccontano il problema
- 200: successo standard
- 201: risorsa creata
- 400: richiesta malformata
- 401/403: problema di autenticazione o permesso
- 404: risorsa non trovata
- 422: payload semanticamente invalido
Questa chiarezza aiuta debugging, frontend e integrazioni.

5. Form submission nel mondo Next.js moderno
Per i form puoi scegliere almeno due strade:
- Server Actions, molto comode quando il form vive dentro l'app stessa
- Route Handlers, utili quando vuoi un endpoint HTTP esplicito
La guida Forms di Next.js oggi spinge molto sulle Server Actions per casi interni all'app.

6. Server Actions vs Route Handlers
Server Action:
- ottima per form della tua app
- integra bene pending state e revalidation
- puo funzionare con progressive enhancement
Route Handler:
- migliore se ti serve un endpoint separato
- piu naturale per webhook, client esterni o API dedicate
👉 Vedi snippet 3.

7. Pending state e feedback UX
Un buon form deve distinguere:
- sto inviando
- invio riuscito
- errore globale
- errori specifici per campo
👉 Vedi snippet 4.
Senza questi stati l'utente percepisce il submit come opaco o rotto.

8. Revalidation dopo mutazione
Dopo aver creato o aggiornato dati, puoi revalidare per path o tag.
Se usi tag, \`revalidateTag\` e pensato per Route Handlers e Server Actions; \`updateTag\` e pensato per Server Actions nei casi read-your-own-writes.
Questa distinzione e moderna e va capita bene per non mischiare esempi vecchi.

9. Sicurezza minima indispensabile
Se un Route Handler o una Server Action modifica dati, tratta sempre quell'operazione come pubblica per default:
- valida input
- verifica autenticazione
- controlla permessi
- non fidarti del client

10. Caso studio
Un form contatti professionale in Next.js 16 dovrebbe:
- validare lato client per UX
- validare lato server con Zod
- restituire errori per campo
- mostrare pending state
- revalidare o aggiornare la UI dopo il successo.`,

  commands: `export async function POST(req: Request) { ... } - crea un Route Handler POST
const body = await req.json() - legge il payload JSON della richiesta
const parsed = schema.safeParse(body) - valida il payload con Zod
return Response.json({ ok: true }, { status: 201 }) - risposta JSON con status code esplicito
"use server" - definisce una Server Action
revalidateTag("contacts") - invalida dati taggati dopo una mutazione`,

  reflectionQuestions: `Quando il tuo form beneficia davvero di una Server Action rispetto a una chiamata fetch verso \`/api\`?
Perche la validazione lato client non puo sostituire quella lato server?
Che differenza pratica c'e tra un errore globale del form e un errore legato a un singolo campo?
In quali casi ha senso esporre un Route Handler come endpoint esplicito invece di tenere tutto dentro l'app?
Quali controlli di sicurezza aggiungeresti prima di permettere una mutazione reale?`,

  homework: `Esercizio 1: Crea \`app/api/contact/route.ts\` con:
- metodo POST
- schema Zod per \`name\`, \`email\`, \`message\`
- risposta 422 con errori flatten se il payload non e valido
- risposta 201 se il payload e corretto

Esercizio 2: Collega un form React o Next.js al Route Handler e implementa:
- pending state
- messaggi di errore per campo
- stato di successo

Esercizio 3: Ricrea lo stesso flusso con una Server Action e confronta le differenze in ergonomia e struttura.

Esercizio 4: Dopo il successo della mutazione, revalida una lista di messaggi usando tag o path.

Bonus 1: aggiungi check di autenticazione finto nel Route Handler.
Bonus 2: mostra un banner globale per errori non di validazione.
Bonus 3: documenta quando useresti Route Handler e quando Server Action nel tuo progetto.`,

  resources: `https://nextjs.org/docs/app/guides/forms
https://nextjs.org/docs/app/getting-started/caching-and-revalidating
https://nextjs.org/docs/app/guides/authentication
https://zod.dev/`,

  bestPractices: `Valida sempre sul server
La UI puo aiutare l'utente, ma il server protegge davvero i dati e il sistema.
---
Scegli lo strumento in base al confine
Se ti serve un endpoint HTTP esplicito, usa Route Handlers. Se il form vive dentro l'app e vuoi meno boilerplate, valuta Server Actions.
---
Rendi gli errori leggibili
Errori per campo, stato pending chiaro e messaggi globali distinti riducono confusione e ticket inutili.
---
Usa status code coerenti
Una risposta ben codificata rende piu semplice il lavoro sia al frontend sia a eventuali integrazioni esterne.
---
Tratta mutazioni e API come superfici sensibili
Auth, permessi, validazione e rate limiting diventano centrali appena l'app esce dal toy project.
---
Revalida con intenzione
Dopo una mutazione, aggiorna solo cio che serve: path o tag scelti in modo significativo.`,

  workflow: `1. Definisci il contratto dei dati in Zod prima di scrivere il form.
2. Decidi se il confine giusto e una Server Action o un Route Handler.
3. Implementa il server con status code e messaggi coerenti.
4. Collega il form e modella pending, successo e fallimento.
5. Mappa errori server -> UI senza perdere informazione di campo.
6. Aggiungi revalidation o refresh dei dati dopo il submit riuscito.
7. Fai un ultimo passaggio di sicurezza: cosa succede se il client manda dati malevoli o incompleti?`,

  snippets: `1. Route Handler POST base
tsx
export async function POST(req: Request) {
  const body = await req.json();
  return Response.json({ received: body }, { status: 201 });
}
---
2. Validazione Zod con 422
tsx
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { errors: parsed.error.flatten() },
      { status: 422 },
    );
  }

  return Response.json({ ok: true }, { status: 201 });
}
---
3. Server Action minimale
tsx
"use server";

import { revalidateTag } from "next/cache";

export async function createMessage(formData: FormData) {
  const message = formData.get("message");
  // salva nel DB
  revalidateTag("messages");
  return { ok: true, message };
}
---
4. Pending state nel form
tsx
"use client";

import { useState } from "react";

export function ContactForm() {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    try {
      await fetch("/api/contact", { method: "POST" });
    } finally {
      setIsPending(false);
    }
  }

  return <form onSubmit={handleSubmit}>{isPending ? "Invio..." : "Invia"}</form>;
}
---
5. Mapping errori per campo
tsx
type FieldErrors = {
  email?: string[];
  message?: string[];
};

const fieldErrors: FieldErrors = data.errors?.fieldErrors ?? {};`,
};

export default lesson09;
