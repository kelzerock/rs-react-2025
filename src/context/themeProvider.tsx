"use client";
import { useState, useEffect } from "react";
import { ThemeContext } from "./themeContext";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLight, setIsLight] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme !== null) {
        setIsLight(savedTheme === "light");
      } else {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        setIsLight(!prefersDark);
      }
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      localStorage.setItem("theme", isLight ? "light" : "dark");
    }
  }, [isLight, isInitialized]);

  return (
    <ThemeContext.Provider value={{ isLight, setIsLight }}>
      {children}
    </ThemeContext.Provider>
  );
};
