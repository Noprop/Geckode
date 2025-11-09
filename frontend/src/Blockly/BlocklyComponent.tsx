"use client";

import React, { useEffect, useRef } from "react";
import "blockly/blocks";
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import * as locale from "blockly/msg/en";
import "./blocks/customBlocks";
import { RenderBlocklySvg } from "./BlocklyRenderer";
import toolboxJson from "./BlocklyToolbox";

Blockly.setLocale(locale as any);

type Props = React.PropsWithChildren<
  {
    className?: string;
    scene?: any;
  } & Blockly.BlocklyOptions
>;

function BlocklyComponent(props: Props) {
  const blocklyDiv = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    // Inject once per mount; dispose on unmount.
    const { children: _children, ...rest } = props;

    const workspace = Blockly.inject(blocklyDiv.current as HTMLDivElement, {
      toolbox: toolboxJson as Blockly.utils.toolbox.ToolboxDefinition,
      sounds: false, // This temporarily removes the annoying cannot find media/delete.mp3 error
      ...rest,
    });

    workspaceRef.current = workspace;

    // rerender blockly svg for resize events
    RenderBlocklySvg();

    // Cleanup is crucial to avoid "duplicate" UIs under React 18 StrictMode.
    return () => {
      try {
        workspace.dispose();
      } catch {}
      //window.removeEventListener("resize", handleResize);
      workspaceRef.current = null;
    };
    // Intentionally run only on mount/unmount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* <div className="h-[85vh]"> */}
      <div className="flex-col w-full">
        <div ref={blocklyDiv} id="blocklyDiv" className="w-full h-full" />
      </div>
    </>
  );
}

export default BlocklyComponent;
