import type { CourseLesson } from "../lessons";

export const lesson01: CourseLesson = {
  "id": 1,
  "lessonNumber": 1,
  "title": "Fondamenti di Git e GitHub",
  "module": "Fondamenti",
  "objectives": "• Capire il modello distribuito di Git\n• Usare branch e merge in modo sicuro\n• Collaborare con pull request su GitHub",
  "topics": "1. Repository locale e remoto: cosa vive su GitHub e cosa in locale\n2. Commit atomici e messaggi chiari: esempio feat/fix/docs in Conventional Commits\n3. Branching strategy: main, develop, feature/* con flusso pull request\n4. Risoluzione conflitti: esempio pratico su README modificato da due branch",
  "commands": "git init - Inizializza un nuovo repository locale (inizio progetto)\ngit clone <url> - Copia un repository remoto mantenendo tutta la cronologia\ngit status - Controlla stato file (working tree e area di staging)\ngit add <file> - Porta modifiche in staging prima del commit\ngit restore --staged <file> - Rimuove un file dallo staging senza perdere modifiche locali\ngit commit -m \"messaggio\" - Salva uno snapshot atomico con descrizione chiara\ngit commit --amend - Corregge ultimo commit (messaggio o piccoli fix)\ngit switch -c feature/x - Crea e passa a un nuovo branch feature (workflow moderno)\ngit pull --rebase origin main - Aggiorna branch locale evitando merge commit non necessari\ngit rebase -i HEAD~5 - Riscrive ultimi commit (squash/reword/fixup prima della PR)\ngit cherry-pick <hash> - Porta un commit specifico su un altro branch\ngit stash push -m \"wip\" - Salva temporaneamente lavoro non pronto\ngit stash -p - Versione meno nota: stasha solo parti selezionate (hunk)\ngit reflog - Meno noto: cronologia movimenti HEAD, utile per recuperare commit 'persi'\ngit worktree add ../repo-hotfix main - Meno noto: apre una seconda working directory su altro branch\ngit bisect start - Meno noto: ricerca binaria del commit che ha introdotto un bug\ngit rerere status - Meno noto: riusa risoluzioni di conflitti gia fatte in passato\ngit log --graph --oneline --decorate --all - Visualizza grafo completo dei branch\ngit blame <file> - Traccia chi ha modificato ogni riga e in quale commit",
  "reflectionQuestions": "Quando usare merge e quando rebase?\nQuali rischi ha il force push su branch condivisi?",
  "homework": "Esercizio 1: Crea un repository con README e almeno 2 commit.\nEsercizio 2: Simula un conflitto e risolvilo via pull request.",
  "isCompleted": false
};

export default lesson01;
