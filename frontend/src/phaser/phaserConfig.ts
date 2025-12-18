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
  width: 480,
  height: 360,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: 'phaser-container',
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
  return new Phaser.Game({ ...config, parent });
};

export default StartGame;
