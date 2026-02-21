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
              Questa lezione e bloccata dalla configurazione corrente del corso.
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
  const objectives = lesson.objectives.split('\n').filter(Boolean);
  const topics = lesson.topics.split('\n').filter(Boolean);
  const commands = lesson.commands ? lesson.commands.split('\n').filter(Boolean) : [];
  const reflectionQuestions = lesson.reflectionQuestions ? lesson.reflectionQuestions.split('\n').filter(Boolean) : [];
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
          <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-between px-4 md:px-8">
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
          <article className="max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-12">
            
            {/* Page Header */}
            <header className="space-y-6">
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

            {/* Content Sections */}
            <div className="space-y-16">
              {academy && (
                <section className="space-y-8">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-bold tracking-tight">Spiegazione guidata</h2>
                  </div>

                  <Card className="border-primary/25 bg-card">
                    <CardContent className="p-6 space-y-4">
                      <p className="text-base leading-relaxed text-foreground/90">{academy.intro}</p>
                      <div className="rounded-xl border border-primary/20 bg-muted/40 p-4">
                        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Contesto applicativo</p>
                        <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                          {academy.context.map((item, idx) => (
                            <li key={idx}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Accordion type="multiple" className="w-full rounded-2xl border border-primary/20 bg-card px-4">
                    {academy.sections.map((section, idx) => (
                      <AccordionItem key={idx} value={`section-${idx}`} className="border-primary/10">
                        <AccordionTrigger className="text-left text-base font-semibold">
                          {section.title}
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-1">
                          {section.paragraphs.map((paragraph, pIdx) => (
                            <p key={pIdx} className="text-sm leading-relaxed text-foreground/85">
                              {paragraph}
                            </p>
                          ))}
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {section.bullets.map((bullet, bIdx) => (
                              <li key={bIdx}>• {bullet}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-primary/25 bg-card">
                      <CardContent className="p-5">
                        <div className="mb-3 flex items-center gap-2 text-primary">
                          <AlertTriangle className="h-4 w-4" />
                          <h3 className="text-sm font-semibold uppercase tracking-wider">Errori comuni</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {academy.commonMistakes.map((mistake, idx) => (
                            <li key={idx}>• {mistake}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-primary/25 bg-card">
                      <CardContent className="p-5">
                        <div className="mb-3 flex items-center gap-2 text-primary">
                          <ClipboardCheck className="h-4 w-4" />
                          <h3 className="text-sm font-semibold uppercase tracking-wider">Checklist finale</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {academy.checklist.map((item, idx) => (
                            <li key={idx}>• {item}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              )}
              
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

              {/* Examples Section */}
              {examples.length > 0 && (
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-bold tracking-tight">Esempi pratici</h2>
                  </div>
                  <div className="grid gap-3">
                    {examples.map((example, i) => (
                      <Card key={i} className="border border-primary/20 bg-card/80">
                        <CardContent className="p-5">
                          <div className="mb-2 inline-flex rounded-md border border-primary/25 bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                            Esempio {i + 1}
                          </div>
                          <p className="text-sm leading-relaxed text-foreground/90">{example}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* Situations Section */}
              {situations.length > 0 && (
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-bold tracking-tight">Situazioni reali</h2>
                  </div>
                  <div className="space-y-3">
                    {situations.map((situation, i) => (
                      <div key={i} className="rounded-xl border border-primary/20 bg-muted/50 px-4 py-4">
                        <p className="text-sm font-medium text-foreground/90">{situation}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Snippets Section */}
              {snippets.length > 0 && (
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Code2 className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-bold tracking-tight">Snippet di riferimento</h2>
                  </div>
                  <div className="space-y-4">
                    {snippets.map((snippet, i) => (
                      <Card key={i} className="overflow-hidden border border-primary/25 bg-card">
                        <CardContent className="p-0">
                          <div className="flex items-center justify-between border-b border-primary/15 bg-muted/60 px-4 py-2">
                            <h3 className="text-sm font-semibold text-foreground">{snippet.title}</h3>
                            <span className="rounded-md border border-primary/20 bg-background px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                              {snippet.language}
                            </span>
                          </div>
                          <pre className="overflow-x-auto px-4 py-4 text-xs leading-6 text-foreground/90">
                            <code>{snippet.code}</code>
                          </pre>
                          {snippet.note && (
                            <div className="border-t border-primary/10 bg-primary/5 px-4 py-3 text-xs text-muted-foreground">
                              {snippet.note}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* Reflections Section */}
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
                      
                      <CompletionToggle 
                        lessonId={lesson.id} 
                        isCompleted={lesson.isCompleted} 
                        className="w-full sm:w-auto min-w-[180px]"
                      />
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

            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
