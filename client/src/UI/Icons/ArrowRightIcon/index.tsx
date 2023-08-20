import type { SVGProps } from "react";

export type TIconProps = SVGProps<SVGSVGElement>;

type TProps = TIconProps & {
  className?: string;
  // onClick?: (event: MouseEvent<HTMLOrSVGElement>) => void;
};

const ArrowRightIcon = ({
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
    <path d="M0 14.5697L1.21337 16L8 8L1.21337 0L0 1.4303L5.57326 8L0 14.5697Z" />
  </svg>
);

export default ArrowRightIcon;
