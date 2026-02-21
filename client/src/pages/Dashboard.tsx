import { useLessons } from "@/hooks/use-lessons";
import { Sidebar } from "@/components/Sidebar";
import { ModuleCard } from "@/components/ModuleCard";
import { Loader2, Compass, BadgeCheck, BookMarked, Sparkles, Rocket, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Dashboard() {
  const { data: lessons, isLoading, error } = useLessons();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="text-destructive font-bold text-lg">Errore di caricamento</div>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  const allLessons = lessons || [];
  const foundations = allLessons.filter((entry) => entry.module === "Fondamenti");
  const reactModule = allLessons.filter((entry) => entry.module === "Modulo React");
  const nextModule = allLessons.filter((entry) => entry.module === "Modulo Next.js");

  const completedCount = allLessons.filter((entry) => entry.isCompleted).length;
  const totalLessons = allLessons.length;
  const remaining = Math.max(totalLessons - completedCount, 0);
  const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      <Sidebar className="hidden md:flex" />

      <main className="flex-1 min-w-0">
        <div className="md:hidden px-4 py-3 border-b border-primary/30 bg-background/90 backdrop-blur">
          <div className="flex items-center justify-between">
            <h1 className="font-display font-bold">Corso React/Next.js</h1>
            <Link href="/curriculum" className="text-sm font-medium text-primary">
              Programma
            </Link>
          </div>
        </div>

        <div className="p-4 md:p-8 space-y-8">
          <section className="relative overflow-hidden rounded-[28px] border border-primary/30 bg-gradient-to-br from-card via-background to-muted p-8 md:p-12">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="relative z-10 max-w-3xl space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Panoramica del percorso
              </div>

              <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
                Traccia il tuo
                <span className="text-primary"> percorso completo</span>
              </h2>

              <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
                Segui lo stato reale delle lezioni, riprendi subito dal punto giusto e completa il programma senza dispersioni.
              </p>

              <div className="space-y-2 max-w-lg">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Avanzamento</span>
                  <span className="font-bold text-foreground">{progress}%</span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary/70 via-primary to-primary/60"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <article className="rounded-2xl border border-primary/30 bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completate</p>
                  <p className="text-2xl font-bold">{completedCount}</p>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-primary/30 bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                  <BookMarked className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Totale lezioni</p>
                  <p className="text-2xl font-bold">{totalLessons}</p>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-primary/30 bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Da completare</p>
                  <p className="text-2xl font-bold">{remaining}</p>
                </div>
              </div>
            </article>
          </section>

          <section className="rounded-2xl border border-primary/30 bg-card p-5 md:p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold">Riprendi subito</h3>
                <p className="text-sm text-muted-foreground">
                  Vai al programma completo o continua dalla prossima lezione non completata.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/curriculum"
                  className="inline-flex items-center gap-2 rounded-xl border border-primary/30 px-4 py-2 text-sm font-semibold hover:bg-muted"
                >
                  Apri Programma
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          <section className="grid gap-10 max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
              <ModuleCard title="Modulo 1: Fondamenti" lessons={foundations} color="bg-[#d6a84f]" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <ModuleCard title="Modulo 2: Fondamenti React" lessons={reactModule} color="bg-[#b88d3f]" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
              <ModuleCard title="Modulo 3: Ecosistema Next.js" lessons={nextModule} color="bg-[#8c6a2e]" />
            </motion.div>
          </section>

          <section className="rounded-2xl border border-primary/30 bg-gradient-to-r from-muted via-card to-muted p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                <Rocket className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Obiettivo finale</p>
                <p className="text-sm text-muted-foreground">
                  Completa tutte le lezioni e prepara un progetto portfolio con React + Next.js pronto da mostrare.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
