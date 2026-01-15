import { ChangeEvent, Dispatch, HTMLAttributes, SetStateAction, useEffect, useImperativeHandle, useState } from "react";

export interface SelectionBoxRef {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export interface Option {
  label: string | number;
  value: string | number | undefined;
}

interface SelectionBoxProps {
  ref?: React.Ref<SelectionBoxRef>;
  defaultValue?: string | number;
  options?: Option[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  className?: HTMLAttributes<HTMLElement>["className"];
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
  const [value, setValue] = useState<string>(String(defaultValue));

  useImperativeHandle(ref, () => ({
    value: value,
    setValue: setValue,
  }));

  return (
    <select
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
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