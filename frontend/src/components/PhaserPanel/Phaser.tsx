import { useEditorStore } from '@/stores/editorStore';
import SpritePanel from '../PhaserPanel';
import * as Blockly from 'blockly/core';
import dynamic from 'next/dynamic';
import { PlayIcon, StopIcon } from '@/components/icons';

const PhaserGame = dynamic(() => import('@/components/PhaserPanel/PhaserGame'), {
  ssr: false,
  loading: () => (
    <div
      className="bg-white dark:bg-black"
      style={{
        width: '480px',
        height: '360px',
      }}
    />
  ),
});

const Phaser = () => {
  const { isEditorScene, toggleGame } = useEditorStore();

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
          onClick={toggleGame}
          className="w-8 h-8 flex items-center justify-center rounded text-white transition-all bg-primary-green hover:bg-primary-green/90 hover:translate-y-px hover:shadow-[0_2px_0_0_#1a5c3a] active:translate-y-[3px] active:shadow-none shadow-[0_4px_0_0_#1a5c3a] cursor-pointer"
          title={isEditorScene ? 'Run Game' : 'Stop Game'}
        >
          {isEditorScene ? <PlayIcon /> : <StopIcon />}
        </button>
      </div>

      <SpritePanel />
    </>
  );
};

export default Phaser;
