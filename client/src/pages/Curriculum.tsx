import { useLessons } from "@/hooks/use-lessons";
import { Sidebar } from "@/components/Sidebar";
import { Loader2, BookOpen, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

export default function Curriculum() {
  const { data: lessons, isLoading } = useLessons();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const allLessons = lessons || [];

  return (
    <div className="flex min-h-screen bg-[#0b0b0d] text-[#f5e6c3] font-sans">
      <Sidebar className="hidden md:flex" />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="p-8 max-w-5xl mx-auto w-full">
          <div className="mb-10">
             <h1 className="text-3xl font-bold font-display mb-2">Programma del Corso</h1>
             <p className="text-[#c8b485]">Una panoramica completa di tutti i moduli e le lezioni.</p>
          </div>

          <div className="relative border-l-2 border-[#8c6a2e] ml-4 md:ml-8 space-y-12">
            {allLessons.map((lesson, idx) => (
              <div key={lesson.id} className="relative pl-8 md:pl-12">
                {/* Timeline Dot */}
                <div className={cn(
                  "absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 transition-colors duration-300",
                  lesson.isCompleted 
                    ? "bg-[#d6a84f] border-[#d6a84f]" 
                    : "bg-[#0b0b0d] border-[#8c6a2e]"
                )}>
                  {lesson.isCompleted && <Check className="w-3 h-3 text-white absolute top-[0.5px] left-[0.5px]" />}
                </div>

                <Link href={`/lesson/${lesson.id}`}>
                  <div className="group cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="text-xs font-bold uppercase tracking-wider text-[#cab889] bg-[#1a1711] px-2 py-0.5 rounded border border-[#8c6a2e]">
                         {lesson.module}
                       </span>
                       <span className="text-sm text-[#cab889]">Lezione {lesson.lessonNumber}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {lesson.title}
                    </h3>
                    
                    <p className="text-[#cab889] text-sm line-clamp-2 max-w-2xl mb-4 group-hover:text-[#f5e6c3] transition-colors">
                      {lesson.topics}
                    </p>

                    <div className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                      Vedi dettagli <BookOpen className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
