export const saveDataToLocalStorage = (data: unknown, key: string) => {
  localStorage.setItem(key, JSON.stringify(data));
};
