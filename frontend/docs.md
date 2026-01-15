# Geckode Frontend Documentation

A visual block-based programming environment for creating games with Phaser 3, inspired by Scratch and MakeCode.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **State Management:** Zustand
- **Visual Programming:** Blockly
- **Game Engine:** Phaser 3
- **Styling:** Tailwind CSS 4
- **HTTP Client:** Axios

---

## Directory Structure

```
frontend/src/
├── app/                    # Next.js App Router pages
│   ├── (default)/          # Public layout (header, navigation)
│   │   ├── login/
│   │   ├── register/
│   │   ├── projects/
│   │   └── organizations/
│   └── (editor)/           # Editor layout (minimal chrome)
│       └── projects/[projectID]/
├── blockly/                # Blockly configuration & custom blocks
│   ├── blocks/             # Custom block definitions
│   ├── toolbox.ts          # Toolbox categories
│   ├── theme.ts            # Custom Geckode theme
│   └── starterWorkspace.ts # Default blocks for new projects
├── components/             # React components
│   ├── ui/                 # Reusable UI primitives
│   ├── icons/              # SVG icon components
│   ├── BlocklyEditor.tsx   # Blockly workspace wrapper
│   ├── PhaserContainer.tsx # Phaser game wrapper
│   ├── ProjectView.tsx     # Main editor orchestrator
│   ├── SpriteBox.tsx       # Sprite property panel
│   └── SpriteModal.tsx     # Sprite library picker
├── contexts/               # React context providers
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and API
│   └── api/                # Backend API client
├── phaser/                 # Phaser configuration & scenes
│   ├── scenes/             # Game scenes
│   └── EventBus.ts         # React-Phaser communication
├── providers/              # App-level providers
└── stores/                 # Zustand stores
    └── editorStore.ts      # Global editor state
```

---

## Core Architecture

### Component Hierarchy

```
App Layout
└── ProjectView (main editor container)
    ├── BlocklyEditor (left panel)
    │   └── Blockly.WorkspaceSvg
    ├── PhaserContainer (right panel, top)
    │   └── Phaser.Game → MainMenu scene
    └── SpriteEditor (right panel, bottom)
        ├── Sprite property controls
        └── Sprite thumbnail grid
```

### Data Flow

1. **User creates blocks** → Blockly workspace stores block hierarchy
2. **Auto-compile triggered** → Workspace change listener calls `scheduleConvert()` with 400ms debounce
3. **Code generation** → `javascriptGenerator.workspaceToCode()` converts blocks to JavaScript
4. **Execution** → Generated code passed to `MainMenu.runScript()` for sandboxed execution (unless paused)
5. **Game updates** → Phaser scene renders changes, emits events via EventBus
6. **State sync** → React components update via Zustand store subscriptions

---

## State Management (Zustand)

### editorStore.ts

Central store for editor state. Accessed via `useEditorStore()`.

```typescript
interface EditorState {
  // Refs to imperative handles
  phaserRef: PhaserRefValue | null;
  blocklyRef: BlocklyEditorHandle | null;

  // Project state
  projectId: number | null;
  projectName: string;
  spriteInstances: SpriteInstance[];
  phaserState: PhaserExport | null;

  // UI state
  canUndo: boolean;
  canRedo: boolean;
  isConverting: boolean;          // True while auto-convert is pending/running
  isPaused: boolean;              // Game execution paused state

  // Actions
  generateCode(): void;           // Convert blocks → execute in Phaser
  scheduleConvert(): void;        // Debounced auto-convert trigger
  cancelScheduledConvert(): void; // Cancel pending auto-convert
  saveProject(snackbar): void;    // Persist to backend
  undoWorkspace(): void;
  redoWorkspace(): void;
  updateUndoRedoState(): void;
  togglePause(): void;            // Toggle game pause state
}
```

