import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTheme}
        className="border-primary/50 bg-background/60 text-foreground backdrop-blur hover:bg-primary/10"
      >
        {isDark ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
        {isDark ? "Tema chiaro" : "Tema scuro"}
      </Button>
    </motion.div>
  );
}
