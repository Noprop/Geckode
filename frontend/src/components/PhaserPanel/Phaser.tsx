import { useState } from 'react';
import { useEditorStore } from '@/stores/editorStore';
import * as Blockly from 'blockly/core';
import { PlayIcon, StopIcon } from '@/components/icons';
import PhaserGame from './PhaserGame';
import SpriteModal from '../SpriteModal/SpriteModal';
import SpritePosition from './SpritePosition';
import PhaserSpriteList from './PhaserSpriteList';
import PhaserSceneList from './PhaserSceneList';
import SpritePhysicsCurtain from './SpritePhysicsCurtain';

const Phaser = () => {
  const { isEditorScene, toggleEditor } = useEditorStore();
  const [isPhysicsPanelExpanded, setIsPhysicsPanelExpanded] = useState(false);

  return (
    <>
      <div
        onPointerDown={() => {
          if (typeof Blockly.hideChaff === 'function') Blockly.hideChaff();
          (document.getElementById('game-container') as HTMLElement).focus();
        }}
      >
        <PhaserGame />
      </div>

      <div className="flex items-center justify-start h-10">
        <button
          onClick={toggleEditor}
          className="w-8 h-8 flex items-center justify-center rounded text-white transition-all bg-primary-green hover:bg-primary-green/90 hover:translate-y-px hover:shadow-[0_2px_0_0_#1a5c3a] active:translate-y-[3px] active:shadow-none shadow-[0_4px_0_0_#1a5c3a] cursor-pointer"
          title={isEditorScene ? 'Run Game' : 'Edit Game'}
        >
          {isEditorScene ? <PlayIcon /> : <StopIcon />}
        </button>
      </div>

      <section className="flex-1 rounded-lg bg-light-secondary p-3 text-sm shadow dark:bg-dark-secondary flex flex-col min-h-0 overflow-hidden">
        <SpritePosition />
        <div className="relative flex-1 flex flex-col min-h-0 overflow-hidden">
          <SpritePhysicsCurtain
            isExpanded={isPhysicsPanelExpanded}
            onToggle={() => setIsPhysicsPanelExpanded((prev) => !prev)}
          />
          <div className="flex flex-1 gap-0 min-h-0 overflow-hidden">
            <PhaserSpriteList />
            <PhaserSceneList />
          </div>
        </div>
        <SpriteModal />
      </section>
    </>
  );
};

export default Phaser;
