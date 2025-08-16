import { useEffect, useState } from "react";

export const useLS = <T,>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(() => {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
};
