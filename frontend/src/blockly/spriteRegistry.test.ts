import { describe, it, expect, beforeEach } from 'vitest';
import { createSpriteName, setSpriteDropdownOptions } from './spriteRegistry';

describe('createSpriteName', () => {
  beforeEach(() => {
    setSpriteDropdownOptions([]); // Reset state
  });

  it('returns the name as-is when no sprites exist', () => {
    expect(createSpriteName('hero')).toBe('hero');
  });

  it('appends "2" when name already exists', () => {
    setSpriteDropdownOptions([{ id: '1', name: 'hero' }]);
    expect(createSpriteName('hero')).toBe('hero2');
  });

  it('increments the trailing number when name with number exists', () => {
    setSpriteDropdownOptions([
      { id: '1', name: 'hero' },
      { id: '2', name: 'hero2' },
    ]);
    expect(createSpriteName('hero')).toBe('hero3');
  });
});