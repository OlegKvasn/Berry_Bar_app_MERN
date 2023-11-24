import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/button";
import DialogModal from "../../UI/dialog-modal";

type ErrorModalProps = {
  errorMessage?: string;
  navigateUrl?: string;
  navigateText?: string;
};

const ErrorModal = ({
  errorMessage = "Щось пішло не так",
  navigateUrl = "/",
  navigateText = "На Головну",
}: ErrorModalProps) => {
  const [isOpen, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleOk = () => {
    setOpen(false);
    navigate(navigateUrl);
  };

  return (
    <>
      <DialogModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        closeBtn={false}
      >
        <p>{errorMessage}</p>
        <Button type="button" onClick={handleOk}>
          {navigateText}
        </Button>
      </DialogModal>
    </>
  );
};

export default ErrorModal;
