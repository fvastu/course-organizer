import { useLesson } from "@/hooks/use-lessons";
import { Sidebar } from "@/components/Sidebar";
import { CompletionToggle } from "@/components/CompletionToggle";
import { Loader2, ArrowLeft, Target, BookOpen, PenTool, CheckCircle2 } from "lucide-react";
import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function LessonDetail() {
  const [, params] = useRoute("/lesson/:id");
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
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background gap-4">
        <div className="text-destructive font-bold text-lg">Lezione non trovata</div>
        <Link href="/">
          <Button variant="outline">Torna alla Dashboard</Button>
        </Link>
      </div>
    );
  }

  // Parse structured text fields (assuming they might be line-separated or simple text)
  const objectives = lesson.objectives.split('\n').filter(Boolean);
  const topics = lesson.topics.split('\n').filter(Boolean);

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar className="hidden md:flex" />
      
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="h-16 border-b flex items-center px-4 md:px-8 bg-card/50 backdrop-blur-sm sticky top-0 z-50 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                {lesson.module}
              </span>
              <h1 className="text-sm md:text-base font-bold text-foreground truncate max-w-[200px] md:max-w-md">
                Lezione {lesson.lessonNumber}: {lesson.title}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <CompletionToggle lessonId={lesson.id} isCompleted={lesson.isCompleted} />
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto space-y-8 pb-20">
            
            {/* Header Card */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border rounded-2xl p-8 shadow-sm"
            >
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                {lesson.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In questa lezione approfondiremo i concetti fondamentali di {lesson.title} e come applicarli nel contesto di un'applicazione reale.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Objectives */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 rounded-lg">
                    <Target className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold font-display text-blue-900 dark:text-blue-100">Obiettivi</h2>
                </div>
                <ul className="space-y-3">
                  {objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-blue-800 dark:text-blue-200">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{obj}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Topics */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-violet-100 dark:bg-violet-900 text-violet-600 rounded-lg">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold font-display">Argomenti Trattati</h2>
                </div>
                <ul className="space-y-4">
                  {topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 group-hover:bg-violet-600 transition-colors" />
                      <span className="text-foreground/80 group-hover:text-foreground transition-colors leading-relaxed">
                        {topic}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <Separator className="my-8" />

            {/* Homework Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-900 text-slate-50 rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    <PenTool className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h2 className="text-2xl font-bold font-display text-white">Esercitazione Pratica</h2>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <div className="text-slate-300 leading-relaxed whitespace-pre-wrap font-medium">
                    {lesson.homework}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <p className="text-sm text-slate-400">
                    Completa l'esercizio per consolidare le competenze acquisite.
                  </p>
                  
                  <CompletionToggle 
                    lessonId={lesson.id} 
                    isCompleted={lesson.isCompleted} 
                    className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-200 border-none"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
}
