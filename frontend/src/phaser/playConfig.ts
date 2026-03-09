import * as Phaser from "phaser";
import GameScene from "./scenes/GameScene";
import { config } from "./phaserConfig";

const StartPlayGame = (parent: string | HTMLElement): Phaser.Game => {
  return new Phaser.Game({
    ...config,
    scene: [GameScene],
    parent,
  });
};

export default StartPlayGame;
