import { useContext, type Dispatch, type SetStateAction } from "react";
import { createContext } from "react";

export type ThemeContextType = {
  isLight: boolean;
  setIsLight: Dispatch<SetStateAction<boolean>>;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("ThemeContext not available");
  return ctx;
};
