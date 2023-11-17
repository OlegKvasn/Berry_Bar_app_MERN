import CancelButton from "../icon-button/cancel";
import style from "./dialog-modal.module.scss";

interface IButton extends React.ComponentProps<"dialog"> {
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
}

const DialogModal = ({ children, className, onClose, ...props }: IButton) => {
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

export default DialogModal;
