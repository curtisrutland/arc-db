# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application for an ARC Raiders game item/quest database. The project uses the App Router architecture with TypeScript, React 19, and Tailwind CSS v4.

## Development Commands

### Running the Application
```bash
npm run dev          # Start development server at http://localhost:3000
npm run build        # Create production build
npm start            # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint
```

## Architecture

### Application Structure
- **App Router**: Uses Next.js 14+ App Router with the `app/` directory structure
- **Styling**: Tailwind CSS v4 with PostCSS configuration
- **TypeScript**: Strict mode enabled with path aliases (`@/*` maps to root)

### Key Directories
- `app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with Geist font configuration
  - `page.tsx` - Home page component
  - `globals.css` - Global styles with Tailwind directives
- `data/` - Contains `dataset.json` with game data (bots, items, quests, workstations)
- `types/` - TypeScript type definitions
  - `dataset.ts` - Complete type definitions for all game entities
- `public/` - Static assets served at root path

### Data Structure
The `data/dataset.json` file contains game information with 4 main entity types:
- **bots** (17 entries): Enemy units with id, name, type, threat level, weakness, maps, XP values, and drops
- **items** (445 entries): Game items with localized names/descriptions, rarity, recipes, crafting benches, effects, and recycling info
- **quests** (66 entries): Missions with localized objectives, trader, rewards, XP, and quest dependencies
- **workstations** (9 entries): Crafting benches with upgrade levels and requirements

All type definitions are available in `types/dataset.ts`. Items, quests, and workstations use `LocalizedString` objects for multi-language support (18 languages including English, German, French, Spanish, Portuguese, Polish, Norwegian, Danish, Italian, Russian, Japanese, Chinese, Ukrainian, Korean, Turkish, Croatian, Serbian).

### Configuration Files
- `tsconfig.json` - TypeScript config with ES2017 target, strict mode, and `@/*` path alias
- `eslint.config.mjs` - ESLint config using Next.js core-web-vitals and TypeScript rules
- `next.config.ts` - Next.js configuration (minimal custom config)
- `postcss.config.mjs` - PostCSS config for Tailwind CSS v4

### Font System
The app uses Next.js font optimization with two Geist font variants:
- `Geist` (sans-serif) - Main UI font
- `Geist Mono` (monospace) - Code/monospace content

Both fonts are configured as CSS variables (`--font-geist-sans`, `--font-geist-mono`) in the root layout.
