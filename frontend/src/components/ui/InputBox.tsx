import { ChangeEvent, Dispatch, SetStateAction, useEffect, useImperativeHandle, useRef, useState } from "react";

export interface InputBoxRef {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
  isFocused: boolean;
}

interface InputBoxProps {
  ref?: React.Ref<InputBoxRef>;
  value?: string;
  defaultValue?: string | number;
  defaultChecked?: boolean;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  overrideClassName?: boolean;
  disabled?: boolean;
  dropdownElements?: React.ReactNode[];
}

export const InputBox = ({
  ref,
  value = undefined,
  defaultValue = '',
  defaultChecked = false,
  placeholder = '',
  type = "input",
  onChange = () => {},
  required = false,
  className = '',
  overrideClassName = false,
  disabled = false,
  dropdownElements = [],
}: InputBoxProps) => {
  const [inputValue, setInputValue] = useState<string>(String(defaultValue));
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputWidth, setInputWidth] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, (): InputBoxRef => ({
    inputValue: inputValue,
    setInputValue: setInputValue,
    isChecked: isChecked,
    setIsChecked: setIsChecked,
    isFocused: isFocused,
  }));

  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.offsetWidth);
    }
  }, [isFocused]);

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
      onFocus={() => setIsFocused(true)}
      onBlur={() => setTimeout(() => setIsFocused(false), 100)}
    />
    {isFocused && inputValue ? (
      <div
        style={{ width: `${inputWidth}px` }}
        className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden"
      >
        <ul>
          {dropdownElements.map((element, index) => (
            <li key={index}>{element}</li>
          ))}
        </ul>
      </div>
    ) : ''}
  </>;
};