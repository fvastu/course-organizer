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
    <aside className={cn("flex flex-col w-64 border-r border-[#8c6a2e] bg-[#101014] h-screen sticky top-0", className)}>
      <div className="p-6 border-b border-[#8c6a2e]/60">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#b88d3f] to-[#f0c46f] flex items-center justify-center text-[#17120a] shadow-lg shadow-[#d6a84f]/25">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg leading-tight">React Junior</h1>
            <p className="text-xs text-[#bda977] font-medium">Corso Completo</p>
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
                ? "bg-[#241a0f] text-[#e8c37a] border border-[#8c6a2e]"
                : "text-[#bda977] hover:bg-[#1b1510] hover:text-[#f5e6c3]"
            )}>
              <item.icon className={cn("h-4 w-4 transition-colors", isActive ? "text-[#e8c37a]" : "text-[#a48f60] group-hover:text-[#f5e6c3]")} />
              {item.label}
              {isActive && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
            </Link>
          );
        })}

        <div className="mt-8 px-4 py-4 rounded-xl bg-gradient-to-br from-[#0b0b0d] to-[#1b140c] text-[#f8edd0] border border-[#8c6a2e] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CheckCircle2 className="w-24 h-24 -mr-8 -mt-8" />
          </div>
          <h3 className="font-semibold mb-1 relative z-10">Obiettivo Finale</h3>
          <p className="text-xs text-[#c8b485] relative z-10 leading-relaxed">
            Completa tutte le 11 lezioni per ottenere il tuo attestato Junior React Developer.
          </p>
        </div>
      </nav>

      <div className="p-4 border-t border-[#8c6a2e]/60 text-xs text-center text-[#bda977]">
        &copy; 2026 Percorso React & Next.js
      </div>
    </aside>
  );
}
