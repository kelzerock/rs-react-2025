import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

export const Modal = ({
  formTemplate,
  isOpen,
  close,
}: {
  formTemplate: ReactNode;
  isOpen: boolean;
  close: () => void;
}) => {
  const refForm = useRef(null);
  useEffect(() => {
    const handleKeyDownEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDownEsc);
    return () => {
      window.removeEventListener("keydown", handleKeyDownEsc);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target !== refForm.current) return;
    close();
  };

  const modal = (
    <>
      <div
        ref={refForm}
        className="fixed top-0 left-0 w-full h-full bg-stone-900/50 backdrop-blur-md"
        onClick={(event) => handleClose(event)}
      >
        <div className="bg-stone-100 rounded-md p-3 fixed top-3 left-1/2 -translate-x-1/2 w-11/12 sm:w-9/12 md:w-7/12 lg:w-7/12 xl:w-1/2">
          <h3>Modal window</h3>
          {formTemplate}
        </div>
      </div>
    </>
  );
  return createPortal(modal, document.body);
};
