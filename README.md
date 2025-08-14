# HelpDesk AI — Snippet & Solution Hub

A small app for tech-support workflows:
- Generate AI-powered troubleshooting steps and root-cause suggestions
- Save snippets (CRUD) with tags
- Auth-protected personal workspace

## Monorepo Layout
- `client/` – React app (Stage 1)
- `server/` – Node/Express API (Stage 2–3)

## Requirements
- Node 18+ (LTS)
- Git
- Postman

## Environments
- Local dev: http://localhost:5173 (client), http://localhost:3000 (server)
- Postman: use environment vars `base_url`, `token`

## Milestones
- [ ] Stage 1: Frontend + third-party AI API
- [ ] Stage 2: Backend + DB + validation + security
- [ ] Stage 3: React Auth + Protected routes