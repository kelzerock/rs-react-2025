import type { JSX } from "react";
import { createPortal } from "react-dom";

export const Modal = ({
  formTemplate: FormTemplate,
  isOpen,
  close,
}: {
  formTemplate: () => JSX.Element;
  isOpen: boolean;
  close: () => void;
}) => {
  if (!isOpen) return null;

  const modal = (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-stone-900/50 backdrop-blur-md"
        onClick={close}
      >
        <div className="bg-stone-100 rounded-md p-3 fixed top-3 left-1/2 -translate-x-1/2 w-11/12 sm:w-9/12 md:w-auto">
          <h3>Modal window</h3>
          <FormTemplate />
        </div>
      </div>
    </>
  );
  return createPortal(modal, document.body);
};
