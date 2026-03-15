import { useEffect } from 'react';
import type { SpriteType } from '@/blockly/spriteRegistry';
import { DEFAULT_SPRITE_TYPES } from '@/blockly/spriteRegistry';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { useYjs } from './useYjs';
import { getYDoc } from '@/lib/types/yjs/documents';

const SPRITE_TYPES_MAP_KEY = 'spriteTypes';

export const useSpriteTypeSync = (documentName: string) => {
  const { doc, isSynced, onSynced } = useYjs(documentName);
  const spriteTypesMap = doc.getMap<SpriteType>(SPRITE_TYPES_MAP_KEY);

  useEffect(() => {
    const handleSync = () => {
      const types: SpriteType[] = [];
      spriteTypesMap.forEach((value) => types.push(value));
      if (types.length > 0) {
        useGeckodeStore.setState({ spriteTypes: types });
      }
    };

    const observer = () => {
      const types: SpriteType[] = [];
      spriteTypesMap.forEach((value) => types.push(value));
      useGeckodeStore.setState({ spriteTypes: types });
    };

    const cleanup = onSynced(() => {
      handleSync();
      spriteTypesMap.observe(observer);
      return () => spriteTypesMap.unobserve(observer);
    });

    if (isSynced()) {
      handleSync();
      spriteTypesMap.observe(observer);
      return () => {
        cleanup();
        spriteTypesMap.unobserve(observer);
      };
    }

    return cleanup;
  }, [doc, spriteTypesMap, onSynced, isSynced]);
};

export const addSpriteTypeSync = (spriteType: SpriteType) => {
  const doc = getYDoc();
  if (!doc) return;
  const map = doc.getMap<SpriteType>(SPRITE_TYPES_MAP_KEY);
  doc.transact(() => {
    map.set(spriteType.id, spriteType);
  }, doc.clientID);
};

export const removeSpriteTypeSync = (id: string) => {
  const doc = getYDoc();
  if (!doc) return;
  const map = doc.getMap<SpriteType>(SPRITE_TYPES_MAP_KEY);
  doc.transact(() => {
    map.delete(id);
  }, doc.clientID);
};

export const renameSpriteTypeSync = (id: string, name: string) => {
  const doc = getYDoc();
  if (!doc) return;
  const map = doc.getMap<SpriteType>(SPRITE_TYPES_MAP_KEY);
  const existing = map.get(id);
  if (!existing) return;
  doc.transact(() => {
    map.set(id, { ...existing, name });
  }, doc.clientID);
};

export const seedDefaultSpriteTypes = () => {
  const doc = getYDoc();
  if (!doc) return;
  const map = doc.getMap<SpriteType>(SPRITE_TYPES_MAP_KEY);
  if (map.size > 0) return;
  doc.transact(() => {
    for (const t of DEFAULT_SPRITE_TYPES) {
      map.set(t.id, t);
    }
  }, doc.clientID);
};
