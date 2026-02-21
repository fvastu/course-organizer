import type { InsertLesson } from "../../shared/schema.ts";

export const lesson01: InsertLesson = {
  lessonNumber: 1,
  title: "Fondamenti di Git e GitHub",
  module: "Fondamenti",
  objectives: `• Capire il modello distribuito di Git
• Gestire branch, commit e merge in modo sicuro
• Collaborare su GitHub con pull request e review`,
  topics: `1. Repository locale, remoto e ciclo fetch/pull/push
2. Staging area e commit atomici
3. Branch strategy (feature branch e trunk-based)
4. Merge conflict: riconoscimento e risoluzione`,
  commands: `git init - Inizializza un repository
git checkout -b feature/x - Crea e apre un branch
git pull --rebase origin main - Aggiorna il branch locale`,
  reflectionQuestions: `Quando preferisci merge e quando rebase?
Quali rischi ci sono nel fare force push su branch condivisi?`,
  homework: `Esercizio 1: Crea un repository, aggiungi README e pubblicalo su GitHub con almeno 2 commit chiari.
Esercizio 2: Simula un conflitto su un file, risolvilo manualmente e apri una pull request descrivendo la soluzione.`
};
