import style from "./cancel-button.module.scss";
import { BsX } from "react-icons/bs";

interface IButton extends React.ComponentProps<"button"> {
  className?: string;
}

const CancelButton = ({ className, ...props }: IButton) => {
  return (
    <button {...props} className={`${style.cancelButton} ${className}`}>
      <BsX className={style.icon}></BsX>
    </button>
  );
};

export default CancelButton;
