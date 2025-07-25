export const Title = ({ title }: { title: string }) => {
  return (
    <div
      className="flex justify-center items-center w-full"
      data-testid="wrapper"
    >
      <h3 className=" font-bold text-2xl text-center py-6" data-testid="title">
        {title}
      </h3>
    </div>
  );
};