**Key patterns:**
- Store holds refs to both Blockly and Phaser instances
- Actions use `get()` to access fresh state (avoids stale closures)
- `spriteInstances` array tracks sprites with their Blockly block IDs

---

## Blockly Integration

### Custom Blocks

Located in `blockly/blocks/`. Each file defines block JSON and JavaScript generator.

| Category | Blocks | Purpose |
|----------|--------|---------|
| `sprites.ts` | `createSprite`, `setProperty`, `changeProperty`, `getProperty` | Sprite manipulation |
| `events.ts` | `onStart`, `onUpdate` | Game lifecycle hooks |
| `input.ts` | `keyPressed` | Keyboard input detection |
| `development.ts` | `runJS` | Raw JavaScript execution |

### Block → JavaScript Flow

```typescript
// Block definition (sprites.ts)
Blockly.defineBlocksWithJsonArray([{
  type: 'createSprite',
  message0: 'create sprite %1 at x: %2 y: %3',
  args0: [/* field definitions */],
  // ...
}]);

// Generator (same file)
javascriptGenerator.forBlock['createSprite'] = function(block) {
  const spriteName = block.getFieldValue('SPRITE_NAME');
  const x = javascriptGenerator.valueToCode(block, 'X', Order.ATOMIC) || '0';
  const y = javascriptGenerator.valueToCode(block, 'Y', Order.ATOMIC) || '0';
  return `const ${spriteName} = scene.physics.add.sprite(${x}, ${y}, 'star');\n`;
};
```

### Workspace Events

BlocklyEditor attaches change listeners for:
- **Undo/redo state** → Updates `canUndo`/`canRedo` in store
- **Block deletion** → Removes associated sprites from game
- **Auto-convert** → Triggers debounced code generation on block changes

```typescript
workspace.addChangeListener((event) => {
  if (event.isUiEvent) return;
  useEditorStore.getState().updateUndoRedoState();

  // Auto-convert for code-affecting changes
  if (!event.recordUndo) return;
  const convertableEvents = [
    Blockly.Events.BLOCK_CREATE,
    Blockly.Events.BLOCK_DELETE,
    Blockly.Events.BLOCK_MOVE,
    Blockly.Events.BLOCK_CHANGE,
    Blockly.Events.VAR_CREATE,
    Blockly.Events.VAR_DELETE,
    Blockly.Events.VAR_RENAME,
  ];
  if (convertableEvents.includes(event.type)) {
    useEditorStore.getState().scheduleConvert();
  }
});
```

### Auto-Compile System

Blocks are automatically compiled to JavaScript and executed in Phaser when the workspace changes:

1. **Change detection** → Workspace listener filters for code-affecting events
2. **Debounce** → 400ms delay to batch rapid changes (e.g., dragging blocks)
3. **Loading state** → `isConverting` set to `true` immediately, shows spinner overlay
4. **Execution** → `generateCode()` called after debounce, converts blocks and runs in Phaser
5. **Completion** → `isConverting` reset to `false`, overlay hidden

```typescript
// Debounce configuration in editorStore.ts
const DEBOUNCE_MS = 400;

scheduleConvert: () => {
  set({ isConverting: true });
  if (convertTimeoutId) clearTimeout(convertTimeoutId);
  convertTimeoutId = setTimeout(() => {
    generateCode();
    set({ isConverting: false });
  }, DEBOUNCE_MS);
}
```

### Toolbox Configuration

Defined in `blockly/toolbox.ts`. Categories:
- Events (green)
- Sprites (blue)
- Input (orange)
- Variables (custom dynamic category)
- Development (gray)

---

## Phaser Integration

### Configuration

`phaser/phaserConfig.ts`:
- Canvas size: 480×360px
- Physics: Arcade (no gravity)
- Scenes: Boot → Preloader → MainMenu → Game → GameOver

### Scene Lifecycle

**MainMenu** is the primary editing scene. Key methods:

