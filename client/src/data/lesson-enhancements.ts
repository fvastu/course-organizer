export type LessonSnippet = {
  title: string;
  language: string;
  code: string;
  note?: string;
};

export type LessonEnhancement = {
  examples: string[];
  situations: string[];
  snippets: LessonSnippet[];
};

export const LESSON_ENHANCEMENTS: Record<number, LessonEnhancement> = {
  1: {
    examples: [
      "Repo team: ogni task vive in `feature/*`, PR piccole e commit leggibili.",
      "Fix urgente: branch `hotfix/*` da `main`, patch rapida e merge controllato.",
      "Release stabile: tag `v1.0.0` su commit validato e deploy automatico da pipeline CI.",
    ],
    situations: [
      "Due dev modificano lo stesso file README nello stesso punto: nasce un conflitto da risolvere consapevolmente.",
      "Un commit include piu cambiamenti scollegati: la review diventa lenta e aumenta il rischio bug.",
      "Deploy fallito su main: serve rollback rapido usando tag precedente (es. `v0.9.4`).",
    ],
    snippets: [
      {
        title: "Flusso branch feature",
        language: "bash",
        code: "git checkout main\ngit pull --rebase origin main\ngit checkout -b feature/login-form\ngit add .\ngit commit -m \"feat(auth): add login form base\"\ngit push -u origin feature/login-form",
      },
      {
        title: "Risoluzione conflitto base",
        language: "bash",
        code: "git pull --rebase origin main\n# risolvi i marker <<<<<<< ======= >>>>>>>\ngit add README.md\ngit rebase --continue",
      },
      {
        title: "Tag di release e publish",
        language: "bash",
        code: "git checkout main\ngit pull --rebase origin main\ngit tag -a v1.0.0 -m \"release 1.0.0\"\ngit push origin v1.0.0\n# opzionale: pubblica tutti i tag locali\ngit push --tags",
      },
      {
        title: "Deploy da tag (esempio CI)",
        language: "bash",
        code: "# trigger pipeline su tag v*\n# in CI:\ngit fetch --tags\ngit checkout tags/v1.0.0\nnpm ci\nnpm run build\n# deploy artefatto buildato dal tag",
      },
    ],
  },
  2: {
    examples: [
      "Componente `Hero` riusato in home e landing con props diverse.",
      "Navbar configurata da un array di link per evitare codice duplicato.",
      "Dashboard con lista utenti: React aggiorna solo le card cambiate invece di ridisegnare tutto il DOM.",
      "Cambio tema (light/dark): stato globale e rerender dei soli componenti coinvolti.",
    ],
    situations: [
      "UI inizialmente in un file unico: difficile da leggere e testare.",
      "Stesso bottone copiato in 5 punti con stili diversi: nasce incoerenza visiva.",
      "Lista prodotti con key sbagliate: animazioni e stato locale dei row diventano instabili.",
      "Pagina con troppa logica nel JSX: manutenzione lenta e bug in crescita.",
    ],
    snippets: [
      {
        title: "Componente con props tipizzate",
        language: "tsx",
        code: "type HeroProps = { title: string; subtitle: string };\n\nexport function Hero({ title, subtitle }: HeroProps) {\n  return (\n    <section>\n      <h1>{title}</h1>\n      <p>{subtitle}</p>\n    </section>\n  );\n}",
      },
      {
        title: "Composizione in App",
        language: "tsx",
        code: "const page = {\n  title: \"Corso React\",\n  subtitle: \"Percorso guidato\",\n};\n\n<Hero title={page.title} subtitle={page.subtitle} />",
      },
      {
        title: "Virtual DOM: update dichiarativo",
        language: "tsx",
        code: "function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Valore: {count}</p>\n      <button onClick={() => setCount((c) => c + 1)}>Incrementa</button>\n    </div>\n  );\n}\n\n// React confronta il nuovo albero virtuale e aggiorna solo i nodi necessari nel DOM reale.",
      },
      {
        title: "Liste con key stabili",
        language: "tsx",
        code: "type User = { id: string; name: string };\n\nfunction UserList({ users }: { users: User[] }) {\n  return (\n    <ul>\n      {users.map((user) => (\n        <li key={user.id}>{user.name}</li>\n      ))}\n    </ul>\n  );\n}",
      },
    ],
  },
  3: {
    examples: [
      "Form login controllato con feedback immediato su email/password.",
      "Contatore con step dinamico e reset per capire update funzionali.",
    ],
    situations: [
      "Validazione solo al submit: utente scopre errori troppo tardi.",
      "Aggiornamento stato con valore vecchio: comportamenti incoerenti.",
    ],
    snippets: [
      {
        title: "Input controllato",
        language: "tsx",
        code: "const [email, setEmail] = useState(\"\");\n\n<input\n  value={email}\n  onChange={(e) => setEmail(e.target.value)}\n  placeholder=\"email@dominio.com\"\n/>",
      },
      {
        title: "Aggiornamento funzionale sicuro",
        language: "tsx",
        code: "const [count, setCount] = useState(0);\n\n<button onClick={() => setCount((prev) => prev + 1)}>\n  Incrementa\n</button>",
      },
    ],
  },
  4: {
    examples: [
      "Lista task con `map` e `key` su `id` backend.",
      "Empty state con CTA 'Aggiungi primo task' quando lista vuota.",
    ],
    situations: [
      "Uso di `index` come key con reorder: React riusa nodi sbagliati.",
      "Filtri applicati mutando lo stato originale: risultato non recuperabile.",
    ],
    snippets: [
      {
        title: "Rendering lista corretto",
        language: "tsx",
        code: "{tasks.map((task) => (\n  <TaskRow key={task.id} task={task} />\n))}",
      },
      {
        title: "Rendering condizionale leggibile",
        language: "tsx",
        code: "{tasks.length === 0 ? (\n  <EmptyState onCreate={openModal} />\n) : (\n  <TaskList tasks={tasks} />\n)}",
      },
    ],
  },
  5: {
    examples: [
      "Ricerca e filtri nel parent, lista e toolbar come child presentazionali.",
      "Layout `Card` con `children` riusato in dashboard e dettagli.",
    ],
    situations: [
      "Filtro duplicato in due componenti: logiche diverse e bug intermittenti.",
      "Child modifica dati globali senza callback esplicita: flusso poco chiaro.",
    ],
    snippets: [
      {
        title: "Lifting state up",
        language: "tsx",
        code: "function Board() {\n  const [query, setQuery] = useState(\"\");\n  return (\n    <>\n      <Toolbar query={query} onQueryChange={setQuery} />\n      <TaskList query={query} />\n    </>\n  );\n}",
      },
      {
        title: "Componente wrapper",
        language: "tsx",
        code: "function Card({ children }: { children: React.ReactNode }) {\n  return <div className=\"rounded-xl border p-4\">{children}</div>;\n}",
      },
    ],
  },
  6: {
    examples: [
      "Persistenza task in localStorage per ripresa al refresh.",
      "Fetch con loading/error/success e cleanup su cambio pagina.",
    ],
    situations: [
      "Dipendenze mancanti in `useEffect`: dati obsoleti in UI.",
      "Fetch non abortita: warning quando componente e gia smontato.",
    ],
    snippets: [
      {
        title: "Persistenza localStorage",
        language: "tsx",
        code: "useEffect(() => {\n  localStorage.setItem(\"tasks\", JSON.stringify(tasks));\n}, [tasks]);",
      },
      {
        title: "Fetch con AbortController",
        language: "tsx",
        code: "useEffect(() => {\n  const controller = new AbortController();\n  fetch(\"/api/tasks\", { signal: controller.signal });\n  return () => controller.abort();\n}, []);",
      },
    ],
  },
  7: {
    examples: [
      "Layout globale in `app/layout.tsx` con nav condivisa.",
      "Pagina prodotto server-rendered e componente carrello client-only.",
    ],
    situations: [
      "Troppi componenti `use client`: bundle JS cresce senza necessita.",
      "Metadata non gestiti: SEO debole e preview social incoerenti.",
    ],
    snippets: [
      {
        title: "Metadata moderni",
        language: "tsx",
        code: "import type { Metadata } from \"next\";\n\nexport const metadata: Metadata = {\n  title: \"Corso Premium\",\n  description: \"React e Next.js in italiano\",\n};",
      },
      {
        title: "Confine client minimale",
        language: "tsx",
        code: "// app/navbar-toggle.tsx\n\"use client\";\n\nexport function NavbarToggle() {\n  return <button>Menu</button>;\n}",
      },
    ],
  },
  8: {
    examples: [
      "Route `blog/[slug]` con fallback `notFound()` quando il contenuto manca.",
      "Revalidate a 120s su pagina news con aggiornamenti frequenti.",
    ],
    situations: [
      "Slug non valido senza gestione dedicata: UX confusa.",
      "Uso indiscriminato di `no-store`: costi server non necessari.",
    ],
    snippets: [
      {
        title: "Pagina dinamica",
        language: "tsx",
        code: "export default async function Page({ params }: { params: { slug: string } }) {\n  const post = await getPost(params.slug);\n  if (!post) notFound();\n  return <article>{post.title}</article>;\n}",
      },
      {
        title: "Fetch con revalidate",
        language: "tsx",
        code: "const data = await fetch(url, {\n  next: { revalidate: 120 },\n}).then((r) => r.json());",
      },
    ],
  },
  9: {
    examples: [
      "Endpoint `/api/contact` con validazione Zod e risposte 422.",
      "Form UI con pending state e messaggi errore per campo.",
    ],
    situations: [
      "Input validato solo lato client: payload malevolo passa al server.",
      "Errori generici senza campo: utente non capisce come correggere.",
    ],
    snippets: [
      {
        title: "Route Handler con Zod",
        language: "tsx",
        code: "const schema = z.object({\n  email: z.string().email(),\n  message: z.string().min(10),\n});\n\nexport async function POST(req: Request) {\n  const body = await req.json();\n  const parsed = schema.safeParse(body);\n  if (!parsed.success) {\n    return Response.json({ errors: parsed.error.flatten() }, { status: 422 });\n  }\n  return Response.json({ ok: true }, { status: 201 });\n}",
      },
      {
        title: "Submit con stato pending",
        language: "tsx",
        code: "const [isPending, setIsPending] = useState(false);\n\nasync function onSubmit() {\n  setIsPending(true);\n  try {\n    await fetch(\"/api/contact\", { method: \"POST\" });\n  } finally {\n    setIsPending(false);\n  }\n}",
      },
    ],
  },
  10: {
    examples: [
      "Landing marketing in SSG per TTFB minimo.",
      "Dashboard utente in SSR per dati sempre freschi.",
    ],
    situations: [
      "Tutto in SSR anche per pagine statiche: spreco di risorse.",
      "ISR senza invalidazione: contenuto vecchio troppo a lungo.",
    ],
    snippets: [
      {
        title: "ISR base",
        language: "tsx",
        code: "export const revalidate = 300;\n\nexport default async function Page() {\n  const products = await getProducts();\n  return <Catalog products={products} />;\n}",
      },
      {
        title: "SSR forzato",
        language: "tsx",
        code: "export const dynamic = \"force-dynamic\";\n\nexport default async function DashboardPage() {\n  const me = await getCurrentUser();\n  return <Dashboard user={me} />;\n}",
      },
    ],
  },
  11: {
    examples: [
      "Deploy preview su ogni PR e produzione solo su merge in main.",
      "Audit Lighthouse post-release con backlog ottimizzazioni misurabili.",
    ],
    situations: [
      "Variabile sensibile esposta con `NEXT_PUBLIC_`: leak lato client.",
      "Rilascio senza monitoraggio: bug in produzione scoperti tardi.",
    ],
    snippets: [
      {
        title: "Env server-only",
        language: "ts",
        code: "const apiKey = process.env.INTERNAL_API_KEY;\nif (!apiKey) throw new Error(\"INTERNAL_API_KEY mancante\");",
      },
      {
        title: "Analisi bundle",
        language: "bash",
        code: "ANALYZE=true npm run build\nvercel --prod",
      },
    ],
  },
};
