import { useState, type JSX } from "react";
import { ControlledForm } from "../../components/forms/ControlledForm copy";
import { UncontrolledForm } from "../../components/forms/UncontrolledForm";
import { Modal } from "../../components/Modal";

export const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formTemplate, setFormTemplate] = useState<() => JSX.Element>(
    () => ControlledForm,
  );
  const handleClick = (control: boolean) => {
    setFormTemplate(() => (control ? ControlledForm : UncontrolledForm));
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);
  return (
    <>
      <h1 className="p-4 text-4xl dark:text-stone-400" data-testid="test-main">
        Form task
      </h1>
      <section className="flex flex-col sm:flex-row justify-evenly">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl uppercase font-semibold dark:text-stone-300">
            Uncontrolled form
          </h2>
          <button className="btn-form-open" onClick={() => handleClick(false)}>
            Open form
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl uppercase font-semibold dark:text-stone-300">
            Controlled form
          </h2>
          <button className="btn-form-open" onClick={() => handleClick(true)}>
            Open form
          </button>
        </div>
      </section>
      <Modal isOpen={isOpen} formTemplate={formTemplate} close={handleClose} />
    </>
  );
};
