# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Behavior Guidelines

- Before starting any task that touches more than one file, summarize 
  your plan in bullet points and wait for confirmation.
- Use TypeScript's strict mode conventions throughout. No `any` types 
  without a comment explaining why.
- When adding new functions, include a JSDoc comment with param types 
  and return type.
- Keep responses short. No preamble. Get to the output.
- If a task is ambiguous, ask one clarifying question — not five.

# Hard Rules

- Don't install new npm packages without asking first. List what you'd 
  install and why, then wait.
- Don't delete files. Mark them as deprecated with a comment instead, 
  and flag them for manual removal.
- Don't try to run `bun run dev`.

## Project Overview

Interview technical challenge: a React + TypeScript SPA that displays the original 151 Pokémon (name, sprite, type(s)) with filtering by type and name.

**Stack:** React 19, TypeScript, Redux Toolkit (RTK Query), Vite, Bun

## Commands

```bash
bun install        # install dependencies
bun run build      # production build (tsc + vite build)
bun run preview    # preview production build locally
bun run lint       # ESLint
bun run tsc --noEmit  # type-check without emitting
```