import { Link } from "react-router";
import { Paths } from "../../models/enums/paths";

export const NotFoundPage = () => {
  return (
    <div>
      <h1>Oops, this page doesn&apos;t found! </h1>
      <Link to={Paths.home}>back to main page</Link>
    </div>
  );
};
