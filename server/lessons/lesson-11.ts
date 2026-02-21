import type { InsertLesson } from "../../shared/schema.ts";

export const lesson11: InsertLesson = {
  lessonNumber: 11,
  title: "Deployment e Ottimizzazione Finale",
  module: "Modulo Next.js",
  objectives: `• Effettuare deploy su Vercel in modo affidabile
• Gestire variabili ambiente e segreti
• Fare audit prestazionale prima del rilascio`,
  topics: `1. CI/CD con GitHub e preview deploy
2. NEXT_PUBLIC_ vs secret server-only
3. Log e monitoraggio errori in produzione
4. Lighthouse e riduzione bundle`,
  commands: `vercel - Deploy preview
vercel --prod - Deploy produzione
ANALYZE=true npm run build - Analisi bundle`,
  reflectionQuestions: `Quali dati NON devono mai finire in NEXT_PUBLIC_?
Quando conviene rollback invece di hotfix immediato?`,
  homework: `Esercizio 1: Pubblica il progetto su Vercel con variabili ambiente separate per sviluppo e produzione.
Esercizio 2: Esegui audit Lighthouse e documenta almeno 3 miglioramenti applicati.`
};
