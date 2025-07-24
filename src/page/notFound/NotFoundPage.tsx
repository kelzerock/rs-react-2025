import { Link } from "react-router";
import { Paths } from "../../models/enums/paths";

export const NotFoundPage = () => {
  return (
    <div className=" bg-blue-50 h-full p-8 ">
      <div className="container bg-stone-50 h-full rounded-xl p-3 flex flex-col items-center">
        <h1 className=" font-semibold text-4xl mt-20">
          Oops, this page doesn&apos;t found!{" "}
        </h1>
        <Link
          to={Paths.home}
          className=" inline-block mt-5 capitalize font-semibold text-lg border-2 rounded-md border-stone-600 bg-blue-500 text-white py-4 px-6 hover:bg-blue-700"
        >
          back to main page
        </Link>
      </div>
    </div>
  );
};
