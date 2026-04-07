# Skill Swap Platform (huadu-strategy-map)

A local-first MVP built with **Next.js + React + TypeScript + D3**.

Users can:
- create a profile
- publish skills they HAVE and WANT
- get automatic reciprocal matches
- view an interactive skill network graph

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

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

## Data Model

`data/users.json`

- `id`: user id
- `name`: display name
- `have`: skill array the user can teach
- `want`: skill array the user wants to learn

## Matching Logic

In `lib/matchEngine.ts`:

A matches B if:
- A has a skill B wants
- B has a skill A wants

Returns reciprocal exchange pairs for display on `/matches`.

## Skill Graph

`/graph` renders a D3 force graph:
- node types: user, skill
- edges: `HAVE`, `WANT`
- supports zoom, pan, drag, hover highlight, tooltip

## Future Roadmap

- multi-hop exchange suggestions (A → B → C)
- trust score / reputation
- in-app chat and scheduling
- backend persistence (DB + API)
