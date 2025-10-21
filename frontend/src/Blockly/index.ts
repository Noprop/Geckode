import React from 'react';
import BlocklyComponent from './BlocklyComponent';

export default BlocklyComponent;

type Props = React.PropsWithChildren<
  {
    type?: string
    name?: string
    disabled?: string 
  } // potentially use & Blockly.BlocklyOptions but frankly the typings and current react examples of blockly
    // are a complete fucking mess right now. they're still using deprecated functions despite them having
    // the latest React (v19) installed.
>

const Block = (p: Props) => {
  console.log('block render');
  const { children, ...props } = p;
  return React.createElement('Block', { ...props, is: 'blockly' }, children);
};

const Category = (p: Props) => {
  const { children, ...props } = p;
  return React.createElement('category', { ...props, is: 'blockly '}, children);
};

const Value = (p: Props) => {
  const { children, ...props } = p;
  return React.createElement('value', { ...props, is: 'blockly '}, children);
};

const Field = (p: Props) => {
  const { children, ...props } = p;
  return React.createElement('field', { ...props, is: 'blockly '}, children);
};

const Shadow = (p: Props) => {
  const { children, ...props } = p;
  return React.createElement('shadow', { ...props, is: 'blockly '}, children);
};

export { Block, Category, Value, Field, Shadow };
