import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import MainMenu from './scenes/MainMenu';
import * as Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig

let gameViewWidth : number = window.innerWidth * 0.4;
let gameViewHeight : number = gameViewWidth * 9 / 16

const config = {
  type: Phaser.AUTO,
  width: gameViewWidth,
  height: gameViewHeight,
  parent: 'game-container',
  backgroundColor: '#707090',
  scene: [Boot, Preloader, MainMenu, Game, GameOver],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
} satisfies Phaser.Types.Core.GameConfig;

const StartGame = (parent: string | HTMLElement): Phaser.Game => {
  console.log('parent: ', parent);
  return new Phaser.Game({ ...config, parent });
};

export default StartGame;
