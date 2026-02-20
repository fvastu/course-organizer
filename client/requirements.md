## Packages
framer-motion | Smooth layout transitions and entry animations
lucide-react | Beautiful icons for the UI
clsx | Utility for constructing className strings conditionally
tailwind-merge | Utility for merging Tailwind CSS classes

## Notes
- The app manages a fixed curriculum of 11 lessons.
- Lessons are grouped by module: "Fondamenti", "Modulo React", "Modulo Next.js".
- API endpoints are defined in `@shared/routes`.
- Completion status is toggled via `PATCH /api/lessons/:id`.
