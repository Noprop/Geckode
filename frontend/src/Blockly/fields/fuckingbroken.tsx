/**
 * Sample React Blockly Field (TypeScript + React 19)
 * Renders a React component inside Blockly's dropdown div.
 */

import * as React from "react";
import * as Blockly from "blockly/core";
import { createRoot, Root } from "react-dom/client";
import type { FieldConfig, Field } from "blockly/core";

// If your setup doesn't have Blockly types for Field, you can fall back to `any`.

// type FromJsonOptions = {
//   text?: string;
//   [key: string]: unknown;
// };

// export class BlocklyReactField extends (Blockly.Field as {
//   new (value?: string, validator?: Blockly.FieldValidator): Blockly.Field;
//   fromJson?: (options: FromJsonOptions) => Blockly.Field;
// }) {
export class BlocklyReactField extends Blockly.Field {
  /** Ensure this field is serialized by Blockly. */
  public override SERIALIZABLE = true;
  private reactRoot: Root | null = null;
  /** Cached reference to the dropdown’s content div for unmounting. */
  private contentDiv: HTMLElement | null = null;

  static fromJson(options: FieldConfig): Field {
    return new this(options['tooltip']);
  }

  /**
   * Shows the editor (dropdown). We render our React component into
   * Blockly's DropDownDiv content area using React 18+/19 root API.
   */
  protected override showEditor_(): void {
    // Get (or create) the DropDownDiv content element.
    this.contentDiv = Blockly.DropDownDiv.getContentDiv() as HTMLElement;

    if (!this.reactRoot) {
      this.reactRoot = createRoot(this.contentDiv);
    }
    this.reactRoot.render(this.renderReact());

    // Color the dropdown to match the source block (defensive typing).
    const sourceBlock: any = this.getSourceBlock(); // `getSourceBlock` is public
    const style = sourceBlock?.style;
    let border: string | undefined =
      style?.colourTertiary?.colourBorder ?? style?.colourTertiary?.colourLight;

    // @ts-ignore
    Blockly.DropDownDiv.setColour(sourceBlock?.getColour?.(), border);

    // Show the dropdown, positioning it by this field, with cleanup callback.
    Blockly.DropDownDiv.showPositionedByField(
      this,
      this.dropdownDispose_.bind(this)
    );
  }

  /**
   * Cleanup when the dropdown closes: unmount React and release references.
   */
  private dropdownDispose_(): void {
    if (this.reactRoot) {
      // Unmount the React tree; this replaces `ReactDOM.unmountComponentAtNode`.
      this.reactRoot.unmount();
      this.reactRoot = null;
    }
    this.contentDiv = null;
  }

  /**
   * Returns the React element to render inside the dropdown.
   * Override this if you want custom props or a different component.
   */
  protected renderReact(): React.ReactNode {
    return <FieldRenderComponent />;
  }
}

/**
 * Minimal sample React component.
 * Replace with your own UI (forms, lists, selectors, etc.).
 */
const FieldRenderComponent: React.FC = () => {
  return <div style={{ color: "#fff" }}>Hello from React!</div>;
};

// Register the field so it can be used via JSON: { "type": "...", "message0": "...", "args0":[{ "type": "field_react_component", "name": "X", "text": "Hi" }], ... }
Blockly.fieldRegistry.register("field_react_component", BlocklyReactField);

export default BlocklyReactField;
