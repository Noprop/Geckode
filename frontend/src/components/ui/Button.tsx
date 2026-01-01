import { MouseEvent } from "react";

interface ButtonProps {
  children?: React.ReactNode;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  defaultValue?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  overrideClassName?: boolean;
  disabled?: boolean;
  title?: string;
  style?: React.CSSProperties;
}

export const Button = ({
  children,
  type = 'button',
  onClick = () => {},
  className = '',
  overrideClassName = false,
  disabled = false,
  title = undefined,
  style,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={(e) => onClick(e)}
      className={
        (overrideClassName
          ? ''
          : 'cursor-pointer px-3 py-2 rounded-md font-semibold text-sm disabled:opacity-50 text-white') +
        ' ' +
        className
      }
      disabled={disabled}
      title={title}
      style={style}
    >
      {children}
    </button>
  );
};