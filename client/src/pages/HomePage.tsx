import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Trophy, Layers3, Sparkles, ShieldCheck, CheckCircle2, Gem } from "lucide-react";

export default function HomePage() {
  const highlights = [
    "11 lezioni guidate, incrementali e pratiche",
    "React moderno + Next.js aggiornato",
    "Esercizi reali con progress tracking",
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_5%,hsl(var(--secondary))_0%,hsl(var(--background))_55%)] text-foreground">
      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-12">
        <section className="relative overflow-hidden rounded-[36px] border border-primary/30 bg-gradient-to-br from-card via-background to-muted p-7 shadow-2xl md:p-12">
          <div className="absolute -top-24 right-[-90px] h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 left-[-90px] h-96 w-96 rounded-full bg-primary/15 blur-3xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                <Gem className="h-3.5 w-3.5 text-primary" />
                Premium Learning Experience
              </div>

              <h1 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl">
                Domina React e Next.js
                <span className="block text-primary">con un percorso italiano d’élite</span>
              </h1>

              <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
                Una piattaforma elegante e concreta: lezioni aggiornate, esercizi ad alto valore e una progressione chiara fino al progetto finale portfolio-ready.
              </p>

              <div className="grid gap-2 sm:grid-cols-2">
                {highlights.map((item, idx) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx + 0.15 }}
                    className="flex items-center gap-2 rounded-xl border border-primary/20 bg-background/70 px-3 py-2 text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <Link
                  href="/panoramica"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:brightness-110"
                >
                  Vai alla Panoramica
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/curriculum"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/40 bg-background/70 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  Esplora il Programma
                  <BookOpen className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="grid grid-cols-2 gap-3"
            >
              <article className="rounded-2xl border border-primary/30 bg-card/90 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Lezioni</p>
                <p className="mt-2 font-display text-3xl font-bold text-primary">11</p>
              </article>
              <article className="rounded-2xl border border-primary/30 bg-card/90 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Moduli</p>
                <p className="mt-2 font-display text-3xl font-bold text-primary">3</p>
              </article>
              <article className="rounded-2xl border border-primary/30 bg-card/90 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Formato</p>
                <p className="mt-2 text-sm font-semibold">100% Italiano</p>
              </article>
              <article className="rounded-2xl border border-primary/30 bg-card/90 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Target</p>
                <p className="mt-2 text-sm font-semibold">Junior to Pro</p>
              </article>
            </motion.div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <motion.article whileHover={{ y: -4 }} className="rounded-2xl border border-primary/30 bg-card p-5 shadow-sm">
            <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2 text-primary">
              <Layers3 className="h-5 w-5" />
            </div>
            <h2 className="font-semibold">Percorso Architetturato</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Una roadmap chiara, senza caos: dalle basi ai pattern professionali.
            </p>
          </motion.article>

          <motion.article whileHover={{ y: -4 }} className="rounded-2xl border border-primary/30 bg-card p-5 shadow-sm">
            <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2 text-primary">
              <Trophy className="h-5 w-5" />
            </div>
            <h2 className="font-semibold">Focalizzato su Risultati</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ogni lezione ha obiettivi concreti e task pratici immediatamente applicabili.
            </p>
          </motion.article>

          <motion.article whileHover={{ y: -4 }} className="rounded-2xl border border-primary/30 bg-card p-5 shadow-sm">
            <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="font-semibold">Interfaccia Premium</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Leggibilità alta, gerarchie visive forti e navigazione rapida su ogni device.
            </p>
          </motion.article>
        </section>

        <section className="mt-8 rounded-3xl border border-primary/30 bg-card/70 p-6 md:p-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Ready To Build</p>
              <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">
                Inizia ora il tuo percorso React/Next.js
              </h3>
            </div>
            <Link
              href="/panoramica"
              className="inline-flex items-center gap-2 rounded-xl border border-primary/40 px-5 py-3 text-sm font-semibold hover:bg-primary/10"
            >
              Entra nel corso
              <Sparkles className="h-4 w-4 text-primary" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
