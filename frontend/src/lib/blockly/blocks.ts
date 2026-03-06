import * as Blockly from "blockly/core";
import { createRoot, type Root } from "react-dom/client";
import { createElement } from "react";
import { useGeckodeStore } from "@/stores/geckodeStore";
import { UserIcon } from "@/components/ui/UserIcon";
import type { PublicUser } from "@/lib/types/api/users";

type BlockPresence = {
  clientId: number;
  colourHex: string;
  user?: PublicUser;
};

const presenceByBlockId = new Map<string, BlockPresence>();
const hoverHandlersByBlockId = new Map<
  string,
  { enter: (e: PointerEvent) => void; leave: (e: PointerEvent) => void }
>();

let lastWorkspace: Blockly.Workspace | null = null;
let presenceTooltipEl: HTMLDivElement | null = null;
let tooltipReactRoot: Root | null = null;
let tooltipHideTimeout: number | null = null;
let tooltipBlockId: string | null = null;

const ensurePresenceTooltip = () => {
  if (presenceTooltipEl) return presenceTooltipEl;

  const el = document.createElement("div");
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-label", "Block presence");
  el.style.position = "fixed";
  el.style.zIndex = "9999";
  el.style.display = "none";
  el.style.pointerEvents = "none";
  el.style.maxWidth = "260px";
  el.style.borderRadius = "12px";
  el.style.border = "1px solid var(--border, rgba(255, 255, 255, 0.1))";
  el.style.background = "var(--background)";
  el.style.color = "var(--foreground)";
  el.style.padding = "10px 12px";
  el.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.35)";
  el.style.backdropFilter = "blur(8px)";
  el.style.setProperty("-webkit-backdrop-filter", "blur(8px)");
  el.style.transform = "translate3d(0,0,0)";

  const mountPoint = document.createElement("div");
  el.appendChild(mountPoint);

  document.body.appendChild(el);
  presenceTooltipEl = el;
  tooltipReactRoot = createRoot(mountPoint);
  return el;
};

function getStrokeTarget(block: Blockly.BlockSvg): SVGElement | null {
  const path = (block as any)?.pathObject?.svgPath as SVGElement | undefined;
  if (path) return path;
  return (block.getSvgRoot?.() as unknown as SVGElement | null) ?? null;
}

function applyStroke(block: Blockly.BlockSvg, colourHex: string | null) {
  const target = getStrokeTarget(block);
  if (!target) return;

  if (!colourHex) {
    target.style.stroke = "";
    target.style.strokeWidth = "";
    return;
  }

  target.style.stroke = colourHex;
  target.style.strokeWidth = "4px";
}

const renderPresenceTooltip = (presence: BlockPresence) => {
  const el = ensurePresenceTooltip();
  if (tooltipReactRoot) {
    tooltipReactRoot.render(
      createElement(UserIcon, {
        user: presence.user,
        variant: "card",
        accentColor: presence.colourHex,
        size: "md",
      }),
    );
  }
  return el;
};

const positionTooltipNearRect = (el: HTMLDivElement, rect: DOMRect) => {
  const margin = 10;
  const preferredLeft = rect.right + 10;
  const preferredTop = rect.top;

  el.style.left = `${Math.max(margin, Math.min(preferredLeft, window.innerWidth - margin))}px`;
  el.style.top = `${Math.max(margin, Math.min(preferredTop, window.innerHeight - margin))}px`;

  // Clamp after layout since tooltip size is unknown pre-render.
  requestAnimationFrame(() => {
    const r = el.getBoundingClientRect();
    const left = Math.max(margin, Math.min(r.left, window.innerWidth - r.width - margin));
    const top = Math.max(margin, Math.min(r.top, window.innerHeight - r.height - margin));
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
  });
};

