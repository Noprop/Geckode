"use client";

import * as Blockly from 'blockly/core';
import BlocklyComponent from "./BlocklyComponent";
import { Block, Value, Shadow, Field, Category, Button } from ".";

import { javascriptGenerator } from "blockly/javascript";
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
      initialXml={`
        <xml xmlns="http://www.w3.org/1999/xhtml">
          
        </xml>
      `}
      scene={props.scene}
    >
      {" "}
      {}
      <Category name="events">
        <Block type="onStart" />
        <Block type="onUpdate" />
      </Category>
      <Category name="sprites">
        <Block type="setProperty">
          <Value name="VALUE">
            <Shadow type="math_number">
              <Field name="NUM">0</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="changeProperty">
          <Value name="VALUE">
            <Shadow type="math_number">
              <Field name="NUM">0</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="getProperty" />
      </Category>
      <Category name="input">
        <Block type="keyPressed" />
      </Category>
      <Category name="control">
        <Block type="controls_if">
          <Value name="IF0">
            <Shadow type="logic_boolean">
              <Field name="BOOL">TRUE</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="controls_ifelse" />
        <Block type="logic_compare">
          <Value name="A">
            <Shadow type="math_number">
              <Field name="NUM">'0'</Field>
            </Shadow>
          </Value>
          <Value name="B">
            <Shadow type="math_number">
              <Field name="NUM">'0'</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="logic_operation">
          <Field name="OP">AND</Field>
        </Block>
        <Block type="logic_operation">
          <Field name="OP">OR</Field>
        </Block>
        <Block type="logic_negate" />
        <Block type="logic_boolean" />
      </Category>
      <Category name="math">
        <Block type="math_number" />
        <Block type="math_arithmetic">
          <Value name="A">
            <Shadow type="math_number">
              <Field name="NUM">0</Field>
            </Shadow>
          </Value>
          <Value name="B">
            <Shadow type="math_number">
              <Field name="NUM">0</Field>
            </Shadow>
          </Value>
        </Block>
      </Category>
      <Category name="variables">
        <Button text="Create variable" callbackKey="createVariableButton"></Button>
        {hasVariables ? (
          <>
            <Block type="variables_get">
              <Field name="VAR">{latestVar}</Field>
            </Block>
            <Block type="variables_set">
              <Field name="VAR">{latestVar}</Field>
            </Block>
          </>
        ) : null}
      </Category>
      <Block type="logic_compare" />
      <Block type="logic_operation" />
      <Block type="controls_repeat_ext">
        <Value name="TIMES">
          <Shadow type="math_number">
            <Field name="NUM">20</Field>
          </Shadow>
        </Value>
      </Block>
      <Block type="logic_operation" />
      <Block type="logic_negate" />
      <Block type="logic_boolean" />
      <Block type="logic_null" disabled="true" />
      <Block type="logic_ternary" />
      <Block type="text_charAt">
        <Value name="VALUE">
          <Block type="variables_get">
            <Field name="VAR">text</Field>
          </Block>
        </Value>
      </Block>
      <Block type="setProperty">
        <Value name="VALUE">
          <Shadow type="math_number">
            <Field name="NUM">0</Field>
          </Shadow>
        </Value>
      </Block>
      <Block type="getProperty" />
      <Block type="math_number" />
      <Block type="math_arithmetic" />
    </BlocklyComponent>
  );
};

export default BlocklyEditor;
