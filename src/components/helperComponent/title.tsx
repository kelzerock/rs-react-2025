export const Title = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <h3 className=" font-bold text-2xl text-center py-6">{title}</h3>
    </div>
  );
};
