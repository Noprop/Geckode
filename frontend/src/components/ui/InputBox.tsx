import { ChangeEvent, useImperativeHandle, useState } from "react";

export interface InputBoxRef {
  inputValue: string;
  setInputValue: (input: string) => void;
}

interface InputBoxProps {
  ref?: React.Ref<InputBoxRef>;
  defaultValue?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

export const InputBox = ({
  ref, defaultValue = '', placeholder = '', type = "input", onChange = () => {},
  required = false, className = '',
}: InputBoxProps) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue);

  useImperativeHandle(ref, () => ({
    inputValue: inputValue,
    setInputValue: setInputValue,
  }));

  return (
    <input
      placeholder={placeholder}
      type={type}
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
        onChange(e);
      }}
      required={required}
      className={"border p-2 rounded " + className}
    />
  );
};