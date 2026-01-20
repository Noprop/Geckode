"use client";

import { useState, useEffect } from 'react';
import { Cross2Icon, EyeOpenIcon, EyeNoneIcon } from '@radix-ui/react-icons';
import { Button } from './ui/Button';
import { useEditorStore } from '@/stores/editorStore';
import SpriteModal from './SpriteModal/SpriteModal';
import type { Sprite } from '@/blockly/spriteRegistry';
import { useSpriteStore } from '@/stores/spriteStore';
import PhaserSpriteControls from './PhaserPanel/PhaserSpriteControls';
import PhaserSpriteList from './PhaserPanel/PhaserSpriteList';
import PhaserSceneList from './PhaserPanel/PhaserSceneList';

const SpritePanel = () => {
  const [selectedSpriteId, setSelectedSpriteId] = useState<string | null>(null);
  const [selectedSprite, setSelectedSprite] = useState<Sprite | null>(null);



  const removeSpriteFromGame = useSpriteStore((state) => state.removeSpriteFromGame);
  const updateSprite = useSpriteStore((state) => state.updateSprite);
  const sprites = useSpriteStore((state) => state.spriteInstances)

  return (
    <section className="flex-1 rounded-lg bg-light-secondary p-3 text-sm shadow dark:bg-dark-secondary flex flex-col min-h-0 overflow-hidden">
      <PhaserSpriteControls />
      <div className="flex flex-1 gap-0 min-h-0 overflow-hidden">
        <PhaserSpriteList />
        <PhaserSceneList />
      </div>
      <SpriteModal />
    </section>
  );
};

export default SpritePanel;
