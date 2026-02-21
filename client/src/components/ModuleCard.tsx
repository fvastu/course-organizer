import { cn } from "@/lib/utils";
import { type CourseLesson } from "@/data/lessons";
import { CheckCircle2, Lock, Clock, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

interface ModuleCardProps {
  title: string;
  lessons: (CourseLesson & { isLocked?: boolean })[];
  color: string;
}

export function ModuleCard({ title, lessons, color }: ModuleCardProps) {
  const completedCount = lessons.filter(l => l.isCompleted).length;
  const totalCount = lessons.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold font-display flex items-center gap-3">
          <span className={cn("w-3 h-8 rounded-full block", color)}></span>
          {title}
        </h2>
        <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {progress}% Completato
        </span>
      </div>
      
      <div className="grid gap-3">
        {lessons.map((lesson) => (
          <Link key={lesson.id} href={lesson.isLocked ? "#" : `/lesson/${lesson.id}`} className={cn("block", lesson.isLocked && "cursor-not-allowed")}>
            <motion.div 
              whileHover={!lesson.isLocked ? { y: -2, scale: 1.005 } : {}}
              className={cn(
                "group relative overflow-hidden bg-card border rounded-xl p-4 transition-all duration-300 flex items-center gap-4",
                lesson.isLocked ? "opacity-60 bg-muted/30 grayscale-[0.5]" : "hover:shadow-lg cursor-pointer",
                lesson.isCompleted ? "border-primary/20 bg-primary/5" : "border-border hover:border-primary/30"
              )}
            >
              <div className="flex-shrink-0">
                 <div className={cn(
                   "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
                   lesson.isLocked 
                    ? "bg-muted text-muted-foreground"
                    : lesson.isCompleted 
                      ? "bg-green-500 text-white" 
                      : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                 )}>
                   {lesson.isLocked ? <Lock className="w-4 h-4" /> : lesson.isCompleted ? <CheckCircle2 className="w-5 h-5" /> : lesson.lessonNumber}
                 </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={cn(
                    "font-semibold truncate transition-colors",
                    lesson.isLocked ? "text-muted-foreground" : lesson.isCompleted ? "text-foreground" : "text-foreground group-hover:text-primary"
                  )}>
                    {lesson.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    2-3 ore
                  </span>
                  <span className="truncate max-w-[200px] hidden sm:inline-block opacity-70">
                    {lesson.isLocked ? "Completa la lezione precedente" : lesson.topics.split('\n')[0].substring(0, 30) + "..."}
                  </span>
                </div>
              </div>

              {!lesson.isLocked && (
                <div className="text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </div>
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
