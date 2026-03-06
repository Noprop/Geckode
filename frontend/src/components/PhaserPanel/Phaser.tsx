import { useCallback, useEffect, useState } from 'react';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { PlayIcon, StopIcon } from '@/components/icons';
import PhaserGame from './PhaserGame';
import SpriteModal from '../SpriteModal/SpriteModal';
import SpritePosition, { NumericField } from './SpritePosition';
import PhaserSpriteList from './PhaserSpriteList';
import PhaserSceneList from './PhaserSceneList';
import SpritePhysicsCurtain from './SpritePhysicsCurtain';
import { FIELD_DEFAULTS, resolveBlurValue } from './spritePositionUtils';

type PropertiesTab = 'general' | 'physics' | 'hitbox';

const GeneralIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="4" cy="4" r="1.5" fill="currentColor" />
    <line x1="7" y1="4" x2="15" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="8" r="1.5" fill="currentColor" />
    <line x1="1" y1="8" x2="9" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="6" cy="12" r="1.5" fill="currentColor" />
    <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PhysicsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="6" cy="8" r="2.75" stroke="currentColor" strokeWidth="1.25" />
    <path
      d="M8.75 8h6M13.5 6.25l2.25 1.75-2.25 1.75"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HitboxIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
  </svg>
);

const TAB_ICONS: Record<PropertiesTab, React.ReactNode> = {
  general: <GeneralIcon />,
  physics: <PhysicsIcon />,
  hitbox: <HitboxIcon />,
};

const TABS: { id: PropertiesTab; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'physics', label: 'Physics' },
  { id: 'hitbox', label: 'Hitbox' },
];

const Phaser = () => {
  const { isEditorScene, toggleEditor } = useGeckodeStore();
  const [activeTab, setActiveTab] = useState<PropertiesTab>('general');

  const selectedSpriteId = useGeckodeStore((s) => s.selectedSpriteId);
  const selectedSprite = useGeckodeStore((s) =>
    s.selectedSpriteId !== null
      ? s.spriteInstances.find((i) => i.id === s.selectedSpriteId) ?? null
      : null,
  );
  const updateSpriteInstance = useGeckodeStore((s) => s.updateSpriteInstance);
  const canEditProject = useGeckodeStore((s) => s.canEditProject);
  const disabled = !selectedSprite || !canEditProject;

  const [directionValue, setDirectionValue] = useState(
    String(selectedSprite?.direction ?? FIELD_DEFAULTS.direction),
  );

  useEffect(() => {
    setDirectionValue(String(selectedSprite?.direction ?? FIELD_DEFAULTS.direction));
  }, [selectedSprite]);

  const handleBlurDirection = useCallback(() => {
    if (selectedSpriteId === null || !selectedSprite) return;
    const finalValue = resolveBlurValue(directionValue, 'direction', FIELD_DEFAULTS.direction);
    if (selectedSprite.direction !== finalValue) {
      updateSpriteInstance(selectedSpriteId, { direction: finalValue as number });
    }
  }, [selectedSpriteId, selectedSprite, directionValue, updateSpriteInstance]);

  return (
    <div className="flex min-h-0 flex-col overflow-x-hidden" style={{ width: '500px' }}>
      <PhaserGame />

      <div className="flex flex-col flex-1 min-h-0 w-[480px] mx-auto">
        {/* Play/stop button + tab strip */}
        <div className="flex items-end h-10 gap-2 mt-1">
          <button
            onClick={toggleEditor}
            className="shrink-0 mb-1 w-8 h-8 flex items-center justify-center rounded text-white transition-all bg-primary-green hover:bg-primary-green/90 hover:translate-y-px hover:shadow-[0_2px_0_0_#1a5c3a] active:translate-y-[3px] active:shadow-none shadow-[0_4px_0_0_#1a5c3a] cursor-pointer"
            title={isEditorScene ? 'Run Game' : 'Edit Game'}
          >
            {isEditorScene ? <PlayIcon /> : <StopIcon />}
          </button>

          <div className="flex items-end gap-1 flex-1 min-w-0 border-b-2 border-slate-300 dark:border-slate-600">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-1 flex items-center justify-center gap-2 px-4 py-1.5 rounded-t-lg
                    text-sm font-medium transition-colors cursor-pointer select-none border
                    ${isActive
                      ? 'bg-primary-green text-white border-primary-green -mb-[2px]'
                      : 'bg-transparent text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-600 border-b-0 hover:text-slate-700 dark:hover:text-slate-200'
                    }
                  `}
                >
                  {TAB_ICONS[tab.id]}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <section className="flex-1 bg-light-secondary text-sm shadow dark:bg-dark-secondary flex flex-col min-h-0 overflow-hidden">
          <div className="py-3 border-b border-slate-300 dark:border-slate-600">
            {activeTab === 'general' && <SpritePosition />}
            {activeTab === 'physics' && <SpritePhysicsCurtain />}
            {activeTab === 'hitbox' && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center py-2">
                  <span className="text-xs text-slate-400 dark:text-slate-500">Hitbox editor coming soon</span>
                </div>
                <NumericField
                  label="Direction"
                  value={directionValue}
                  disabled={disabled}
                  min="-180"
                  max="180"
                  onChange={(v) => setDirectionValue(v)}
                  onBlur={handleBlurDirection}
                />
              </div>
            )}
          </div>

          {/* Sprite list (3/4) + Scene list (1/4) */}
          <div className="flex flex-1 gap-0 min-h-0 overflow-hidden">
            <PhaserSpriteList />
            <PhaserSceneList />
          </div>
        </section>
      </div>
      <SpriteModal />
    </div>
  );
};

export default Phaser;
