import { useAppDispatch, useAppSelector } from "../hooks/appHook";
import { toggleTheme } from "../store/themeSlice";
import { WiDaySunny } from "react-icons/wi";
import { WiMoonWaningCrescent4 } from "react-icons/wi";

export const ThemePanel = () => {
  const isLight = useAppSelector((state) => state.theme.isLight);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(toggleTheme());
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`absolute right-1 top-1/2 -translate-1/2 hover:cursor-pointer overflow-hidden  rounded-full ${isLight ? "bg-amber-200" : " bg-stone-200"}`}
    >
      <span className="relative h-10 aspect-square flex justify-center items-center">
        <WiDaySunny
          className={`${isLight ? "opacity-100 translate-x-0" : "opacity-0 translate-x-15"} transition-all duration-500 absolute w-full h-full`}
        />
        <WiMoonWaningCrescent4
          className={`${!isLight ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-15"} transition-all duration-500 absolute w-full h-full`}
        />
      </span>
    </button>
  );
};
