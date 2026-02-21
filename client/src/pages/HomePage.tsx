import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Trophy, Layers3, Sparkles, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,#fef3c7_0%,#fff7ed_30%,#f8fafc_65%,#f1f5f9_100%)] text-slate-900">
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        <section className="relative overflow-hidden rounded-[32px] border border-amber-200/70 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 p-8 text-white shadow-2xl md:p-14">
          <div className="absolute -top-16 right-[-70px] h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />
          <div className="absolute -bottom-20 left-[-80px] h-80 w-80 rounded-full bg-teal-300/20 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Esperienza Premium
            </div>

            <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              Corso React e Next.js
              <span className="block text-amber-300">interamente in italiano</span>
            </h1>

            <p className="max-w-2xl text-slate-200 md:text-lg">
              Una piattaforma elegante e focalizzata sulla pratica: segui lezioni progressive,
              completa esercizi guidati e monitora i tuoi avanzamenti in un unico ambiente.
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link
                href="/panoramica"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-300 px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-amber-200"
              >
                Vai alla Panoramica
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/curriculum"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Apri il Programma
                <BookOpen className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-amber-200 bg-white/90 p-5 shadow-sm">
            <div className="mb-3 inline-flex rounded-lg bg-amber-100 p-2 text-amber-700">
              <Layers3 className="h-5 w-5" />
            </div>
            <h2 className="font-semibold">Percorso Strutturato</h2>
            <p className="mt-1 text-sm text-slate-600">
              11 lezioni ordinate in moduli, con progressione chiara e contenuti focalizzati.
            </p>
          </article>

          <article className="rounded-2xl border border-teal-200 bg-white/90 p-5 shadow-sm">
            <div className="mb-3 inline-flex rounded-lg bg-teal-100 p-2 text-teal-700">
              <Trophy className="h-5 w-5" />
            </div>
            <h2 className="font-semibold">Obiettivo Concreto</h2>
            <p className="mt-1 text-sm text-slate-600">
              Ogni lezione include esercizi pratici essenziali per costruire competenze reali.
            </p>
          </article>

          <article className="rounded-2xl border border-indigo-200 bg-white/90 p-5 shadow-sm">
            <div className="mb-3 inline-flex rounded-lg bg-indigo-100 p-2 text-indigo-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="font-semibold">Interfaccia Curata</h2>
            <p className="mt-1 text-sm text-slate-600">
              Design pulito, leggibile e moderno, ottimizzato sia desktop sia mobile.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
