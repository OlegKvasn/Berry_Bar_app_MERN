import styles from "./button.module.scss";

interface IButton extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  className?: string;
  borderRadius?: 20 | 10 | 0;
}

const CustomButton = ({
  children,
  className,
  borderRadius = 0,
  ...props
}: IButton) => {
  return (
    <button
      {...props}
      style={{ borderRadius: `${borderRadius}px` }}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
