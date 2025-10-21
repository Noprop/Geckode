"use client";

import React, { useEffect, useRef } from "react";
import "blockly/blocks";
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import * as locale from "blockly/msg/en";
import "./blocks/customBlocks";

Blockly.setLocale(locale as any);

type Props = React.PropsWithChildren<
  {
    initialXml?: string;
    className?: string;
  } & Blockly.BlocklyOptions
>;

function BlocklyComponent(props: Props) {
  const blocklyDiv = useRef<HTMLDivElement | null>(null);
  const toolbox = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  const generateCode = () => {
    if (!workspaceRef.current) return;
    const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
    console.log(code);
  };

  useEffect(() => {
    // Inject once per mount; dispose on unmount.
    const { initialXml, children: _children, ...rest } = props;

    const workspace = Blockly.inject(blocklyDiv.current as HTMLDivElement, {
      toolbox: toolbox.current as HTMLDivElement,
      ...rest,
    });

    workspaceRef.current = workspace;

    if (initialXml) {
      Blockly.Xml.domToWorkspace(
        Blockly.utils.xml.textToDom(initialXml),
        workspace
      );
    }

    // Cleanup is crucial to avoid "duplicate" UIs under React 18 StrictMode.
    return () => {
      try {
        workspace.dispose();
      } catch {}
      workspaceRef.current = null;
    };
    // Intentionally run only on mount/unmount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <>
      <div className="flex h-[60vh] w-full flex-col">
        <div className="sticky top-0 z-10 mb-2">
          <button
            onClick={generateCode}
            className="flex items-center justify-center rounded-lg border border-slate-300 px-2 py-1 text-xs cursor-pointer mb-2"
            aria-label="Convert Now"
            title="Convert Now"
          >
            Convert Now
          </button>
        </div>

        <div
          ref={blocklyDiv}
          id="blocklyDiv"
          className="min-h-0 w-full flex-1"
        />
      </div>

      {/* Toolbox; hidden but in DOM for Blockly */}
      <div className="hidden" ref={toolbox}>
        {props.children}
      </div>
    </>
  );
}

export default BlocklyComponent;
