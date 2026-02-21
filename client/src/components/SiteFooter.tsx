import { motion } from "framer-motion";

export function SiteFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="border-t border-primary/25 bg-background/80"
    >
      <div className="flex w-full flex-col gap-2 px-4 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
        <p>© 2026 Corso Premium React & Next.js</p>
        <p>Frontend-only · Tema Oro/Nero · Esperienza premium</p>
      </div>
    </motion.footer>
  );
}
