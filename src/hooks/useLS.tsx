import { useEffect, useState } from "react";

export const useLS = <T,>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem(key);
      if (stored) {
        setState(JSON.parse(stored));
      }
    }
  }, [key]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState] as const;
};
