# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Geckode is a visual block-based programming environment for kids to create 2D games. Users drag and drop Blockly blocks that compile to JavaScript and execute in a Phaser game engine.

## Commands

### Frontend (from root or frontend/)
```bash
pnpm install              # Install dependencies
pnpm run dev              # Start dev server (localhost:3000)
pnpm run build            # Production build
pnpm run lint             # Biome check
pnpm run format           # Biome format --write
```

### Backend (from backend/)
```bash
python -m venv venv && source venv/bin/activate  # Create/activate venv
pip install -r requirements.txt                   # Install dependencies
python manage.py migrate                          # Create/update database
python manage.py runserver                        # Start server (localhost:8000)
python manage.py makemigrations                   # After model changes
```

### Root Workspace
```bash
npm run dev               # Run frontend dev server
npm run typecheck         # TypeScript check
```

## Architecture

### Monorepo Structure
- `frontend/` - Next.js 15 + React 19 app with Blockly and Phaser
- `backend/` - Django REST Framework API with Channels WebSocket support

### Frontend Tech Stack
- Next.js 15 (App Router, Turbopack)
- Blockly 12 (visual programming blocks)
- Phaser 4 RC (2D game engine)
- Zustand (state management)
- Tailwind CSS 4, Biome (linting/formatting)

### Backend Tech Stack
- Django 5.2 + Django REST Framework
- Django Channels (WebSocket support)
- SQLite (development), Session-based auth with CSRF

### Core Data Flow
1. User creates/modifies blocks in Blockly workspace
2. Workspace change listener triggers debounced `scheduleConvert()` (400ms)
3. `generateCode()` converts blocks → JavaScript via Blockly generators
4. Generated code executed in Phaser's `MainMenu.runScript()` sandbox
5. Game preview updates in real-time

### Key Frontend Files
| File | Purpose |
|------|---------|
| `stores/editorStore.ts` | Central Zustand store - project state, refs to Blockly/Phaser, auto-compile logic |
| `components/ProjectView.tsx` | Main editor layout, coordinates Blockly and Phaser |
| `components/BlocklyEditor.tsx` | Blockly workspace wrapper, change listeners |
| `components/PhaserContainer.tsx` | Phaser game wrapper with loading/pause overlays |
| `phaser/scenes/MainMenu.ts` | Primary game scene, `runScript()` execution |
| `phaser/EventBus.ts` | React-Phaser event bridge |
| `blockly/blocks/*.ts` | Custom block definitions + JavaScript generators |
| `lib/api/base.ts` | API factory pattern for backend calls |

### Route Groups
- `app/(default)/` - Public pages with header (login, register, projects, organizations)
- `app/(editor)/` - Editor layout with minimal chrome (project editing)

### Backend API Structure
- `/api/accounts/` - Auth (login, logout, user details)
- `/api/projects/` - Project CRUD + collaborators
- `/api/organizations/` - Org CRUD + members, invitations, projects

### Adding New Blockly Blocks
1. Define block JSON in `blockly/blocks/<category>.ts`
2. Add JavaScript generator in same file
3. Add to toolbox in `blockly/toolbox.ts`
4. Register in `blockly/index.ts`

### Adding New API Endpoints
1. Create types in `lib/types/api/<resource>/`
2. Create handler in `lib/api/handlers/<resource>.ts`
3. Use `createBaseApi` factory for standard CRUD operations
