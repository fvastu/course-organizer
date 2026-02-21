import { useUpdateLesson } from "@/hooks/use-lessons";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CompletionToggleProps {
  lessonId: number;
  isCompleted: boolean;
  className?: string;
}

export function CompletionToggle({ lessonId, isCompleted, className }: CompletionToggleProps) {
  const updateMutation = useUpdateLesson();
  const { toast } = useToast();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    updateMutation.mutate(
      { id: lessonId, isCompleted: !isCompleted },
      {
        onSuccess: () => {
          toast({
            title: !isCompleted ? "Ottimo lavoro!" : "Stato aggiornato",
            description: !isCompleted ? "Hai completato questa lezione." : "La lezione è stata segnata come da completare.",
            variant: !isCompleted ? "default" : "secondary" as any,
          });
          setTimeout(() => setIsAnimating(false), 500);
        },
        onError: () => {
          setIsAnimating(false);
          toast({
            title: "Errore",
            description: "Impossibile aggiornare lo stato della lezione.",
            variant: "destructive",
          });
        }
      }
    );
  };

  return (
    <Button
      variant={isCompleted ? "default" : "outline"}
      size="lg"
      className={cn(
        "gap-2 transition-all duration-300 font-semibold shadow-sm hover:shadow-md active:scale-95",
        isCompleted 
          ? "bg-[#d6a84f] hover:bg-[#e5bb6a] text-[#151109] border-[#d6a84f]" 
          : "hover:border-primary hover:text-primary",
        className
      )}
      onClick={handleToggle}
      disabled={updateMutation.isPending}
    >
      {isCompleted ? (
        <>
          <CheckCircle2 className={cn("w-5 h-5", isAnimating && "animate-pulse")} />
          Completata
        </>
      ) : (
        <>
          <Circle className="w-5 h-5" />
          Segna come completata
        </>
      )}
    </Button>
  );
}
