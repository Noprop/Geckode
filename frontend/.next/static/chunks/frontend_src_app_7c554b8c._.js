(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/src/app/game/scenes/Boot.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Boot",
    ()=>Boot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/phaser@3.90.0/node_modules/phaser/dist/phaser.js [app-client] (ecmascript)");
'use client';
;
class Boot extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"] {
    preload() {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
        this.load.image('background', 'assets/bg.png');
    }
    create() {
        console.log('starting preloader');
        this.scene.start('Preloader');
    }
    constructor(){
        super('Boot');
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/app/game/EventBus.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventBus",
    ()=>EventBus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/phaser@3.90.0/node_modules/phaser/dist/phaser.js [app-client] (ecmascript)");
;
const EventBus = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Events"].EventEmitter();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/app/game/scenes/Game.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Game",
    ()=>Game
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$EventBus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/app/game/EventBus.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/phaser@3.90.0/node_modules/phaser/dist/phaser.js [app-client] (ecmascript)");
'use client';
;
;
class Game extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"] {
    create() {
        this.cameras.main.setBackgroundColor(0x00ff00);
        this.add.image(320, 200, 'background').setAlpha(0.5);
        this.add.text(320, 100, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'Arial Black',
            fontSize: 38,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$EventBus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventBus"].emit('current-scene-ready', this);
    }
    changeScene() {
        this.scene.start('GameOver');
    }
    constructor(){
        super('Game');
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/app/game/scenes/GameOver.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameOver",
    ()=>GameOver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$EventBus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/app/game/EventBus.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/phaser@3.90.0/node_modules/phaser/dist/phaser.js [app-client] (ecmascript)");
'use client';
;
;
class GameOver extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"] {
    create() {
        this.cameras.main.setBackgroundColor(0xff0000);
        this.add.image(512, 384, 'background').setAlpha(0.5);
        this.add.text(512, 384, 'Game Over', {
            fontFamily: 'Arial Black',
            fontSize: 64,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$EventBus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventBus"].emit('current-scene-ready', this);
    }
    changeScene() {
        this.scene.start('MainMenu');
    }
    constructor(){
        super('GameOver');
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/app/game/scenes/MainMenu.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// game/scenes/MainMenu.ts
__turbopack_context__.s([
    "default",
    ()=>MainMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/phaser@3.90.0/node_modules/phaser/dist/phaser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$EventBus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/app/game/EventBus.ts [app-client] (ecmascript)");
;
;
;
// Utility to create an async function at runtime.
const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
class MainMenu extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Scene {
    preload() {
    // Ensure you have a sprite/atlas loaded; example:
    // this.load.image('star', 'assets/star.png');
    }
    changeScene() {
        this.scene.start('Game');
    }
    create() {
        // Create a physics-enabled sprite
        this.player = this.physics.add.sprite(400, 300, 'star');
        this.player.setCollideWorldBounds(true);
        // Cursor keys
        // @ts-ignore
        this.cursors = this.input.keyboard.createCursorKeys();
        // WASD keys
        // @ts-ignore
        this.wasd = this.input.keyboard.addKeys({
            W: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Input.Keyboard.KeyCodes.W,
            A: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Input.Keyboard.KeyCodes.A,
            S: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Input.Keyboard.KeyCodes.S,
            D: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Input.Keyboard.KeyCodes.D
        });
        // Tell React which scene is active
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$EventBus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventBus"].emit('current-scene-ready', this);
    }
    /**
   * Keep your existing React contract:
   * Home.tsx calls scene.moveLogo(cb => setSpritePosition(cb))
   * We store the callback and call it whenever the sprite position changes.
   */ moveLogo(cb) {
        var // Send an initial position immediately
        _this_posCB, _this;
        this.posCB = cb;
        (_this_posCB = (_this = this).posCB) === null || _this_posCB === void 0 ? void 0 : _this_posCB.call(_this, {
            x: Math.round(this.player.x),
            y: Math.round(this.player.y)
        });
    }
    /**
   * Optional: If you already have addStar() wired from React, keep it.
   */ addStar() {
        const x = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Math.Between(50, 750);
        const y = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Math.Between(50, 550);
        this.physics.add.sprite(x, y, 'star');
    }
    update() {
        var _this_cursors_left, _this_cursors_right, _this_cursors_up, _this_cursors_down;
        if (!this.player) return;
        const speed = 200;
        // Reset velocity each frame, then set based on input
        this.player.setVelocity(0);
        const left = ((_this_cursors_left = this.cursors.left) === null || _this_cursors_left === void 0 ? void 0 : _this_cursors_left.isDown) || this.wasd.A.isDown;
        const right = ((_this_cursors_right = this.cursors.right) === null || _this_cursors_right === void 0 ? void 0 : _this_cursors_right.isDown) || this.wasd.D.isDown;
        const up = ((_this_cursors_up = this.cursors.up) === null || _this_cursors_up === void 0 ? void 0 : _this_cursors_up.isDown) || this.wasd.W.isDown;
        const down = ((_this_cursors_down = this.cursors.down) === null || _this_cursors_down === void 0 ? void 0 : _this_cursors_down.isDown) || this.wasd.S.isDown;
        if (left) this.player.setVelocityX(-speed);
        if (right) this.player.setVelocityX(speed);
        if (up) this.player.setVelocityY(-speed);
        if (down) this.player.setVelocityY(speed);
        // Normalize diagonal speed
        if ((left || right) && (up || down) && this.player.body) {
            this.player.setVelocity(this.player.body.velocity.x * 0.7071, this.player.body.velocity.y * 0.7071);
        }
        // Publish position only when it changes (avoids spamming React state)
        const px = Math.round(this.player.x);
        const py = Math.round(this.player.y);
        if ((px !== this.lastSent.x || py !== this.lastSent.y) && this.posCB) {
            this.posCB({
                x: px,
                y: py
            });
            this.lastSent = {
                x: px,
                y: py
            };
        }
    }
    buildAPI() {
        return {
            moveBy: (dx, dy)=>{
                if (!this.player) return;
                this.player.setX(this.player.x + dx);
                this.player.setY(this.player.y + dy);
            },
            addStar: ()=>this.addStar(),
            wait: (ms)=>new Promise((r)=>setTimeout(r, ms)),
            stopAll: ()=>{
                if (!this.player) return;
                this.player.setVelocity(0, 0);
            }
        };
    }
    /**
   * Execute arbitrary JS in a constrained context.
   * Example code string:
   *   "console.log('wow'); await api.wait(250); api.moveBy(50, -20);"
   */ async runScript(code) {
        this.player.setVelocity(20, 0);
        // @ts-ignore
        console.log('this.test: ', this.test);
        const ctx = {
            api: this.buildAPI(),
            scene: this,
            phaser: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            console: console
        };
        // The function receives named parameters matching keys of `ctx`.
        // It returns an awaited result of the user's script.
        const argNames = Object.keys(ctx); // ['api','scene','phaser','console']
        const argValues = Object.values(ctx);
        // Wrap user code in an async IIFE so `await` works at top level.
        const wrapped = '\n      "use strict";\n      return (async () => {\n        '.concat(code, "\n      })();\n    ");
        try {
            const fn = new AsyncFunction(...argNames, wrapped);
            const result = await fn(...argValues);
            return result;
        } catch (err) {
            // Surface a readable error back to caller/React UI
            const message = err instanceof Error ? err.message : String(err);
            console.error('[runScript error]', err);
            throw new Error("runScript failed: ".concat(message));
        }
    }
    constructor(){
        super('MainMenu'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "key", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "player", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "cursors", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "wasd", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "posCB", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "lastSent", {
            x: -1,
            y: -1
        });
        this.key = 'MainMenu';
    }
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/app/game/scenes/Preloader.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Preloader",
    ()=>Preloader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/phaser@3.90.0/node_modules/phaser/dist/phaser.js [app-client] (ecmascript)");
'use client';
;
class Preloader extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"] {
    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');
        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);
        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress)=>{
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + 460 * progress;
        });
    }
    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');
        this.load.image('logo', 'logo.png');
        this.load.image('star', 'star.png');
    }
    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        console.log('starting MainMenu');
        this.scene.start('MainMenu');
    }
    constructor(){
        super('Preloader');
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/app/game/main.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$scenes$2f$Boot$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/app/game/scenes/Boot.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$scenes$2f$Game$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/app/game/scenes/Game.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$scenes$2f$GameOver$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/app/game/scenes/GameOver.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$scenes$2f$MainMenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/app/game/scenes/MainMenu.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/phaser@3.90.0/node_modules/phaser/dist/phaser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$scenes$2f$Preloader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/app/game/scenes/Preloader.ts [app-client] (ecmascript)");
;
;
;
;
;
;
// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTO"],
    width: 640,
    height: 400,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$scenes$2f$Boot$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Boot"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$scenes$2f$Preloader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Preloader"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$scenes$2f$MainMenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$scenes$2f$Game$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Game"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$scenes$2f$GameOver$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameOver"]
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                x: 0,
                y: 0
            },
            debug: false
        }
    }
};
const StartGame = (parent)=>{
    console.log('parent: ', parent);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$phaser$40$3$2e$90$2e$0$2f$node_modules$2f$phaser$2f$dist$2f$phaser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Game"]({
        ...config,
        parent
    });
};
_c = StartGame;
const __TURBOPACK__default__export__ = StartGame;
var _c;
__turbopack_context__.k.register(_c, "StartGame");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/app/PhaserGame.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$main$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/app/game/main.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$EventBus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/app/game/EventBus.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const PhaserGame = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s(function PhaserGame(param, ref) {
    let { currentActiveScene } = param;
    _s();
    const gameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "PhaserGame.PhaserGame.useImperativeHandle": ()=>({
                game: gameRef.current,
                scene: undefined
            })
    }["PhaserGame.PhaserGame.useImperativeHandle"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "PhaserGame.PhaserGame.useLayoutEffect": ()=>{
            if (!gameRef.current) {
                gameRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$main$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("game-container");
            }
            return ({
                "PhaserGame.PhaserGame.useLayoutEffect": ()=>{
                    var _gameRef_current;
                    (_gameRef_current = gameRef.current) === null || _gameRef_current === void 0 ? void 0 : _gameRef_current.destroy(true);
                    gameRef.current = undefined;
                }
            })["PhaserGame.PhaserGame.useLayoutEffect"];
        }
    }["PhaserGame.PhaserGame.useLayoutEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PhaserGame.PhaserGame.useEffect": ()=>{
            const handler = {
                "PhaserGame.PhaserGame.useEffect.handler": (currentScene)=>{
                    currentActiveScene === null || currentActiveScene === void 0 ? void 0 : currentActiveScene(currentScene);
                    ref.current.scene = currentScene;
                }
            }["PhaserGame.PhaserGame.useEffect.handler"];
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$EventBus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventBus"].on('current-scene-ready', handler);
            return ({
                "PhaserGame.PhaserGame.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$game$2f$EventBus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventBus"].removeListener('current-scene-ready', handler);
                }
            })["PhaserGame.PhaserGame.useEffect"];
        }
    }["PhaserGame.PhaserGame.useEffect"], [
        currentActiveScene,
        ref
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "game-container"
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/PhaserGame.tsx",
        lineNumber: 37,
        columnNumber: 10
    }, this);
}, "hqMATzp41eOJwEe3IX3fPosyTHk=")), "hqMATzp41eOJwEe3IX3fPosyTHk=");
_c1 = PhaserGame;
const __TURBOPACK__default__export__ = PhaserGame;
var _c, _c1;
__turbopack_context__.k.register(_c, "PhaserGame$forwardRef");
__turbopack_context__.k.register(_c1, "PhaserGame");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/app/PhaserGame.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/frontend/src/app/PhaserGame.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=frontend_src_app_7c554b8c._.js.map