```typescript
class MainMenu extends Scene {
  // Called by React to add editor sprites
  addSpriteFromEditor(id, x, y, texture): Sprite

  // Called by React to update sprite properties
  updateEditorSprite(id, props): void

  // Executes generated Blockly code
  async runScript(code: string): Promise<void>
}
```

### runScript() Sandbox

Generated code runs in a controlled context:

```typescript
const ctx = {
  api: this.buildAPI(),    // Safe game API (moveBy, createPlayer, wait, etc.)
  scene: this,             // Scene reference
  phaser: Phaser,          // Phaser library
  console: console,        // Logging
};

const fn = new AsyncFunction(...argNames, wrappedCode);
await fn(...argValues);
```

### React-Phaser Communication

**EventBus** (`phaser/EventBus.ts`) bridges React and Phaser:

```typescript
// Phaser emits when scene ready
EventBus.emit('current-scene-ready', scene);

// React listens
EventBus.on('current-scene-ready', (scene) => {
  ref.current.scene = scene;
});

// Sprite movement events
EventBus.emit('editor-sprite-moved', { id, x, y });
```

### PhaserContainer Component

Wraps Phaser game instance in React:
- Uses `useLayoutEffect` for early initialization
- Exposes `{ game, scene }` via `useImperativeHandle`
- Manages keyboard focus/blur for input handling
- Container: 484×360px with rounded border
- **Loading overlay** → Shows spinner when `isConverting` is true
- **Pause overlay** → Dims canvas when `isPaused` is true

```typescript
// Overlay renders when converting or paused
{(isConverting || isPaused) && (
  <div className="absolute inset-0 bg-black/40">
    {isConverting && <Spinner />}
  </div>
)}
```

---

## Sprite System

### Sprite Lifecycle

1. **Creation:** User drags sprite from SpriteModal onto canvas
2. **Registration:**
   - Texture loaded via `scene.textures.addImage()`
   - Phaser sprite created via `scene.addSpriteFromEditor()`
   - Blockly block created and attached to `onStart`
   - Entry added to `spriteInstances` array
3. **Updates:** Property changes update both Phaser sprite and Blockly block fields
4. **Deletion:** Removing block triggers sprite cleanup via workspace listener

### SpriteInstance Type

```typescript
interface SpriteInstance {
  id: string;              // Unique ID (timestamp-based)
  label: string;           // Display name
  texture: string;         // Phaser texture key
  name: string;    // Block variable name
  x: number;
  y: number;
  blockId: string;         // Associated Blockly block
}
```

### SpriteBox Component

Property panel for selected sprite:
- Variable name input
- X/Y position inputs
- Visibility toggle (Show/Hide)
- Size slider (1-1000%)
- Direction input (-180° to 180°)
- Sprite thumbnail grid with selection

---

## Backend API Interface

### Configuration

Base URL: `http://localhost:8000/api/` (configured in `lib/api/axios.ts`)

Authentication: Session-based with CSRF token
- CSRF token read from cookie and sent via `X-CSRFToken` header
- Credentials included via `withCredentials: true`

### API Pattern

Uses factory pattern in `lib/api/base.ts`:

```typescript
const projectsApi = createBaseApi<Project, ProjectPayload, ProjectFilters>({
  baseUrl: 'projects/'
})({
  groups: createBaseApi<ProjectGroup, ...>({ baseUrl: 'project-groups/' })(),
  collaborators: (id) => createBaseApi<...>({ baseUrl: `projects/${id}/collaborators/` })(),
});

// Usage:
projectsApi.list()                    // GET /projects/
projectsApi.create(data)              // POST /projects/
projectsApi(id).get()                 // GET /projects/{id}/
projectsApi(id).update(data)          // PATCH /projects/{id}/
projectsApi(id).delete()              // DELETE /projects/{id}/
projectsApi(id).collaborators.list()  // GET /projects/{id}/collaborators/
```

### Available APIs

