// game/scenes/MainMenu.ts
import Phaser from 'phaser';
import { EventBus } from '../EventBus';
// Utility to create an async function at runtime.
const AsyncFunction = Object.getPrototypeOf(async function () { })
    .constructor;
export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
        this.lastSent = { x: -1, y: -1 };
        this.key = 'MainMenu';
    }
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
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D,
        });
        // Tell React which scene is active
        EventBus.emit('current-scene-ready', this);
    }
    /**
     * Keep your existing React contract:
     * Home.tsx calls scene.moveLogo(cb => setSpritePosition(cb))
     * We store the callback and call it whenever the sprite position changes.
     */
    moveLogo(cb) {
        var _a;
        this.posCB = cb;
        // Send an initial position immediately
        (_a = this.posCB) === null || _a === void 0 ? void 0 : _a.call(this, {
            x: Math.round(this.player.x),
            y: Math.round(this.player.y),
        });
    }
    /**
     * Optional: If you already have addStar() wired from React, keep it.
     */
    addStar() {
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(50, 550);
        this.physics.add.sprite(x, y, 'star');
    }
    update() {
        var _a, _b, _c, _d;
        if (!this.player)
            return;
        const speed = 200;
        // Reset velocity each frame, then set based on input
        this.player.setVelocity(0);
        const left = ((_a = this.cursors.left) === null || _a === void 0 ? void 0 : _a.isDown) || this.wasd.A.isDown;
        const right = ((_b = this.cursors.right) === null || _b === void 0 ? void 0 : _b.isDown) || this.wasd.D.isDown;
        const up = ((_c = this.cursors.up) === null || _c === void 0 ? void 0 : _c.isDown) || this.wasd.W.isDown;
        const down = ((_d = this.cursors.down) === null || _d === void 0 ? void 0 : _d.isDown) || this.wasd.S.isDown;
        if (left)
            this.player.setVelocityX(-speed);
        if (right)
            this.player.setVelocityX(speed);
        if (up)
            this.player.setVelocityY(-speed);
        if (down)
            this.player.setVelocityY(speed);
        // Normalize diagonal speed
        if ((left || right) && (up || down) && this.player.body) {
            this.player.setVelocity(this.player.body.velocity.x * 0.7071, this.player.body.velocity.y * 0.7071);
        }
        // Publish position only when it changes (avoids spamming React state)
        const px = Math.round(this.player.x);
        const py = Math.round(this.player.y);
        if ((px !== this.lastSent.x || py !== this.lastSent.y) && this.posCB) {
            this.posCB({ x: px, y: py });
            this.lastSent = { x: px, y: py };
        }
    }
    buildAPI() {
        return {
            moveBy: (dx, dy) => {
                if (!this.player)
                    return;
                this.player.setX(this.player.x + dx);
                this.player.setY(this.player.y + dy);
            },
            addStar: () => this.addStar(),
            wait: (ms) => new Promise((r) => setTimeout(r, ms)),
            stopAll: () => {
                if (!this.player)
                    return;
                this.player.setVelocity(0, 0);
            },
        };
    }
    /**
     * Execute arbitrary JS in a constrained context.
     * Example code string:
     *   "console.log('wow'); await api.wait(250); api.moveBy(50, -20);"
     */
    async runScript(code) {
        this.player.setVelocity(20, 0);
        // @ts-ignore
        console.log('this.test: ', this.test);
        const ctx = {
            api: this.buildAPI(),
            scene: this,
            phaser: Phaser,
            console: console, // replace with your own logger if desired
        };
        // The function receives named parameters matching keys of `ctx`.
        // It returns an awaited result of the user's script.
        const argNames = Object.keys(ctx); // ['api','scene','phaser','console']
        const argValues = Object.values(ctx);
        // Wrap user code in an async IIFE so `await` works at top level.
        const wrapped = `
      "use strict";
      return (async () => {
        ${code}
      })();
    `;
        try {
            const fn = new AsyncFunction(...argNames, wrapped);
            const result = await fn(...argValues);
            return result;
        }
        catch (err) {
            // Surface a readable error back to caller/React UI
            const message = err instanceof Error ? err.message : String(err);
            console.error('[runScript error]', err);
            throw new Error(`runScript failed: ${message}`);
        }
    }
}
