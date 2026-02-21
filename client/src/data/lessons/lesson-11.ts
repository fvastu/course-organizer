import type { CourseLesson } from "../lessons";

export const lesson11: CourseLesson = {
  "id": 11,
  "lessonNumber": 11,
  "title": "Deployment e Ottimizzazione Finale",
  "module": "Modulo Next.js",
  "objectives": "• Pubblicare su Vercel con pipeline chiara e ripetibile\n• Gestire variabili ambiente in sicurezza\n• Ottimizzare bundle, metriche e affidabilita runtime",
  "topics": "1. CI/CD GitHub -> Preview -> Production con policy di merge\n2. Variabili: server-only vs NEXT_PUBLIC con esempi pratici\n3. Monitoraggio: error logs, analytics, web vitals e alerting\n4. Ottimizzazione finale: splitting, lazy loading, immagini e font",
  "commands": "vercel --prod\nvercel env pull .env.local\nANALYZE=true npm run build",
  "reflectionQuestions": "Quali dati devono restare esclusivamente lato server?\nQuando scegliere rollback immediato rispetto a hotfix rapido?",
  "homework": "Esercizio 1: Esegui deploy completo su Vercel con ambienti distinti (preview/prod).\nEsercizio 2: Esegui audit Lighthouse e applica almeno 5 ottimizzazioni misurabili.",
  "isCompleted": false
};

export default lesson11;
