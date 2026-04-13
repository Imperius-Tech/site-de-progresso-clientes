

## Plan: Transform AssetWise into Imperius Tech project tracking hub

This plan replaces the current AssetWise asset tracking app with a public project progress tracking site for Imperius Tech clients.

### What will be built

A multi-client project tracking hub where clients can view their project progress. The first client is Buyate Contabilidade. The site is read-only — no authentication needed for viewing.

### Files to create

1. **`src/data/projects.ts`** — Mock data file with the Buyate project JSON and TypeScript interfaces (`Project`, `Phase`, `Task`). Exports a `getProject(slug)` and `getAllProjects()` function, structured for easy future API swap.

2. **`src/components/project-page.tsx`** — Main project page component with all sections:
   - Header: Imperius logo + project name + status badge
   - Hero: project name, client name, dates
   - Overall progress bar (tasks completed / total)
   - 4 summary cards (completed tasks, current phase, next deadline, days remaining)
   - Phase progress section with colored bars per phase
   - Task list table with status badges and filtering
   - Phase detail cards
   - Footer with Imperius branding

3. **`src/components/imperius-landing.tsx`** — Simple landing page: Imperius logo, tagline, list of active projects with links.

4. **`src/routes/projects.$slug.tsx`** — Dynamic route for `/projects/:slug` that loads and displays a project.

### Files to modify

5. **`src/routes/index.tsx`** — Replace current logic with the Imperius landing page (remove auth/AssetWise dashboard).

6. **`src/routes/__root.tsx`** — Update title, description, og:tags from "AssetWise" to "Imperius Tech". Add Google Fonts link for a serif font (e.g., DM Serif Display) for headings.

7. **`src/styles.css`** — Add CSS custom properties for phase colors (blue, purple, orange, green) and register them in `@theme inline`.

### Files to keep (uploaded logos)

8. Copy `user-uploads://logo-imperius-rebranding.png` to `public/images/imperius-logo.png`
9. Copy `user-uploads://WhatsApp_Image_2026-04-09_at_11.32.20.jpeg` to `public/images/buyate-logo.jpeg`

### Design approach

- Keep the existing warm cream/charcoal palette (`--landing-*` tokens)
- Keep dot-grid backgrounds, white cards with subtle borders, pill buttons
- Add DM Serif Display for large headings (serif feel requested)
- Status badges: green (concluida), blue (em_andamento), gray (pendente), red (impedida)
- Phase colors: blue (planning), purple (development), orange (quality), green (delivery)
- Mobile-first, responsive grid layouts
- Progress bars use the existing `Progress` component with color overrides

### Route structure

```text
/                    → Imperius landing (list of projects)
/projects/buyate     → Buyate project page
```

### Technical notes

- No database changes needed — all data is mocked client-side for now
- The mock data structure matches the provided interfaces exactly, ready for future API integration
- Existing AssetWise routes (`/assets`, `/employees`, `/settings`, etc.) will remain in the codebase but won't be linked from the new landing page
- The `getProject` function is designed so swapping to `fetch()` later requires changing only that function

