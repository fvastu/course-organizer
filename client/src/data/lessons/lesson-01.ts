import type { CourseLesson } from "../lessons";

export const lesson01: CourseLesson = {
  id: 1,
  lessonNumber: 1,
  title: "Fondamenti di Git e GitHub",
  module: "Fondamenti",

  image:
    "https://i.ytimg.com/vi/0chZFIZLR_0/maxresdefault.jpg",

  objectives:
    "Capire il modello distribuito di Git\nUsare branch e merge in modo sicuro\nCollaborare con pull request su GitHub\nGestire tag di release e flusso deploy su ambienti",

  topics:
    "1. Repository locale e remoto: cosa vive su GitHub e cosa in locale\n" +
    "2. Commit atomici e messaggi chiari: esempio feat/fix/docs in Conventional Commits\n" +
    "3. Branching strategy: main, develop, feature/* con flusso pull request\n" +
    "4. Risoluzione conflitti: esempio pratico su README modificato da due branch\n" +
    "5. Tag e release: semantic versioning (v1.2.0)\n" +
    "6. Deploy flow: build da commit stabile e promozione staging → production",

  commands:
    "git init - Inizializza un nuovo repository locale. Esempio: git init\n" +
    "git clone <url> - Clona un repository remoto. Esempio: git clone https://github.com/org/progetto.git\n" +
    "git status - Controlla lo stato dei file. Esempio: git status\n" +
    "git add <file> - Aggiunge modifiche allo staging. Esempio: git add src/App.tsx\n" +
    "git add . - Aggiunge tutte le modifiche. Esempio: git add .\n" +
    "git commit -m 'messaggio' - Salva uno snapshot. Esempio: git commit -m 'feat(auth): login'\n" +
    "git commit --amend - Modifica ultimo commit. Esempio: git commit --amend -m 'fix(auth): validazione'\n" +
    "git switch -c feature/x - Crea e passa a un branch. Esempio: git switch -c feature/profile\n" +
    "git switch main - Passa a un branch esistente. Esempio: git switch main\n" +
    "git pull origin main - Aggiorna branch locale. Esempio: git pull origin main\n" +
    "git push origin feature/x - Invia commit al remoto. Esempio: git push origin feature/profile\n" +
    "git merge feature/x - Unisce branch. Esempio: git merge feature/profile\n" +
    "git diff - Mostra modifiche non committate. Esempio: git diff\n" +
    "git log - Visualizza cronologia commit. Esempio: git log\n" +
    "git log --oneline - Cronologia compatta. Esempio: git log --oneline",

  // Best practice moderne (molto rilevanti per lavoro reale)
  bestPractices:
    "Commit piccoli e frequenti\n" +
    "Messaggi chiari con Conventional Commits\n" +
    "Non lavorare mai direttamente su main\n" +
    "Pull request sempre prima del merge\n" +
    "Code review per qualità e conoscenza condivisa\n" +
    "Sincronizza spesso il tuo branch con main\n" +
    "Evita force push su branch condivisi\n" +
    "Usa .gitignore per non versionare file sensibili",

  // Workflow reale usato in team e startup
  workflow:
    "1. Clona il progetto\n" +
    "2. Crea un branch feature\n" +
    "3. Lavora e fai commit\n" +
    "4. Push del branch\n" +
    "5. Apri pull request\n" +
    "6. Code review\n" +
    "7. Merge su main\n" +
    "8. Deploy automatico",

  reflectionQuestions:
    "Quando usare merge e quando rebase?\n" +
    "Quali rischi ha il force push su branch condivisi?\n" +
    "Perché non lavorare direttamente su main?",

  homework:
    "Esercizio 1: Crea un repository con README e almeno 3 commit.\n" +
    "Esercizio 2: Simula un conflitto e risolvilo.\n" +
    "Esercizio 3: Apri una pull request tra due branch.\n" +
    "Esercizio 4: Scrivi commit con formato Conventional Commits.",

  resources:
    "https://docs.wavemaker.com/learn/assets/images/branching-model-121bd320dd2f5972a5f6ce2fb19a3f4e.png\n" +
    "https://samlearnsazure.blog/wp-content/uploads/2020/12/00featuredimage.png\n" +
    "https://i.sstatic.net/GEZby.png\n" +
    "https://images.prismic.io/hatica/27290fcd-a24b-445e-b639-627031a9bcb7_log+1.png?auto=compress,format&rect=0,0,1312,1008&w=1200&h=922\n" +
    "https://geo-jobe.com/wp-content/uploads/2022/07/DefaultMergeCropped.png",

  isCompleted: false,
};

export default lesson01;