import { SpriteInstance } from "../spriteRegistry";
import { Block } from "@/lib/types/yjs/blocks";

export const starterWorkspace = {
  "blocks": {
    "languageVersion": 0,
    "blocks": [
      {
        "type": "onStart",
        "id": "*s1Q1ai/%1c+|#)8m_4M",
        "x": 200,
        "y": 100
      },
      {
        "type": "onUpdate",
        "id": "%3K+xv~H8}}(dKqDU0+)",
        "x": 200,
        "y": 400
      }
    ]
  }
};

export const starterSpriteWorkspaces: {sprite: SpriteInstance, blocks: Record<string, Block>}[] = [
  {
    sprite: {
      name: 'gavin',
      id: `id_${Date.now()}`,
      textureName: 'gavinDown',
      x: 50,
      y: 50,
      visible: true,
      scaleX: 1,
      scaleY: 1,
      direction: 0,
      snapToGrid: true,
      physics: {
        enabled: false,
        anchored: false,
        drag: 0.99,
        gravityY: 300,
        bounce: 0.5,
        collideWorldBounds: true,
      },
    },
    blocks: {
      "*s1Q1ai/%1c+|#)8m_4M": {
        "type": "onStart",
        "x": 200,
        "y": 100,
      },
      "%3K+xv~H8}}(dKqDU0+)": {
        "type": "onUpdate",
        "x": 200,
        "y": 400,
      },
    },
  },
];

export const starterTextures: Record<string, string> = {
  
};
