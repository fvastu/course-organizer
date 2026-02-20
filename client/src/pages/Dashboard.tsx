import { useLessons } from "@/hooks/use-lessons";
import { Sidebar } from "@/components/Sidebar";
import { ModuleCard } from "@/components/ModuleCard";
import { Loader2, Trophy, BookOpen, Clock, Layout } from "lucide-react";
import { motion } from "framer-motion";

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
  
  // Group by modules
  const foundations = allLessons.filter(l => l.module === "Fondamenti");
  const reactModule = allLessons.filter(l => l.module === "Modulo React");
  const nextModule = allLessons.filter(l => l.module === "Modulo Next.js");

  const completedCount = allLessons.filter(l => l.isCompleted).length;
  const totalLessons = allLessons.length;
  const overallProgress = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar className="hidden md:flex" />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header mobile */}
        <div className="md:hidden p-4 border-b bg-card flex items-center justify-between">
          <span className="font-bold font-display text-lg">React Junior</span>
          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">Corso</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 md:p-12 shadow-2xl">
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sm font-medium backdrop-blur-sm border border-white/10 mb-6">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span>Progresso Totale: {overallProgress}%</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold font-display mb-4 leading-tight">
                  Bentornato al corso <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                    React & Next.js Junior
                  </span>
                </h1>
                
                <p className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
                  Continua il tuo percorso di apprendimento. Hai completato {completedCount} lezioni su {totalLessons}.
                </p>

                {/* Progress Bar */}
                <div className="w-full max-w-md h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-violet-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${overallProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-medium">Moduli</div>
                <div className="text-2xl font-bold">3</div>
              </div>
            </div>
            <div className="bg-card border rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-violet-100 dark:bg-violet-900/30 text-violet-600 rounded-xl">
                <Layout className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-medium">Lezioni Totali</div>
                <div className="text-2xl font-bold">{totalLessons}</div>
              </div>
            </div>
            <div className="bg-card border rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-medium">Ore Stimate</div>
                <div className="text-2xl font-bold">~25</div>
              </div>
            </div>
          </div>

          {/* Modules Grid */}
          <div className="grid gap-12 max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ModuleCard 
                title="Modulo 1: Fondamenti" 
                lessons={foundations} 
                color="bg-blue-500" 
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ModuleCard 
                title="Modulo 2: React Core" 
                lessons={reactModule} 
                color="bg-violet-500" 
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ModuleCard 
                title="Modulo 3: Next.js Framework" 
                lessons={nextModule} 
                color="bg-slate-800 dark:bg-slate-200" 
              />
            </motion.div>
          </div>

        </div>
      </main>
    </div>
  );
}
