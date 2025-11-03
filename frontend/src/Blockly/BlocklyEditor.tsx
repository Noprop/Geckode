"use client";

import BlocklyComponent from "./BlocklyComponent";
import { Block, Value, Shadow, Field, Category } from ".";

import { javascriptGenerator } from "blockly/javascript";

const BlocklyEditor = (props: any) => {
  return (
    <BlocklyComponent
      className=""
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
          <block type="controls_if" x="0" y="0"></block>
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
      <Category name="control">
        <Block type="controls_if" />
        <Block type="controls_ifelse" />
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
      <Category name="math">
        <Block type="math_number" />
        <Block type="math_arithmetic" />
      </Category>
      <Category name="input">
        <Block type="keyPressed" />
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