const showPresenceTooltipForBlockId = (blockId: string) => {
  const presence = presenceByBlockId.get(blockId);
  if (!presence) return;

  const el = renderPresenceTooltip(presence);
  el.style.display = "block";
  tooltipBlockId = blockId;

  const block = (lastWorkspace?.getBlockById?.(blockId) ?? null) as Blockly.BlockSvg | null;

  // Prefer the block's own outline path. Using the SVG root can include
  // connected children, which makes the tooltip "float" away from the selected block.
  const strokeTarget = block ? getStrokeTarget(block) : null;
  const rect = strokeTarget?.getBoundingClientRect?.() ?? block?.getSvgRoot?.()?.getBoundingClientRect?.() ?? null;
  if (rect) positionTooltipNearRect(el, rect);
};

const hidePresenceTooltip = () => {
  if (!presenceTooltipEl) return;
  presenceTooltipEl.style.display = "none";
  tooltipBlockId = null;
};

export const applyClientBlockProperties = (
  workspace: Blockly.Workspace,
  presence: BlockPresence,
  oldBlockId?: string | null,
  blockId?: string | null,
) => {
  lastWorkspace = workspace;
  const canEditProject = useGeckodeStore.getState().canEditProject;

  if (oldBlockId) {
    const block = workspace.getBlockById(oldBlockId) as Blockly.BlockSvg;
    if (!block) return;
    block.setMovable(canEditProject);

    const existing = presenceByBlockId.get(oldBlockId);
    // Clear if we either own it, or if we have no record (stale outline).
    if (!existing || existing.clientId === presence.clientId) {
      if (existing) presenceByBlockId.delete(oldBlockId);

      const handlers = hoverHandlersByBlockId.get(oldBlockId);
      const svgRoot = block.getSvgRoot?.();
      if (handlers && svgRoot) {
        svgRoot.removeEventListener("pointerenter", handlers.enter);
        svgRoot.removeEventListener("pointerleave", handlers.leave);
      }
      hoverHandlersByBlockId.delete(oldBlockId);
      applyStroke(block, null);
      if (tooltipBlockId === oldBlockId) hidePresenceTooltip();
    }
  }
  if (blockId) {
    const block = workspace.getBlockById(blockId) as Blockly.BlockSvg;
    if (!block) return;
    block.setMovable(false);

    presenceByBlockId.set(blockId, presence);
    applyStroke(block, presence.colourHex);

    if (!hoverHandlersByBlockId.has(blockId)) {
      const svgRoot = block.getSvgRoot?.();
      if (svgRoot) {
        const enter = () => {
          if (tooltipHideTimeout) {
            window.clearTimeout(tooltipHideTimeout);
            tooltipHideTimeout = null;
          }
          showPresenceTooltipForBlockId(blockId);
        };
        const leave = () => {
          if (tooltipHideTimeout) window.clearTimeout(tooltipHideTimeout);
          tooltipHideTimeout = window.setTimeout(() => hidePresenceTooltip(), 120);
        };

        svgRoot.addEventListener("pointerenter", enter);
        svgRoot.addEventListener("pointerleave", leave);
        hoverHandlersByBlockId.set(blockId, { enter, leave });
      }
    }
  }
};

export const connectBlocks = (
  childBlock: Blockly.Block,
  parentBlock: Blockly.Block,
  inputName: string | undefined,
) => {
  console.log('attempting to get input', inputName, parentBlock.getInput(inputName ?? '')?.connection);
  const inputConnection = (
    inputName
      ? parentBlock.getInput(inputName)?.connection
      : parentBlock.nextConnection
  );
  const childConnection = childBlock.outputConnection || childBlock.previousConnection;
  console.log('connections being connected', inputConnection, childConnection);

  if (inputConnection && childConnection
    && inputConnection.targetConnection !== childConnection
  ) {
    inputConnection.connect(childConnection);
  }
};

export const moveBlockByCoordinates = (block: Blockly.Block, coordinates: { x?: number; y?: number; }) => {
  if (!block.getParent() && coordinates?.x !== undefined && coordinates?.y !== undefined) {
    const currCoordinates = block.getRelativeToSurfaceXY();
    block.moveBy(
      coordinates.x - currCoordinates.x,
      coordinates.y - currCoordinates.y,
    );
  }
};