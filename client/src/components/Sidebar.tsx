import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { BookOpen, CheckCircle2, GraduationCap, Layout, ChevronRight, Home } from "lucide-react";

interface SidebarProps {
  className?: string;
}

const navItems = [
  { href: "/", label: "Inizio", icon: Home },
  { href: "/panoramica", label: "Panoramica", icon: Layout },
  { href: "/curriculum", label: "Programma Corso", icon: BookOpen },
];

export function Sidebar({ className }: SidebarProps) {
  const [location] = useLocation();

  return (
    <aside className={cn("flex flex-col w-64 border-r bg-card h-screen sticky top-0", className)}>
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/25">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg leading-tight">React Junior</h1>
            <p className="text-xs text-muted-foreground font-medium">Corso Completo</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2 mt-4">
          Navigazione
        </div>
        
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}>
              <item.icon className={cn("h-4 w-4 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
              {item.label}
              {isActive && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
            </Link>
          );
        })}

        <div className="mt-8 px-4 py-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CheckCircle2 className="w-24 h-24 -mr-8 -mt-8" />
          </div>
          <h3 className="font-semibold mb-1 relative z-10">Obiettivo Finale</h3>
          <p className="text-xs text-slate-300 relative z-10 leading-relaxed">
            Completa tutte le 11 lezioni per ottenere il tuo attestato Junior React Developer.
          </p>
        </div>
      </nav>

      <div className="p-4 border-t border-border/50 text-xs text-center text-muted-foreground">
        &copy; 2026 Percorso React & Next.js
      </div>
    </aside>
  );
}
