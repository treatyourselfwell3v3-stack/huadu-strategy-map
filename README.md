# huadu-strategy-map

A runnable **Next.js + TypeScript + D3.js** web app that visualizes a strategy map as an interactive network graph.

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- D3.js

## Project Structure

```text
huadu-strategy-map
│
├ package.json
├ next.config.js
├ tsconfig.json
├ next-env.d.ts
│
├ app
│   ├ layout.tsx
│   ├ page.tsx
│   └ globals.css
│
├ components
│   └ StrategyGraph.tsx
│
├ data
│   └ strategy.json
│
└ README.md
```

## Data Format

`data/strategy.json`

```json
{
  "nodes": [
    { "id": "AI" },
    { "id": "Content" },
    { "id": "Creator Economy" },
    { "id": "Micro Business" },
    { "id": "Knowledge Economy" }
  ],
  "links": [
    { "source": "AI", "target": "Content" },
    { "source": "Content", "target": "Creator Economy" },
    { "source": "AI", "target": "Micro Business" },
    { "source": "Knowledge Economy", "target": "Creator Economy" }
  ]
}
```

## Features

- D3 force simulation
- Zoom + pan
- Draggable nodes
- Node labels
- Hover highlight (node + related links)
- Tooltip on node hover

## Run Locally

```bash
npm install
npm run dev
```

Then open: `http://localhost:3000`

## Build for Production

```bash
npm run build
npm run start
```
