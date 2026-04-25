# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interview technical challenge: a React + TypeScript SPA that displays the original 151 Pokémon (name, sprite, type(s)) with filtering by type and name.

**Planned stack:** React, TypeScript, Redux Toolkit (RTK Query), Bun

## Commands

```bash
bun install        # install dependencies
bun run dev        # start dev server (Vite)
bun run build      # production build (tsc + vite build)
bun run preview    # preview production build locally
bun run lint       # ESLint
bun run tsc --noEmit  # type-check without emitting
```

## Architecture

**State & data fetching:** RTK Query is the data layer. The plan is to pull in the Pokédex API OpenAPI spec and use RTK Query Codegen (`@rtk-query/codegen-openapi`) to generate typed hooks — avoid hand-writing API slices if codegen can cover them.

**Data scope:** Only the original 151 Pokémon are displayed. API calls should be scoped accordingly rather than fetching the full National Pokédex.

**Filtering:** Name search and type filter should be implemented client-side against the cached RTK Query data, not as additional API requests.
