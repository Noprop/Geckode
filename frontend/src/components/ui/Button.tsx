import { MouseEvent } from "react";

interface ButtonProps {
  children?: React.ReactNode,
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  defaultValue?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  overrideClassName?: boolean;
  disabled?: boolean;
  title?: string;
}

export const Button = ({
  children,
  type = 'button',
  onClick = () => {},
  className = '',
  overrideClassName = false,
  disabled = false,
  title = undefined,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={(e) => onClick(e)}
      className={
        (overrideClassName
          ? ""
          : "cursor-pointer h-8 p-1.5 rounded-lg font-bold text-sm disabled:opacity-50 text-white"
        ) + " " + className
      }
      disabled={disabled}
      title={title}
    >{children}</button>
  );
};