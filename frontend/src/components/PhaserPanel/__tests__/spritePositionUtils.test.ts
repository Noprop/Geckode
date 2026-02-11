import { describe, expect, it } from "vitest";
import type { SpriteInstance } from "@/blockly/spriteRegistry";
import {
  buildFormValues,
  FIELD_DEFAULTS,
  resolveBlurValue,
} from "../spritePositionUtils";

describe("resolveBlurValue", () => {
  it("returns parsed number for valid numeric input", () => {
    expect(resolveBlurValue("150", "x", 80)).toBe(150);
    expect(resolveBlurValue("-45", "direction", 90)).toBe(-45);
    expect(resolveBlurValue("1.5", "scaleX", 1)).toBe(1.5);
  });

  it("returns default for empty string", () => {
    expect(resolveBlurValue("", "x", 80)).toBe(80);
    expect(resolveBlurValue("", "scaleX", 1)).toBe(1);
  });

  it("returns default for NaN input", () => {
    expect(resolveBlurValue("abc", "x", 80)).toBe(80);
    expect(resolveBlurValue("--", "y", 64)).toBe(64);
  });

  it("returns trimmed string for name field", () => {
    expect(resolveBlurValue("  my sprite  ", "name", "Sprite")).toBe(
      "my sprite",
    );
  });

  it("returns default name for empty or whitespace-only name", () => {
    expect(resolveBlurValue("", "name", "Sprite")).toBe("Sprite");
    expect(resolveBlurValue("   ", "name", "Sprite")).toBe("Sprite");
  });
});

describe("buildFormValues", () => {
  const centerX = 100;
  const centerY = 80;

  it("returns correct values from a sprite", () => {
    const sprite: SpriteInstance = {
      id: "s1",
      name: "hero",
      textureName: "hero-walk",
      x: 200,
      y: 150,
      visible: true,
      scaleX: 2,
      scaleY: 0.5,
      direction: 180,
      snapToGrid: true,
    };
    const result = buildFormValues(sprite, centerX, centerY);
    expect(result.name).toBe("hero");
    expect(result.x).toBe("200");
    expect(result.y).toBe("150");
    expect(result.scaleX).toBe("2");
    expect(result.scaleY).toBe("0.5");
    expect(result.direction).toBe("180");
    expect(result.snapToGrid).toBe(true);
    expect(result.visible).toBe(true);
  });

  it("returns empty defaults when sprite is null", () => {
    const result = buildFormValues(null, centerX, centerY);
    expect(result.name).toBe("");
    expect(result.x).toBe("");
    expect(result.y).toBe("");
    expect(result.scaleX).toBe("");
    expect(result.scaleY).toBe("");
    expect(result.direction).toBe("");
    expect(result.snapToGrid).toBe(false);
    expect(result.visible).toBe(true);
  });

  it("uses centerX/centerY for missing x/y", () => {
    const sprite: SpriteInstance = {
      id: "s1",
      name: "hero",
      textureName: "hero-walk",
      x: undefined as unknown as number,
      y: undefined as unknown as number,
      visible: true,
      scaleX: 1,
      scaleY: 1,
      direction: 90,
      snapToGrid: false,
    };
    const result = buildFormValues(sprite, centerX, centerY);
    expect(result.x).toBe("100");
    expect(result.y).toBe("80");
  });

  it("uses numeric defaults for missing size/direction", () => {
    const sprite: SpriteInstance = {
      id: "s1",
      name: "hero",
      textureName: "hero-walk",
      x: 0,
      y: 0,
      visible: false,
      scaleX: undefined as unknown as number,
      scaleY: undefined as unknown as number,
      direction: undefined as unknown as number,
      snapToGrid: true,
    };
    const result = buildFormValues(sprite, centerX, centerY);
    expect(result.scaleX).toBe("1");
    expect(result.scaleY).toBe("1");
    expect(result.direction).toBe("90");
  });
});

describe("FIELD_DEFAULTS", () => {
  it("exposes expected default values", () => {
    expect(FIELD_DEFAULTS.name).toBe("Sprite");
    expect(FIELD_DEFAULTS.scaleX).toBe(1);
    expect(FIELD_DEFAULTS.scaleY).toBe(1);
    expect(FIELD_DEFAULTS.direction).toBe(90);
    expect(FIELD_DEFAULTS.x(80)).toBe(80);
    expect(FIELD_DEFAULTS.y(64)).toBe(64);
  });
});
