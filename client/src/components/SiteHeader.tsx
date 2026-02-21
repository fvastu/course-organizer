import { Link, useLocation } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Crown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Inizio" },
  { href: "/panoramica", label: "Panoramica" },
  { href: "/curriculum", label: "Programma" },
];

export function SiteHeader() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-primary/25 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="rounded-xl border border-primary/40 bg-primary/10 p-2 text-primary transition-transform group-hover:scale-105">
            <Crown className="h-4 w-4" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-bold text-foreground md:text-base">
              Code With Fra
            </span>
            <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/90 md:text-xs">
              Premium Academy
              <Sparkles className="h-3 w-3" />
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-primary/20 bg-card/70 p-1 md:flex">
          {links.map((item) => (
            <motion.div key={item.href} whileHover={{ y: -1 }}>
              <Link
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  location === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
