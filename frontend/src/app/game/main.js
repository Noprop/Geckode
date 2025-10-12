import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import MainMenu from './scenes/MainMenu';
import * as Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';
// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 400,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [Boot, Preloader, MainMenu, Game, GameOver],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
        },
    },
};
const StartGame = (parent) => {
    console.log('parent: ', parent);
    return new Phaser.Game(Object.assign(Object.assign({}, config), { parent }));
};
export default StartGame;
