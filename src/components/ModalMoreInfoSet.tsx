import { createPortal } from "react-dom";

export const ModalMoreInfoSet = ({
  isOpen,
  close,
  moreInfoSet,
  setMoreInfoSet,
}: {
  isOpen: boolean;
  close: () => void;
  moreInfoSet: {
    cement_co2: boolean;
    cement_co2_per_capita: boolean;
    gas_co2: boolean;
  };
  setMoreInfoSet: (moreInfoSet: {
    cement_co2: boolean;
    cement_co2_per_capita: boolean;
    gas_co2: boolean;
  }) => void;
}) => {
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    close();
  };

  const modal = (
    <div className="fixed top-0 left-0 w-full h-full bg-stone-900/50 backdrop-blur-md">
      <div className="bg-stone-100 rounded-md p-3 fixed top-3 left-1/2 -translate-x-1/2 w-11/12 sm:w-9/12 md:w-7/12 lg:w-7/12 xl:w-1/2">
        <h3 className="text-xl font-semibold">Add more data</h3>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            {Object.entries(moreInfoSet).map(([key, value]) => (
              <label htmlFor={key} className="flex gap-1" key={key}>
                {key}
                <input
                  type="checkbox"
                  id={key}
                  checked={value}
                  onChange={(e) => {
                    setMoreInfoSet({ ...moreInfoSet, [key]: e.target.checked });
                  }}
                />
              </label>
            ))}
          </div>
          <button className="btn-form-open" type="submit">
            Close
          </button>
        </form>
      </div>
    </div>
  );
  return createPortal(modal, document.body);
};
