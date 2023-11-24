import style from "./delete-button.module.scss";
import { BsTrash3Fill } from "react-icons/bs";

interface IButton extends React.ComponentProps<"button"> {
  className?: string;
}

const DeleteButton = ({ className, ...props }: IButton) => {
  return (
    <button {...props} className={`${style.button} ${className}`}>
      <BsTrash3Fill className={style.icon}></BsTrash3Fill>
    </button>
  );
};

export default DeleteButton;
