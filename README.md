# Skill Swap Platform (Preview-ready MVP)

A **previewable** local-first Skill Swap platform built with:
- Next.js (App Router)
- React + TypeScript
- D3.js

## What you can do

1. Create profile
2. Publish skills you HAVE and WANT
3. Auto-generate reciprocal matches
4. Visualize skill network graph (users + skills)

## Routes

- `/` Home
- `/publish` Create profile + publish skills
- `/matches` View auto matches
- `/graph` Skill network graph

## Project Structure

```text
app
 ├ page.tsx
 ├ publish/page.tsx
 ├ matches/page.tsx
 └ graph/page.tsx

components
 ├ SkillCard.tsx
 ├ UserCard.tsx
 ├ MatchCard.tsx
 └ SkillGraph.tsx

lib
 ├ matchEngine.ts
 └ dataStore.ts

data
 └ users.json
```

## Storage model

- Seed data: `data/users.json`
- Runtime persistence: browser `localStorage` (`skill_swap_users`)
- No backend required for preview MVP

## Run

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Graph features

- D3 force simulation
- Zoom / Pan
- Drag nodes
- Hover highlight
- Tooltip
- Search filter (user or skill)

## Future roadmap

- Multi-hop exchange (A → B → C)
- Skill-level verification
- Message + scheduling
- Backend API + database
