import { ChangeEvent, Dispatch, FocusEvent, SetStateAction, useEffect, useImperativeHandle, useRef, useState } from "react";

export interface InputBoxRef {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
}

interface InputBoxProps {
  ref?: React.Ref<InputBoxRef>;
  value?: string;
  defaultValue?: string | number;
  defaultChecked?: boolean;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  overrideClassName?: boolean;
  disabled?: boolean;
}

export const InputBox = ({
  ref,
  value = undefined,
  defaultValue = '',
  defaultChecked = false,
  placeholder = '',
  type = "input",
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  required = false,
  className = '',
  overrideClassName = false,
  disabled = false,
}: InputBoxProps) => {
  const [inputValue, setInputValue] = useState<string>(String(defaultValue));
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked);

  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, (): InputBoxRef => ({
    inputValue: inputValue,
    setInputValue: setInputValue,
    isChecked: isChecked,
    setIsChecked: setIsChecked,
  }));

  return <>
    <input
      ref={inputRef}
      placeholder={placeholder}
      type={type}
      value={value ?? inputValue}
      checked={isChecked}
      onChange={(e) => {
        if (value === undefined) setInputValue(e.target.value);
        if (type === 'checkbox') setIsChecked(e.target.checked);
        onChange(e);
      }}
      required={required}
      className={(overrideClassName ? "" : "border p-2 rounded-md") + " " + className}
      disabled={disabled}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  </>;
};