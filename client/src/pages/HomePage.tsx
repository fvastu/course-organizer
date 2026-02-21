import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Trophy, Layers3, Sparkles, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_12%_10%,#23170a_0%,#111114_36%,#09090b_100%)] text-[#f7e9c6]">
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        <section className="relative overflow-hidden rounded-[32px] border border-[#8b6a2c] bg-gradient-to-br from-[#0a0a0c] via-[#141418] to-[#1a1208] p-8 text-[#f9eed1] shadow-2xl md:p-14">
          <div className="absolute -top-16 right-[-70px] h-72 w-72 rounded-full bg-[#d4a94f]/25 blur-3xl" />
          <div className="absolute -bottom-20 left-[-80px] h-80 w-80 rounded-full bg-[#7a5a24]/20 blur-3xl" />

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

            <p className="max-w-2xl text-[#e7d9b5] md:text-lg">
              Una piattaforma elegante e focalizzata sulla pratica: segui lezioni progressive,
              completa esercizi guidati e monitora i tuoi avanzamenti in un unico ambiente.
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link
                href="/panoramica"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d6a84f] px-5 py-3 text-sm font-bold text-[#120f09] transition hover:bg-[#e6bb67]"
              >
                Vai alla Panoramica
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/curriculum"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#9d7a3b] bg-[#1a150f]/80 px-5 py-3 text-sm font-semibold text-[#f5e7c3] transition hover:bg-[#20180f]"
              >
                Apri il Programma
                <BookOpen className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-[#8b6a2c] bg-[#141216] p-5 shadow-sm">
            <div className="mb-3 inline-flex rounded-lg bg-[#2a2012] p-2 text-[#d8ad5a]">
              <Layers3 className="h-5 w-5" />
            </div>
            <h2 className="font-semibold">Percorso Strutturato</h2>
            <p className="mt-1 text-sm text-[#cab889]">
              11 lezioni ordinate in moduli, con progressione chiara e contenuti focalizzati.
            </p>
          </article>

          <article className="rounded-2xl border border-[#8b6a2c] bg-[#141216] p-5 shadow-sm">
            <div className="mb-3 inline-flex rounded-lg bg-[#2a2012] p-2 text-[#d8ad5a]">
              <Trophy className="h-5 w-5" />
            </div>
            <h2 className="font-semibold">Obiettivo Concreto</h2>
            <p className="mt-1 text-sm text-[#cab889]">
              Ogni lezione include esercizi pratici essenziali per costruire competenze reali.
            </p>
          </article>

          <article className="rounded-2xl border border-[#8b6a2c] bg-[#141216] p-5 shadow-sm">
            <div className="mb-3 inline-flex rounded-lg bg-[#2a2012] p-2 text-[#d8ad5a]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="font-semibold">Interfaccia Curata</h2>
            <p className="mt-1 text-sm text-[#cab889]">
              Design pulito, leggibile e moderno, ottimizzato sia desktop sia mobile.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
