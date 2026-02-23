import EditorScene from './scenes/EditorScene';
import GameScene from './scenes/GameScene';
import * as Phaser from 'phaser';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig

const config = {
  type: Phaser.AUTO,
  width: 256,
  height: 192,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  fps: {
    target: 60,
    forceSetTimeOut: false,
  },
  parent: 'phaser-container',
  pixelArt: true,
  backgroundColor: '#707090',
  scene: [EditorScene, GameScene],
} satisfies Phaser.Types.Core.GameConfig;

const StartGame = (parent: string | HTMLElement): Phaser.Game => {
  return new Phaser.Game({ ...config, parent });
};

export default StartGame;
