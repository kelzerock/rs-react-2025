export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject("Ошибка: результат не является строкой");
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};
