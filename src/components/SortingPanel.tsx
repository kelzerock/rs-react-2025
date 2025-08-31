export const SortingPanel = ({
  handleClickSortButton,
  title,
  typeData,
  sortingPanelTitle,
  setSortingPanelTitle,
}: {
  handleClickSortButton: (
    target: string,
    direction: "asc" | "desc",
    typeData: "number" | "string",
  ) => void;
  title: string;
  typeData: "number" | "string";
  sortingPanelTitle: { title: string; direction: "asc" | "desc" };
  setSortingPanelTitle: (value: {
    title: string;
    direction: "asc" | "desc";
  }) => void;
}) => {
  return (
    <div className="flex rounded-md justify-center m-0">
      <button
        className={`-rotate-90 btn-arrow ${sortingPanelTitle.title === title && sortingPanelTitle.direction === "asc" ? "!bg-stone-700" : ""}`}
        onClick={() => {
          handleClickSortButton(title, "asc", typeData);
          setSortingPanelTitle({ title, direction: "asc" });
        }}
      >
        &#10148;
      </button>
      <button
        className={`rotate-90 btn-arrow ${sortingPanelTitle.title === title && sortingPanelTitle.direction === "desc" ? "!bg-stone-700" : ""}`}
        onClick={() => {
          handleClickSortButton(title, "desc", typeData);
          setSortingPanelTitle({ title, direction: "desc" });
        }}
      >
        &#10148;
      </button>
    </div>
  );
};
