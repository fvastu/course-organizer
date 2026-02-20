import { cn } from "@/lib/utils";
import { type LessonResponse } from "@shared/routes";
import { CheckCircle2, Circle, Clock, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

interface ModuleCardProps {
  title: string;
  lessons: LessonResponse[];
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
        {lessons.map((lesson, idx) => (
          <Link key={lesson.id} href={`/lesson/${lesson.id}`} className="block">
            <motion.div 
              whileHover={{ y: -2, scale: 1.005 }}
              className={cn(
                "group relative overflow-hidden bg-card border rounded-xl p-4 transition-all duration-300 hover:shadow-lg cursor-pointer flex items-center gap-4",
                lesson.isCompleted ? "border-primary/20 bg-primary/5" : "border-border hover:border-primary/30"
              )}
            >
              <div className="flex-shrink-0">
                 <div className={cn(
                   "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
                   lesson.isCompleted 
                     ? "bg-green-500 text-white" 
                     : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                 )}>
                   {lesson.isCompleted ? <CheckCircle2 className="w-5 h-5" /> : lesson.lessonNumber}
                 </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={cn(
                    "font-semibold truncate transition-colors",
                    lesson.isCompleted ? "text-foreground" : "text-foreground group-hover:text-primary"
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
                    {lesson.topics.split(',')[0]}...
                  </span>
                </div>
              </div>

              <div className="text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all">
                <ChevronRight className="w-5 h-5" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
