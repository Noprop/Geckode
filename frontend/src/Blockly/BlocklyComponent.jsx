"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useRef } from "react";
import "blockly/blocks";
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import * as locale from "blockly/msg/en";
Blockly.setLocale(locale);
function BlocklyComponent(props) {
    const blocklyDiv = useRef(null);
    const toolbox = useRef(null);
    const workspaceRef = useRef(null);
    const generateCode = () => {
        if (!workspaceRef.current)
            return;
        const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
        console.log(code);
    };
    useEffect(() => {
        // Inject once per mount; dispose on unmount.
        const { initialXml, children: _children } = props, rest = __rest(props, ["initialXml", "children"]);
        const workspace = Blockly.inject(blocklyDiv.current, Object.assign({ toolbox: toolbox.current }, rest));
        workspaceRef.current = workspace;
        if (initialXml) {
            Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(initialXml), workspace);
        }
        // Cleanup is crucial to avoid "duplicate" UIs under React 18 StrictMode.
        return () => {
            try {
                workspace.dispose();
            }
            catch (_a) { }
            workspaceRef.current = null;
        };
        // Intentionally run only on mount/unmount.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (<>
      <div className="flex h-[60vh] w-full flex-col">
        <div className="sticky top-0 z-10 mb-2">
          <button onClick={generateCode} className="flex items-center justify-center rounded-lg border border-slate-300 px-2 py-1 text-xs cursor-pointer mb-2" aria-label="Convert Now" title="Convert Now">
            Convert Now
          </button>
        </div>

        <div ref={blocklyDiv} id="blocklyDiv" className="min-h-0 w-full flex-1"/>
      </div>

      {/* Toolbox; hidden but in DOM for Blockly */}
      <div className="hidden" ref={toolbox}>
        {props.children}
      </div>
    </>);
}
export default BlocklyComponent;
