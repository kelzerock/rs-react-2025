export const CloseIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className=" absolute top-1 right-1 uppercase font-extrabold border-4 rounded-full h-[30px] w-[30px] flex justify-center items-center bg-amber-600 hover:bg-amber-900 hover:cursor-pointer"
    >
      x
    </div>
  );
};
