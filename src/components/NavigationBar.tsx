import { NavLink } from "react-router";
import { Paths } from "../models/enums/paths";
import logo from "../assets/logo.webp";

export const NavigationBar = () => {
  return (
    <header
      data-testid="wrapper"
      className=" flex gap-6 bg-stone-50 p-4 rounded-md items-center"
    >
      <img
        data-testid="logo"
        src={logo}
        alt="logo star trek"
        className=" w-[50px] h-[50px] rounded-full"
      />
      <nav className="h-auto" data-testid="nav">
        <ul className="flex rounded-md bg-stone-300 h-auto p-2 gap-2">
          {Object.entries(Paths).map(([key, value]) => {
            return (
              <li key={key} className="w-full h-full sm:w-auto">
                <NavLink
                  to={value}
                  className={({ isActive }) => {
                    const active = isActive ? " underline" : "";
                    return (
                      active +
                      " block text-3xl font-bold bg-stone-300 rounded-md p-3 hover:bg-stone-700 hover:text-stone-200 transition-colors duration-500 capitalize"
                    );
                  }}
                >
                  {key}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
