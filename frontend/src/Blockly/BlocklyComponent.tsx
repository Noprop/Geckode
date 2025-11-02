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
    scene?: any;
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
    props.scene.runScript(code);
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
      <div className="h-full">
        <div ref={blocklyDiv} id="blocklyDiv" className="h-[90%] w-full" />
        <div className="sticky top-0 z-10 m-2">
          <button
            onClick={generateCode}
            className="btn btn-neutral"
            aria-label="Convert Now"
            title="Convert Now"
          >
            Convert Now
          </button>
        </div>
      </div>

      {/* Toolbox; hidden but in DOM for Blockly */}
      <div className="hidden" ref={toolbox}>
        {props.children}
      </div>
    </>
  );
}

export default BlocklyComponent;
