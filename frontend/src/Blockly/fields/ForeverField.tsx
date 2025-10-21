/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Sample React Blockly Field.
 * This shows you how to create a custom Blockly field that renders a React
 * component inside of the dropdown div when shown.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React from 'react';
import ReactDOM from 'react-dom';

import * as Blockly from 'blockly/core';

class BlocklyReactField extends Blockly.Field {
  SERIALIZABLE = true;

  // @ts-ignore
  static fromJson(options) {
    // `this` might be a subclass of BlocklyReactField if that class doesn't
    // override the static fromJson method.
    return new this(options['text']);
  }

  showEditor_() {
    // @ts-ignore
    this.div_ = Blockly.DropDownDiv.getContentDiv();
    // @ts-ignore
    ReactDOM.render(this.render(), this.div_);

    // @ts-ignore
    var border = this.sourceBlock_.style.colourTertiary;
    border = border.colourBorder || border.colourLight;

    // @ts-ignore
    Blockly.DropDownDiv.setColour(this.sourceBlock_.getColour(), border);

    Blockly.DropDownDiv.showPositionedByField(
      this,
      this.dropdownDispose_.bind(this),
    );
  }

  dropdownDispose_() {
    // @ts-ignore
    ReactDOM.unmountComponentAtNode(this.div_);
  }

  render() {
    return <FieldRenderComponent />;
  }
}

class FieldRenderComponent extends React.Component {
  render() {
    return <div style={{color: '#fff'}}>Hello from React!</div>;
  }
}

Blockly.fieldRegistry.register('react_forever', BlocklyReactField);

export default BlocklyReactField;
