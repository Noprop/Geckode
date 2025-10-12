'use client';
import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
export class Game extends Scene {
    constructor() {
        super('Game');
    }
    create() {
        this.cameras.main.setBackgroundColor(0x00ff00);
        this.add.image(320, 200, 'background').setAlpha(0.5);
        this.add
            .text(320, 100, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'Arial Black',
            fontSize: 38,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center',
        })
            .setOrigin(0.5)
            .setDepth(100);
        EventBus.emit('current-scene-ready', this);
    }
    changeScene() {
        this.scene.start('GameOver');
    }
}
