import { ChangeEvent, Dispatch, SetStateAction, useImperativeHandle, useState } from "react";

export interface InputBoxRef {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
}

interface InputBoxProps {
  ref?: React.Ref<InputBoxRef>;
  value?: string;
  defaultValue?: string | number;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  overrideClassName?: boolean;
  disabled?: boolean;
}

export const InputBox = ({
  ref,
  value = undefined,
  defaultValue = '',
  placeholder = '',
  type = "input",
  onChange = () => {},
  required = false,
  className = '',
  overrideClassName = false,
  disabled = false,
}: InputBoxProps) => {
  const [inputValue, setInputValue] = useState<string>(String(defaultValue));

  useImperativeHandle(ref, () => ({
    inputValue: inputValue,
    setInputValue: setInputValue,
  }));

  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value ?? inputValue}
      onChange={(e) => {
        if (value === undefined) setInputValue(e.target.value);
        onChange(e);
      }}
      required={required}
      className={(overrideClassName ? "" : "border p-2 rounded-md") + " " + className}
      disabled={disabled}
    />
  );
};