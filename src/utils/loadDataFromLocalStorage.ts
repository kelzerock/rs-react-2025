export const loadDataFromLocalStorage = (key: string): unknown => {
  const data = localStorage.getItem(key);
  if (data !== null) return JSON.parse(data);
};
