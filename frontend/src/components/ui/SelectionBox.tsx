import { ChangeEvent, Dispatch, SetStateAction, useEffect, useImperativeHandle, useState } from "react";

export interface SelectionBoxRef {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
}

export interface Option {
  label: string | number;
  value: string | number;
}

interface SelectionBoxProps {
  ref?: React.Ref<SelectionBoxRef>;
  defaultValue?: string | number;
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
  const [inputValue, setInputValue] = useState<string>(String(defaultValue));

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
      className={(
        overrideClassName
          ? ""
          : "border p-2 rounded"
      ) + " " + className}
      disabled={disabled}
    >
      {options.map((option, index) =>
        <option
          key={index}
          value={option.value}
          className="text-black"
        >
          {option.label}
        </option>
      )}
    </select>
  );
};