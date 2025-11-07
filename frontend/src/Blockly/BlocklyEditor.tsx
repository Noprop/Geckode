"use client";

import * as Blockly from 'blockly/core';
import BlocklyComponent from "./BlocklyComponent";
import { Block, Value, Shadow, Field, Category, Button } from ".";

import { Geckode } from "./new_theme";
import { useEffect, useState } from 'react';

const BlocklyEditor = (props: any) => {
  const [hasVariables, setHasVariables] = useState(false);
  const [latestVar, setLatestVar] = useState('myVar');
  
  useEffect(() => {
    const workspace = Blockly.getMainWorkspace();

    (workspace as any).registerButtonCallback('createVariableButton', function (button: any) {
      Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace());
    });

    const updateVariableState = () => {
      const varCount = workspace.getVariableMap().getAllVariables().length;
      setHasVariables(varCount > 0);
    };

    updateVariableState();

    const onVarCreate = (event: any) => {
      if (event.type === Blockly.Events.VAR_CREATE) {
        const model: any = workspace.getVariableMap().getVariableById(event.varId);
        if (model) {
          setLatestVar(model.name);
        }
      }
      if (event.type === Blockly.Events.VAR_CREATE || event.type === Blockly.Events.VAR_DELETE) {
        updateVariableState();
      }
    };

    workspace.addChangeListener(onVarCreate);

    return () => workspace.removeChangeListener(onVarCreate);
  }, []);

  return (
    <BlocklyComponent
      renderer="zelos"
      className=""
      theme={Geckode}
      readOnly={false}
      trashcan={true}
      media={"media/"}
      move={{
        scrollbars: true,
        drag: true,
        wheel: true,
      }}
      scene={props.scene}
    />
  );
};

export default BlocklyEditor;
