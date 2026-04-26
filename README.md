# Pokédex

A single-page Pokédex displaying the original 151 Pokémon with live filtering by name and type. Built with React, TypeScript, Redux Toolkit (RTK Query), and Vite.

## Prerequisites

- [Bun](https://bun.sh) v1.0 or later

## Getting Started

```bash
git clone https://github.com/ethan-liles/pokedex-challenge.git
cd pokedex-challenge
bun install
bun run dev
```

Then open the URL shown in your terminal in a browser (Vite defaults to [http://localhost:5173](http://localhost:5173)).

## Other Commands

```bash
bun run build    # production build
bun run preview  # preview the production build locally
bun run lint     # run ESLint
```

## Stack

- **React 19** — UI
- **TypeScript** — type safety
- **Redux Toolkit + RTK Query** — data fetching and caching
- **Vite** — build tool and dev server
- **PokéAPI** — data source ([pokeapi.co](https://pokeapi.co))

## Design Decisions

### RTK Query for data fetching

RTK Query was chosen over a plain `fetch`/`useEffect` approach because it provides automatic caching, deduplication, and request lifecycle state (`isLoading`, `isError`) with minimal boilerplate.

Each `PokemonCard` component independently calls `useGetPokemonQuery(name)`, which drives its own fetch and renders a skeleton while loading. This gives progressive rendering — cards appear as their data arrives rather than waiting for all 151 to load before showing anything. RTK Query's cache ensures that if the same Pokémon is requested more than once, only one network request is ever made.

Filtering is split by what data is available at each stage: name filtering is applied against the list response (instant, no detail data needed), while type filtering is delegated to each card after its detail data has loaded. This keeps the parent component simple and avoids any need to coordinate state across all 151 cards centrally.
