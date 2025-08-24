import { useState } from "react";
import { ControlledForm } from "../../components/forms/ControlledForm";
import { UncontrolledForm } from "../../components/forms/UncontrolledForm";
import { Modal } from "../../components/Modal";
import { useSelector } from "react-redux";
import { selectFormUncontrolledDB } from "../../store/formUncontrolledSlice";
import { CardList } from "../../components/CardList";
import { selectFormControlDB } from "../../store/formControlSlice";

export const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const [formTemplate, setFormTemplate] = useState<React.ReactNode>(null);
  const handleClick = (control: boolean) => {
    setFormTemplate(
      control ? (
        <ControlledForm close={handleClose} />
      ) : (
        <UncontrolledForm close={handleClose} />
      ),
    );
    setIsOpen(true);
  };
  const uncontrolledDB = useSelector(selectFormUncontrolledDB);
  const controlledDB = useSelector(selectFormControlDB);

  return (
    <>
      <h1 className="p-4 text-4xl dark:text-stone-400" data-testid="test-main">
        Form task
      </h1>
      <section className="flex flex-col sm:flex-row justify-evenly gap-3">
        <div className="flex flex-col gap-3 basis-1/2">
          <h2 className="text-2xl uppercase font-semibold dark:text-stone-300">
            Uncontrolled form
          </h2>
          <button className="btn-form-open" onClick={() => handleClick(false)}>
            Open form
          </button>
          <CardList list={uncontrolledDB} />
        </div>
        <div className="flex flex-col gap-3  basis-1/2">
          <h2 className="text-2xl uppercase font-semibold dark:text-stone-300">
            Controlled form
          </h2>
          <button className="btn-form-open" onClick={() => handleClick(true)}>
            Open form
          </button>
          <CardList list={controlledDB} />
        </div>
      </section>
      <Modal isOpen={isOpen} formTemplate={formTemplate} close={handleClose} />
    </>
  );
};
