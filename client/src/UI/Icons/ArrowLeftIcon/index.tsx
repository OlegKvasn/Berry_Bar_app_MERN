import type { SVGProps } from "react";

export type TIconProps = SVGProps<SVGSVGElement>;

type TProps = TIconProps & {
  className?: string;
  // onClick?: (event: MouseEvent<HTMLOrSVGElement>) => void;
};

const ArrowLeftIcon = ({
  className,
  height = 16,
  width = 8,
  // onClick,
  ...props
}: TProps) => (
  <svg
    className={className}
    fill="currentColor"
    height={height}
    width={width}
    viewBox="0 0 8 16"
    xmlns="http://www.w3.org/2000/svg"
    // onClick={onClick}
    {...props}
  >
    <path d="M8 1.4303L6.78663 0L0 8L6.78663 16L8 14.5697L2.42674 8L8 1.4303Z" />
  </svg>
);

export default ArrowLeftIcon;