| API | Endpoints | Purpose |
|-----|-----------|---------|
| `authApi` | `login`, `logout`, `getUserDetails` | Authentication |
| `projectsApi` | CRUD + groups, collaborators | Project management |
| `organizationsApi` | CRUD + members, invitations, banned, projects | Organization management |

### Project Save Payload

```typescript
interface ProjectPayload {
  name: string;
  blocks: object;           // Blockly.serialization.workspaces.save()
  game_state: PhaserExport; // Player position, game objects
  sprites: SpriteInstance[];
}
```

---

## Routes

### Public Routes `(default)` Layout

| Route | Page | Purpose |
|-------|------|---------|
| `/login` | Login form | User authentication |
| `/register` | Registration form | New user signup |
| `/projects` | Project list | User's projects |
| `/organizations` | Organization list | User's organizations |
| `/organizations/[id]/projects` | Org projects | Organization projects |
| `/organizations/[id]/settings` | Org settings | Organization management |

### Editor Routes `(editor)` Layout

| Route | Page | Purpose |
|-------|------|---------|
| `/` | New project | Create new project |
| `/projects/[id]` | Edit project | Main editor view |

---

## Key Components

### BlocklyEditor.tsx

Wraps Blockly workspace:
- Injects Blockly into DOM with custom theme
- Registers custom blocks and toolbox
- Handles variable creation modal
- Exposes `getWorkspace()` via ref
- Custom zoom control icons

### ProjectView.tsx

Main editor orchestrator:
- Fetches project data on mount
- Manages sprite instances state
- Handles drag-drop sprite addition
- Coordinates Blockly and Phaser
- View toggle (blocks/sprites)

### SpriteModal.tsx

Sprite library picker:
- Tabs: Characters, Animals, Fantasy, Food, Sports, Things
- Search/filter functionality
- Drag-to-add interaction
- Base64 image loading

### EditorFooter.tsx

Editor toolbar:
- Undo/Redo buttons
- Save button
- **Play/Stop toggle** → Pauses/resumes game execution via `togglePause()`
  - Play icon (▶) when paused, Stop icon (■) when running
  - Sets `game.isPaused` on the Phaser game instance
- Project name display

---

## Styling

### Tailwind Configuration

Custom colors defined in globals.css:
- `--primary-green`: #48A237
- `--dark-*`: Dark mode colors
- Custom utility classes for scrollbar hiding

### Theme

Blockly uses custom "Geckode" theme (`blockly/theme.ts`):
- Custom block colors per category
- Zelos renderer for modern appearance
- Grid with 50px spacing

---

## Development Notes

### Adding a New Block Type

1. Define block JSON in `blockly/blocks/<category>.ts`
2. Add JavaScript generator in same file
3. Add to toolbox in `blockly/toolbox.ts`
4. Register in `blockly/index.ts`

### Adding a New API Endpoint

1. Create types in `lib/types/api/<resource>/`
2. Create handler in `lib/api/handlers/<resource>.ts`
3. Use `createBaseApi` factory for standard CRUD

### Testing Code Execution

Generated code is logged to console:
```typescript
console.log('generate code()');
phaserRef.scene?.runScript(code);
```

---

## File Quick Reference

| File | Purpose |
|------|---------|
| `stores/editorStore.ts` | Global state, code generation, auto-compile, pause control |
| `components/ProjectView.tsx` | Main editor layout, sprite management |
| `components/BlocklyEditor.tsx` | Blockly workspace wrapper, auto-compile trigger |
| `components/PhaserContainer.tsx` | Phaser game wrapper, loading/pause overlay |
| `components/EditorFooter.tsx` | Toolbar with undo/redo, save, play/stop |
| `phaser/scenes/MainMenu.ts` | Primary game scene, runScript() |
| `phaser/EventBus.ts` | React-Phaser event bridge |
| `blockly/blocks/*.ts` | Custom block definitions |
| `lib/api/base.ts` | API factory pattern |
| `lib/api/axios.ts` | HTTP client with CSRF |
