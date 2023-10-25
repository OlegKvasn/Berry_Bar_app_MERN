import styles from "./button.module.css";
import type { MouseEventHandler } from "react";

interface IButton {
  children: React.ReactNode;
  className?: string;
  borderRadius?: 20 | 10;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  children,
  className,
  borderRadius = 10,
  onClick,
}: IButton) => {
  return (
    <button
      onClick={onClick}
      type="button"
      style={{ borderRadius: `${borderRadius}px` }}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
