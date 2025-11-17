import { MouseEvent } from "react";

interface ButtonProps {
  children?: React.ReactNode,
  defaultValue?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  overrideClassName?: boolean;
  disabled?: boolean;
}

export const ButtonButtonProps = ({
  children,
  onClick = () => {},
  className = '',
  overrideClassName = false,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={(e) => onClick(e)}
      className={
        (overrideClassName
          ? ""
          : "" // Default classes go here (will allow consistency)
        ) + " " + className
      }
      disabled={disabled}
    >{children}</button>
  );
};