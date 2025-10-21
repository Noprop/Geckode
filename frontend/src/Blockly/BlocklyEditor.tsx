"use client";

import BlocklyComponent from "./BlocklyComponent";
import { Block, Value, Shadow, Field } from ".";

import { javascriptGenerator } from 'blockly/javascript';

const BlocklyEditor = () => {
  return (
    <BlocklyComponent
      className=""
      readOnly={false}
      trashcan={true}
      media={'media/'}
      move={{
        scrollbars: true,
        drag: true,
        wheel: true,
      }}
      initialXml={`
        <xml xmlns="http://www.w3.org/1999/xhtml">
          <block type="controls_ifelse" x="0" y="0"></block>
        </xml>
      `}
    >
      {/* TODO: custom block type for this to work */}
      <Block type="forever" />
      <Block type="controls_ifelse" />
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
    </BlocklyComponent>
  );
};

export default BlocklyEditor;
