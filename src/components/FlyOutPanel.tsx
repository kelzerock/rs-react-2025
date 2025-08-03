import { useAppDispatch, useAppSelector } from "../hooks/appHook";
import { removeAllItems } from "../store/itemsSlice";
import { downloadCSVFile } from "../utils/downloadCVSFile";

export const FlyOutPanel = () => {
  const items = useAppSelector((state) => state.items);
  const dispatch = useAppDispatch();
  const handleClickDownload = () => {
    downloadCSVFile(items);
  };

  const countItems = items.length;
  if (countItems > 0)
    return (
      <div
        data-testid="flyOutPanel-wrapper"
        className=" bg-stone-700/80 p-2 text-stone-100 font-semibold rounded-md w-full sticky bottom-3 col-span-full"
      >
        <h6>Information about favorite items:</h6>
        <span data-testid="flyOutPanel-countItems">
          Selected items: {countItems}
        </span>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => dispatch(removeAllItems())}
            className="bg-stone-200 text-stone-800 px-3 rounded-md hover:cursor-pointer hover:bg-stone-400 transition-all duration-300 hover:text-stone-50"
          >
            unselected all
          </button>
          <button
            type="button"
            className="bg-stone-200 text-stone-800 px-3 rounded-md hover:cursor-pointer hover:bg-stone-400 transition-all duration-300 hover:text-stone-50"
            onClick={handleClickDownload}
          >
            save selected items
          </button>
        </div>
      </div>
    );
};
