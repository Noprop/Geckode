import { ChangeEvent, Dispatch, FocusEvent, KeyboardEvent, SetStateAction, useImperativeHandle, useRef, useState } from 'react';

export interface InputBoxRef {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
  focus: () => void;
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
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  overrideClassName?: boolean;
  disabled?: boolean;
  error?: string | string[];
}

export const InputBox = ({
  ref,
  value = undefined,
  defaultValue = '',
  defaultChecked = false,
  placeholder = '',
  type = 'input',
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  onKeyDown = () => {},
  required = false,
  className = '',
  overrideClassName = false,
  disabled = false,
  error,
}: InputBoxProps) => {
  const [inputValue, setInputValue] = useState<string>(String(defaultValue));
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked);

  const inputRef = useRef<HTMLInputElement>(null);

  const errorList = error == null ? [] : Array.isArray(error) ? error : [error];
  const hasError = errorList.length > 0;

  useImperativeHandle(
    ref,
    (): InputBoxRef => ({
      inputValue: inputValue,
      setInputValue: setInputValue,
      isChecked: isChecked,
      setIsChecked: setIsChecked,
      focus: () => inputRef.current?.focus(),
    })
  );

  const errorInputClass = hasError ? 'border-red-500 dark:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/50' : '';

  return (
    <div className={`group relative`}>
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
        className={`${errorInputClass} ${overrideClassName ? "" : "border p-2 rounded-md w-full"} ${className}`}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        aria-invalid={hasError}
      />
      {hasError && (
        <div
          role="tooltip"
          className="pointer-events-none absolute left-0 top-full z-10 mt-1 hidden max-w-[min(100%,20rem)] rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 shadow-md dark:border-red-800 dark:bg-red-950/90 dark:text-red-200 group-hover:block"
        >
          <ul className="list-inside list-disc space-y-0.5">
            {errorList.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
