import { useEditorStore } from '@/stores/editorStore';
import SpritePanel from './PhaserPanel';
import * as Blockly from 'blockly/core';
import dynamic from 'next/dynamic';

const PhaserContainer = dynamic(() => import('@/components/PhaserGame'), {
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
        <PhaserContainer />
      </div>

      <div className="flex items-center justify-start h-10">
          <button
            onClick={toggleGame}
            className="w-8 h-8 flex items-center justify-center rounded text-white transition-all bg-primary-green hover:bg-primary-green/90 hover:translate-y-px hover:shadow-[0_2px_0_0_#1a5c3a] active:translate-y-[3px] active:shadow-none shadow-[0_4px_0_0_#1a5c3a] cursor-pointer"
            title={isEditorScene ? 'Run Game' : 'Stop Game'}
          >
            {isEditorScene ? (
              <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="M4 2.5a1 1 0 0 1 1.5-.85l9 5.5a1 1 0 0 1 0 1.7l-9 5.5A1 1 0 0 1 4 13.5v-11z" />
              </svg>
            ) : (
              <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <rect x="2" y="2" width="12" height="12" rx="1.5" />
              </svg>
            )}
          </button>
        </div>

      <SpritePanel />
    </>
  );
};

export default Phaser;
