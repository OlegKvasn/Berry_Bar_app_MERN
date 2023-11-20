import CancelButton from "../icon-button/cancel";
import style from "./dialog.module.scss";

interface IButton extends React.ComponentProps<"dialog"> {
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
}

const Dialog = ({ children, className, onClose, ...props }: IButton) => {
  return (
    <dialog {...props} className={`${style.dialog} ${className}`}>
      <div className={style.title}>
        <p>діалог</p>
        <CancelButton type="button" onClick={onClose} />
      </div>
      {children}
    </dialog>
  );
};

export default Dialog;
