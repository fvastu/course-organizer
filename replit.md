# Overview

This is a **React Junior Course Tracker** — a full-stack web application that helps students track their progress through an 11-lesson curriculum covering Git, React, and Next.js. The app displays lessons grouped by module ("Fondamenti", "Modulo React", "Modulo Next.js"), lets users view lesson details (objectives, topics, commands, homework), and toggle completion status for each lesson. The UI is in Italian.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend
- **Framework:** React 18 with TypeScript, bundled via Vite
- **Routing:** `wouter` (lightweight client-side router)
- **State/Data Fetching:** TanStack React Query for server state management
- **UI Components:** shadcn/ui (new-york style) built on Radix UI primitives
- **Styling:** Tailwind CSS with CSS variables for theming, custom fonts (Inter, Outfit)
- **Animations:** Framer Motion for layout transitions and hover effects
- **Icons:** Lucide React

### Pages
- `/` — Dashboard: shows lesson modules with progress stats
- `/lesson/:id` — Lesson detail: objectives, topics, commands, homework, completion toggle
- `/curriculum` — Timeline view of all lessons

### Key Client Components
- `Sidebar` — Navigation sidebar with links to Dashboard and Curriculum
- `ModuleCard` — Displays a group of lessons within a module with progress
- `CompletionToggle` — Button to mark a lesson as complete/incomplete
- Custom hooks in `client/src/hooks/use-lessons.ts` handle all API communication

## Backend
- **Runtime:** Node.js with Express 5
- **Language:** TypeScript, executed via `tsx`
- **API Pattern:** RESTful JSON API under `/api/` prefix
- **Dev Server:** Vite dev server middleware integrated into Express for HMR during development
- **Production:** Vite builds static files to `dist/public`, esbuild bundles the server to `dist/index.cjs`

### API Endpoints
- `GET /api/lessons` — List all lessons ordered by lesson number
- `GET /api/lessons/:id` — Get a single lesson
- `PATCH /api/lessons/:id` — Update a lesson (primarily used for toggling `isCompleted`)

### API Contract
Shared route definitions in `shared/routes.ts` define method, path, input schemas, and response schemas using Zod. Both client and server reference these for type safety.

## Database
- **Database:** PostgreSQL (required, connection via `DATABASE_URL` environment variable)
- **ORM:** Drizzle ORM with `drizzle-zod` for schema-to-Zod conversion
- **Schema location:** `shared/schema.ts`
- **Migrations:** Generated via `drizzle-kit` to `./migrations` directory
- **Push command:** `npm run db:push` applies schema to database

### Database Schema
Single table `lessons`:
| Column | Type | Notes |
|--------|------|-------|
| id | serial | Primary key |
| lessonNumber | integer | Unique, determines display order |
| title | text | Lesson title |
| module | text | Module grouping ("Fondamenti", "Modulo React", "Modulo Next.js") |
| objectives | text | Newline-separated learning objectives |
| topics | text | Newline-separated topic list |
| homework | text | Newline-separated homework items |
| commands | text | Newline-separated commands/code snippets |
| isCompleted | boolean | Completion status, default false |

### Seeding
The server auto-seeds the database with 11 predefined lessons on first run if the `lessons` table is empty. Seed data is defined in `server/routes.ts`.

## Storage Layer
- `server/storage.ts` defines an `IStorage` interface and `DatabaseStorage` implementation
- The storage singleton (`storage`) is used by route handlers

## Build System
- **Dev:** `npm run dev` — runs the Express server with Vite middleware for HMR
- **Build:** `npm run build` — runs `script/build.ts` which builds the Vite client and bundles the server with esbuild
- **Start:** `npm start` — runs the production build from `dist/index.cjs`
- **Type check:** `npm run check`

## Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

# External Dependencies

- **PostgreSQL** — Primary database, connected via `DATABASE_URL` environment variable. Required for the app to start.
- **connect-pg-simple** — Session store (available but sessions are not actively used in current routes)
- **Google Fonts** — Inter, Outfit, DM Sans, Fira Code, Geist Mono loaded via CDN
- **Replit Plugins** — `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` used in development on Replit