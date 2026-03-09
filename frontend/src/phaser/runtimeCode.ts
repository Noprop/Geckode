import type { WorkspaceOutputType } from "@/stores/slices/types";

export function buildPhaserRuntimeCodeFromOutputs(
  outputs: Array<WorkspaceOutputType | undefined>,
): string {
  const allUpdateHandlers = outputs
    .flatMap((o) => o?.updateHandlers ?? [])
    .filter(Boolean);
  const allStartHandlers = outputs
    .flatMap((o) => o?.startHandlers ?? [])
    .filter(Boolean);
  const allKeyPressHandlers = outputs
    .flatMap((o) => o?.keyPressHandlers ?? [])
    .filter(Boolean);

  const updateBody = allUpdateHandlers
    .map(
      (h) =>
        `  for (const __id of scene.getSpriteAndClones('${h?.spriteId}')) ${h?.functionName}(__id);`,
    )
    .join("\n");

  const startBody = allStartHandlers
    .map(
      (h) =>
        `  for (const __id of scene.getSpriteAndClones('${h?.spriteId}')) ${h?.functionName}(__id);`,
    )
    .join("\n");

  const keyPressBody = allKeyPressHandlers
    .map((h) => {
      const keyObj = `scene.cursors.${h?.key}`;

      let condition: string;
      if (h?.eventType === "just_pressed") {
        condition = `scene.getJustPressed(${keyObj})`;
      } else if (h?.eventType === "released") {
        condition = `scene.getJustReleased(${keyObj})`;
      } else {
        // 'pressed' - continuously held down
        condition = `${keyObj}.isDown`;
      }

      return `  if (${condition}) {
    for (const __id of scene.getSpriteAndClones('${h?.spriteId}')) ${h?.functionName}(__id);
  }`;
    })
    .join("\n");

  const updateCode = `
    scene.updateHook = () => {
      ${updateBody}
    };
  `;

  const startCode = `
    scene.startHook = () => {
      ${startBody}
    };
  `;

  const keyPressCode = `
    scene.keyPressHook = () => {
      ${keyPressBody}
    };
  `;

  return [...outputs.map((o) => o?.code), startCode, updateCode, keyPressCode].join(
    "\n\n",
  );
}

