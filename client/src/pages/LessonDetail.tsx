// LessonDetail.tsx

import { useLesson } from "@/hooks/use-lessons";
import { Sidebar } from "@/components/Sidebar";
import { CompletionToggle } from "@/components/CompletionToggle";
import { Loader2, ArrowLeft, Target, BookOpen, PenTool, CheckCircle2, Terminal, Lightbulb, Lock, Briefcase, Code2, GraduationCap, AlertTriangle, ClipboardCheck } from "lucide-react";
import { Link, useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { GitStructureChart } from "@/components/GitStructureChart";
import { LESSON_ENHANCEMENTS } from "@/data/lesson-enhancements";
import { LESSON_ACADEMY } from "@/data/lesson-academy";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function LessonDetail() {
  const [, params] = useRoute("/lesson/:id");
  const [, setLocation] = useLocation();
  const id = params ? parseInt(params.id) : 0;
  const { data: lesson, isLoading, error } = useLesson(id);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !lesson) {
    const isLocked = error instanceof Error && error.message.includes("bloccata");
    
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background gap-6 p-4">
        {isLocked ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-4 max-w-md"
          >
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold">Lezione Bloccata</h2>
            <p className="text-muted-foreground">
              Questa lezione è bloccata dalla configurazione corrente del corso.
              Aggiorna la variabile ambiente per aumentare il livello di sblocco incrementale.
            </p>
            <Button onClick={() => setLocation("/panoramica")} className="mt-4">
              Torna alla Panoramica
            </Button>
          </motion.div>
        ) : (
          <>
            <div className="text-destructive font-bold text-lg">Lezione non trovata</div>
            <Link href="/panoramica">
              <Button variant="outline">Torna alla Panoramica</Button>
            </Link>
          </>
        )}
      </div>
    );
  }

  // Parse structured text fields
  const image = lesson.image;
  const objectives = lesson.objectives.split('\n').filter(Boolean);
  const topics = lesson.topics.split('\n').filter(Boolean);
  const commands = lesson.commands ? lesson.commands.split('\n').filter(Boolean) : [];
  const reflectionQuestions = lesson.reflectionQuestions ? lesson.reflectionQuestions.split('\n').filter(Boolean) : [];
  const bestPractices = lesson.bestPractices ? lesson.bestPractices.split('\n').filter(Boolean) : [];
  const workflow = lesson.workflow ? lesson.workflow.split('\n').filter(Boolean) : [];
  const enhancement = LESSON_ENHANCEMENTS[lesson.lessonNumber];
  const examples = enhancement?.examples ?? [];
  const situations = enhancement?.situations ?? [];
  const snippets = enhancement?.snippets ?? [];
  const academy = LESSON_ACADEMY[lesson.lessonNumber];

  return (
    <div className="flex min-h-[calc(100vh-8rem)] bg-background font-sans selection:bg-primary/10">
      <Sidebar className="hidden md:flex border-r border-primary/30 bg-card" />
      
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="h-16 border-b border-primary/30 bg-background/90 backdrop-blur-md sticky top-0 z-50">
          <div className="flex h-full w-full items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-4">
              <Link href="/panoramica">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-primary/70 uppercase tracking-widest">
                  {lesson.module}
                </span>
                <h1 className="text-sm font-bold text-foreground truncate max-w-[150px] md:max-w-md">
                  {lesson.lessonNumber}. {lesson.title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-muted border border-primary/30 rounded-full text-[10px] font-bold text-muted-foreground">
                {lesson.isCompleted ? "COMPLETATA" : "IN CORSO"}
              </div>
              <CompletionToggle lessonId={lesson.id} isCompleted={lesson.isCompleted} />
            </div>
          </div>
        </header>

        {/* Content Area - Notion Style */}
        <div className="flex-1 overflow-y-auto">
          <article className="px-6 py-12 md:py-20 space-y-12">
            
            {/* Page Header */}
            <header className="space-y-6">
              {image && (
                <div className="w-full max-h-64 overflow-hidden rounded-xl">
                  <img src={image} alt={lesson.title} className="w-full object-cover" />
                </div>
              )}

              <div className="flex items-center gap-2">
                <span className="p-2 bg-primary/10 text-primary rounded-lg text-xs font-bold">
                  Modulo {lesson.lessonNumber <= 1 ? "1" : lesson.lessonNumber <= 6 ? "2" : "3"}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground font-display leading-[1.1]">
                {lesson.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                Un viaggio incrementale attraverso i concetti fondamentali, per costruire competenze solide passo dopo passo.
              </p>
            </header>

            <Separator className="opacity-50" />

            {/* Objectives */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight">Cosa imparerai oggi</h2>
              </div>
              <div className="grid gap-3">
                {objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-muted/40 border border-transparent hover:border-primary/20 transition-all">
                    <CheckCircle2 className="w-5 h-5 text-primary/60 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: obj }} />
                  </div>
                ))}
              </div>
            </section>

            {/* Topics */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight">Punti chiave</h2>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <ul className="list-none p-0 space-y-6">
                  {topics.map((topic, i) => (
                    <li key={i} className="relative pl-8 group">
                      <div className="absolute left-0 top-3 w-2 h-2 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                      <div className="text-lg text-foreground/80 group-hover:text-foreground transition-colors leading-relaxed" dangerouslySetInnerHTML={{ __html: topic }} />
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Commands Section */}
            {commands.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold tracking-tight">Strumenti e Comandi</h2>
                </div>
                <div className="rounded-2xl border border-primary/30 bg-card p-6 font-mono text-sm overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Terminal className="w-20 h-20 text-white" />
                  </div>
                  <div className="space-y-4 relative z-10">
                    {commands.map((cmd, i) => {
                      const [command, ...desc] = cmd.split(' - ');
                      return (
                        <div key={i} className="group">
                          <div className="flex flex-col gap-1">
                            <span className="text-primary font-bold">$ {command}</span>
                            {desc.length > 0 && (
                              <span className="text-muted-foreground text-xs italic"># {desc.join(' - ')}</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* Best Practices */}
            {bestPractices.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold tracking-tight">Best Practices</h2>
                </div>
                <ul className="list-disc list-inside space-y-2 text-foreground/85">
                  {bestPractices.map((bp, i) => (
                    <li key={i}>{bp}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Workflow */}
            {workflow.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold tracking-tight">Workflow Reale</h2>
                </div>
                <ul className="list-disc list-inside space-y-2 text-foreground/85">
                  {workflow.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Reflection Questions */}
            {reflectionQuestions.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold tracking-tight">Spunti di riflessione</h2>
                </div>
                <div className="grid gap-4">
                  {reflectionQuestions.map((q, i) => (
                    <Card key={i} className="border border-primary/30 bg-card hover:bg-muted transition-colors">
                      <CardContent className="p-6">
                        <p className="text-foreground/80 italic">"{q}"</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Homework Section */}
            <section className="space-y-6 pt-12">
              <div className="flex items-center gap-3">
                <PenTool className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight">Mettiamoci al lavoro</h2>
              </div>
              <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="relative z-10 space-y-8">
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <div className="text-lg leading-relaxed whitespace-pre-wrap font-medium text-foreground/90">
                      {lesson.homework}
                    </div>
                  </div>
                  <div className="pt-8 border-t border-primary/10 flex flex-col sm:flex-row gap-6 justify-between items-center">
                    <p className="text-sm text-muted-foreground max-w-xs text-center sm:text-left">
                      Ogni piccolo passo conta. Completa questa esercitazione per sbloccare la lezione successiva.
                    </p>
                    <CompletionToggle lessonId={lesson.id} isCompleted={lesson.isCompleted} className="w-full sm:w-auto min-w-[180px]" />
                  </div>
                </div>
              </div>
            </section>

            {lesson.lessonNumber === 1 && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Visualizzazione struttura Git</h2>
                <GitStructureChart />
              </section>
            )}

          </article>
        </div>
      </main>
    </div>
  );
}