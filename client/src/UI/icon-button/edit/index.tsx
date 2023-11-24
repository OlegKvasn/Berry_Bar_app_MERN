import style from "./edit-button.module.scss";
import { BsPencilSquare } from "react-icons/bs";

interface IButton extends React.ComponentProps<"button"> {
  className?: string;
}

const EditButton = ({ className, ...props }: IButton) => {
  return (
    <button {...props} className={`${style.button} ${className}`}>
      <BsPencilSquare className={style.icon}></BsPencilSquare>
    </button>
  );
};

export default EditButton;
