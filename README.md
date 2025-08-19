# Helpdesk AI

Generate step-by-step IT troubleshooting plans (e.g., “VPN won’t connect”), save them as **snippets**, and manage them after sign-in.

**Live site:** https://dvalerio001.github.io/helpdesk-ai/  
**Backend (HTTPS base):** https://helpdesk-ai-978s.onrender.com/api

---

## What it does

- Describe an issue → AI returns **steps, commands, risks, rationale**
- **Sign up / Sign in** (JWT stored in localStorage)
- **Save**, **list**, and **delete** your own snippets (protected routes)

## Tech

- **Frontend:** React (Vite), React Router, Fetch API, plain CSS
- **Backend:** Node.js, Express, MongoDB (Atlas), JWT, celebrate/Joi, Helmet
- **AI model:** OpenAI `gpt-4o-mini`
- **Hosting:** GitHub Pages (frontend), Render (backend)

## API 

Base URL: `https://helpdesk-ai-978s.onrender.com/api`  
Send `Authorization: Bearer <JWT>`

- `POST /signup` → `{ name, email, password }` → `201 Created`
- `POST /signin` → `{ email, password }` → `{ token, user }`
- `GET /users/me` → current user
- `POST /ai/generate` → `{ issue }` → AI plan
- `GET /snippets` → list your snippets
- `POST /snippets` → `{ title, content, tags? }` → `201 Created`
- `DELETE /snippets/:id` → delete a snippet

## Deploy

- **Frontend:** GitHub Pages (Vite `base: '/helpdesk-ai/'`, SPA fallback via `404.html`)
- **Backend:** Render (build: `npm install`, start: `npm start`, HTTPS domain above)
