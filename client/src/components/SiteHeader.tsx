import { Link, useLocation } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Crown } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-primary/30 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-foreground">
          <span className="rounded-lg bg-primary/15 p-1.5 text-primary">
            <Crown className="h-4 w-4" />
          </span>
          Corso Premium React/Next.js
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((item) => (
            <motion.div key={item.href} whileHover={{ y: -1 }}>
              <Link
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  location === item.href
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
