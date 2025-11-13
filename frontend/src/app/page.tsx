"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from 'react';
import type { DragEvent } from 'react';
import * as Blockly from 'blockly/core';
import type { Workspace } from 'blockly/core';
import BlocklyEditor, { BlocklyEditorHandle } from '@/components/BlocklyEditor';
import SpriteEditor, {
  type SpriteDragPayload,
  type SpriteInstance,
} from '@/components/SpriteEditor';
import { javascriptGenerator } from 'blockly/javascript';
import type { Game } from 'phaser';
import type MainMenu from '@/phaser/scenes/MainMenu';

const PhaserGame = dynamic(() => import('@/components/PhaserGame'), {
  ssr: false,
});

export type PhaserRef = {
  readonly game: Game;
  readonly scene: MainMenu;
} | null;

export default function Home() {
  const blocklyRef = useRef<BlocklyEditorHandle>(null);
  const phaserRef = useRef<PhaserRef | null>(null);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
  const [spriteInstances, setSpriteInstances] = useState<SpriteInstance[]>([]);
  const workspaceListenerRef = useRef<{
    workspace: Blockly.WorkspaceSvg;
    listener: (event: Blockly.Events.Abstract) => void;
  } | null>(null);

  const changeScene = () => {
    phaserRef.current?.scene.changeScene?.();
  };

  const moveSprite = () => {
    const scene = phaserRef.current?.scene;
    if (scene && scene.key === 'MainMenu') {
      try {
        scene.runScript(`

          scene.create = () => {
            scene.player = scene.physics.add.sprite(50, 300, 'star');
            scene.player.setCollideWorldBounds(true);

            scene.cursors = scene.input.keyboard.createCursorKeys();
          }

          scene.update = () => {
            scene.player.setVelocityX(0)
            scene.player.setVelocityY(0)
            const speed = 200
            if (scene.cursors.right.isDown) {
              console.log("hello45")
              scene.player.body.velocity.x += speed
            }
            if (scene.cursors.left.isDown) {
              scene.player.body.velocity.x -= speed
            }
            if (scene.cursors.up.isDown) {
              scene.player.body.velocity.y -= speed
            }
            if (scene.cursors.down.isDown) {
              scene.player.body.velocity.y += speed
            }
          }

          scene.scene.restart();
          return { done: true };
        `);
      } catch (e) {
        console.error(e);
      }

      // scene.moveLogo?.(({ x, y }: { x: number; y: number }) =>
      //   setSpritePosition({ x, y })
      // );
    }
  };

  const generateCode = () => {
    if (
      !phaserRef.current ||
      !blocklyRef.current ||
      !blocklyRef.current.getWorkspace()
    )
      return;
    const code = javascriptGenerator.workspaceToCode(
      blocklyRef.current.getWorkspace() as Workspace
    );
    console.log(code);
    phaserRef.current.scene?.runScript(code);
  };

  const workspaceDeleteHandler = useCallback(
    (event: Blockly.Events.Abstract) => {
      if (event.type !== Blockly.Events.BLOCK_DELETE) return;
      const deleteEvent = event as Blockly.Events.BlockDelete;
      if (deleteEvent.oldJson?.type !== 'createSprite') return;
      setSpriteInstances((prev) => {
        const sprite = prev.find(
          (instance) => instance.blockId === deleteEvent.blockId
        );
        if (!sprite) return prev;
        phaserRef.current?.scene?.removeEditorSprite?.(sprite.id);
        return prev.filter(
          (instance) => instance.blockId !== deleteEvent.blockId
        );
      });
    },
    []
  );

  const handleWorkspaceReady = useCallback(
    (workspace: Blockly.WorkspaceSvg) => {
      if (workspaceListenerRef.current) {
        workspaceListenerRef.current.workspace.removeChangeListener(
          workspaceListenerRef.current.listener
        );
      }
      workspace.addChangeListener(workspaceDeleteHandler);
      workspaceListenerRef.current = {
        workspace,
        listener: workspaceDeleteHandler,
      };
    },
    [workspaceDeleteHandler]
  );

  useEffect(() => {
    return () => {
      if (workspaceListenerRef.current) {
        workspaceListenerRef.current.workspace.removeChangeListener(
          workspaceListenerRef.current.listener
        );
      }
    };
  }, []);

  const attachBlockToOnStart = (
    workspace: Blockly.WorkspaceSvg,
    block: Blockly.BlockSvg
  ) => {
    const [onStartBlock] = workspace.getBlocksByType('onStart', false);
    if (!onStartBlock) return;
    const input = onStartBlock.getInput('INNER');
    const connection = input?.connection;
    if (!connection || !block.previousConnection) return;

    if (!connection.targetConnection) {
      connection.connect(block.previousConnection);
      return;
    }

    let current = connection.targetBlock();
    while (current && current.getNextBlock()) {
      current = current.getNextBlock();
    }
    current?.nextConnection?.connect(block.previousConnection);
  };

  const handleSpriteDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const payloadString = event.dataTransfer.getData('application/json');
    if (!payloadString || !blocklyRef.current || !phaserRef.current) return;

    let payload: SpriteDragPayload;
    try {
      payload = JSON.parse(payloadString) as SpriteDragPayload;
    } catch {
      console.warn('Invalid payload for sprite creation.');
      return;
    }
    if (payload.kind !== 'sprite-blueprint') return;

    const game = phaserRef.current.game;
    const scene = phaserRef.current.scene;
    const workspace =
      blocklyRef.current.getWorkspace() as Blockly.WorkspaceSvg | null;
    if (!game || !scene || !workspace || !game.canvas) return;

    const canvasRect = game.canvas.getBoundingClientRect();
    const relativeX = event.clientX - canvasRect.left;
    const relativeY = event.clientY - canvasRect.top;

    if (
      relativeX < 0 ||
      relativeY < 0 ||
      relativeX > canvasRect.width ||
      relativeY > canvasRect.height
    ) {
      return;
    }

    console.log(canvasRect.width, game.scale.width);
    console.log(canvasRect.height, game.scale.height);

    const worldX = Math.round(
      (relativeX / canvasRect.width) * game.scale.width
    );
    const worldY = Math.round(
      (relativeY / canvasRect.height) * game.scale.height
    );

    console.log(relativeX, worldX);
    console.log(relativeY, worldY);

    const safeBase = payload.texture.replace(/[^\w]/g, '') || 'sprite';
    const duplicateCount = spriteInstances.filter(
      (instance) => instance.texture === payload.texture
    ).length;
    const variableName = `${safeBase}${duplicateCount + 1}`;
    const spriteId = `sprite-${Date.now()}-${Math.round(Math.random() * 1e4)}`;

    scene.addSpriteFromEditor(payload.texture, worldX, worldY, spriteId);

    const newBlock = workspace.newBlock('createSprite') as Blockly.BlockSvg;
    newBlock.setFieldValue(variableName, 'NAME');
    newBlock.setFieldValue(payload.texture, 'TEXTURE');
    newBlock.setFieldValue(String(worldX), 'X');
    newBlock.setFieldValue(String(worldY), 'Y');
    newBlock.initSvg();
    newBlock.render();
    attachBlockToOnStart(workspace, newBlock);

    setSpriteInstances((prev) => [
      ...prev,
      {
        id: spriteId,
        label: payload.label,
        texture: payload.texture,
        variableName,
        x: worldX,
        y: worldY,
        blockId: newBlock.id,
      },
    ]);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  };

  const handleRemoveSprite = (spriteId: string) => {
    const workspace =
      blocklyRef.current?.getWorkspace() as Blockly.WorkspaceSvg | null;
    const sprite = spriteInstances.find((instance) => instance.id === spriteId);
    if (!workspace || !sprite?.blockId) return;
    const block = workspace.getBlockById(sprite.blockId);
    block?.dispose(true);
  };

  return (
    <div className="flex h-[calc(100vh-3rem)]">
      <div className="flex-1 min-h-0 min-w-0">
        <BlocklyEditor
          ref={blocklyRef}
          onWorkspaceReady={handleWorkspaceReady}
        />
      </div>

      <div className="flex flex-col p-3">
        <div
          className="rounded-xl border border-dashed border-slate-400 
                   bg-slate-900/5 p-2 dark:border-slate-600 dark:bg-slate-100/10"
          onDragOver={handleDragOver}
          onDrop={handleSpriteDrop}
        >
          <PhaserGame ref={phaserRef} />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button className="btn btn-deny" onClick={changeScene}>
            Change Scene
          </button>

          <button
            onClick={generateCode}
            className="btn btn-neutral"
            aria-label="Convert Now"
            title="Convert Now"
          >
            Convert Now
          </button>
        </div>
        <div
          className="w-max mt-6 rounded-lg border border-slate-800
                   dark:border-slate-300 p-2 text-xs"
        >
          <div className="font-medium">Sprite Position</div>
          <pre className="mt-1">{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
        </div>

        <SpriteEditor
          sprites={spriteInstances}
          onRemoveSprite={handleRemoveSprite}
        />
      </div>
    </div>
  );
}
