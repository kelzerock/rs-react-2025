import { useEffect, useState } from "react";
import type { PropsSearchComponent } from "../models/types/propsSearchComponent";

export const Search = ({
  onInputChange,
  isLoading,
  initialValue,
}: PropsSearchComponent) => {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const inputValue = e.target.value
        .split(" ")
        .map((el) => el.trim())
        .join("");
      setInputValue(inputValue);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onInputChange(inputValue);
  };

  return (
    <form className="flex gap-2 flex-wrap" onSubmit={handleSubmit}>
      <input
        className="bg-gray-500 text-white text-2xl rounded-md p-2 disabled:bg-gray-300 disabled:text-gray-100 disabled:cursor-auto w-full sm:w-auto"
        type="text"
        value={inputValue}
        onChange={handleInput}
        disabled={isLoading}
        data-testid="input"
      />
      <button
        disabled={isLoading}
        type="submit"
        className=" w-full sm:w-auto disabled:cursor-auto bg-emerald-500 text-white text-2xl py-2 px-4 rounded-md font-semibold hover:bg-emerald-600 cursor-pointer disabled:bg-gray-300 disabled:text-gray-100 dark:bg-emerald-700"
        data-testid="button"
      >
        Search by name
      </button>
    </form>
  );
};
