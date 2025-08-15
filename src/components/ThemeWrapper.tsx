"use client";

import { useThemeContext } from "@/context/themeContext";

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  const { isLight } = useThemeContext();

  return <div data-theme={isLight ? "light" : "dark"}>{children}</div>;
};
