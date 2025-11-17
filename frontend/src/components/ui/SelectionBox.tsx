import { ChangeEvent, useImperativeHandle, useState } from "react";

export interface SelectionBoxRef {
  inputValue: string;
  setInputValue: (input: string) => void;
}

interface Option {
  label: string;
  value: string;
}

interface SelectionBoxProps {
  ref?: React.Ref<SelectionBoxRef>;
  defaultValue?: string;
  options?: Option[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  className?: string;
  overrideClassName?: boolean;
  disabled?: boolean;
}

export const SelectionBox = ({
  ref,
  defaultValue = '',
  options = [],
  onChange = () => {},
  required = false,
  className = '',
  overrideClassName = false,
  disabled = false,
}: SelectionBoxProps) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue);

  useImperativeHandle(ref, () => ({
    inputValue: inputValue,
    setInputValue: setInputValue,
  }));

  return (
    <select
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
        onChange(e);
      }}
      required={required}
      className={(overrideClassName ? "" : "border p-2 rounded") + " " + className}
      disabled={disabled}
    >
      {options.map((option) =>
        <option
          value={option.value}
          selected={option.value == inputValue}
        >
          {option.label}
        </option>
      )}
    </select>
  );
};