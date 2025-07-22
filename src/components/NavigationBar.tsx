import { NavLink } from "react-router";
import { Paths } from "../models/enums/paths";
import logo from "../assets/logo.webp";

export const NavigationBar = () => {
  return (
    <header className=" flex gap-6 bg-stone-50 p-4 rounded-md items-center">
      <img
        src={logo}
        alt="logo star trek"
        className=" w-[50px] h-[50px] rounded-full"
      />
      <nav className="h-auto">
        <ul className="flex rounded-md bg-stone-300 h-auto p-2 gap-2">
          {Object.entries(Paths).map((el) => {
            return (
              <li key={el[0]} className="w-full h-full sm:w-auto">
                <NavLink
                  to={el[1]}
                  className={({ isActive }) => {
                    const active = isActive ? " underline" : "";
                    return (
                      active +
                      " block text-3xl font-bold bg-stone-300 rounded-md p-3 hover:bg-stone-700 hover:text-stone-200 transition-colors duration-500 capitalize"
                    );
                  }}
                >
                  {el[0]}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
