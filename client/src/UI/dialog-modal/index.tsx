import { useEffect, useRef } from "react";
import CancelButton from "../icon-button/cancel";
import style from "./dialog-modal.module.scss";

interface IButton extends React.ComponentProps<"dialog"> {
  children: React.ReactNode;
  className?: string;
  title?: string;
  onClose: () => void;
  isOpen: boolean;
  closeBtn?: boolean;
}

const DialogModal = ({
  children,
  className,
  title = "",
  onClose,
  isOpen,
  closeBtn = true,
  ...props
}: IButton) => {
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const closeDialog = () => {
    dialogRef.current?.close();
    onClose();
  };

  return (
    <>
      {isOpen ? (
        <dialog
          ref={dialogRef}
          {...props}
          className={`${style.dialog} ${className}`}
        >
          <div className={style.title}>
            <p>{title}</p>
            {closeBtn ? (
              <CancelButton type="button" onClick={closeDialog} />
            ) : null}
          </div>
          {children}
        </dialog>
      ) : null}
    </>
  );
};

export default DialogModal;
