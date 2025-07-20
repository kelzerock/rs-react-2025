import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { Search } from "./Search";

vi.mock("../utils/saveDataToLocalStorage", () => ({
  saveDataToLocalStorage: vi.fn(),
}));
vi.mock("../utils/loadDataFromLocalStorage", () => ({
  loadDataFromLocalStorage: vi.fn(),
}));

import { saveDataToLocalStorage } from "../utils/saveDataToLocalStorage";
import { loadDataFromLocalStorage } from "../utils/loadDataFromLocalStorage";
const mockedLoadDataFromLocalStorage = vi.mocked(loadDataFromLocalStorage, {
  deep: true,
});

test("renders search input and button", () => {
  render(<Search initialValue="" isLoading={false} onInputChange={() => {}} />);
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /search by name/i }),
  ).toBeInTheDocument();
});

test("displays previously saved search term from localStorage on mount", () => {
  mockedLoadDataFromLocalStorage.mockReturnValue("Test-data");
  render(<Search initialValue="" isLoading={false} onInputChange={() => {}} />);
  expect(screen.getByDisplayValue("Test-data")).toBeInTheDocument();
});

test("shows empty input when no saved term exists", () => {
  mockedLoadDataFromLocalStorage.mockReturnValue(undefined);
  render(<Search initialValue="" isLoading={false} onInputChange={() => {}} />);
  expect(screen.getByRole("textbox")).toHaveValue("");
});

test("updates input value when user types", () => {
  render(<Search initialValue="" isLoading={false} onInputChange={() => {}} />);
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: " Luke " } });
  expect(input).toHaveValue("Luke");
});

test("saves trimmed input to localStorage and calls onInputChange", () => {
  const callback = vi.fn();
  render(<Search initialValue="" isLoading={false} onInputChange={callback} />);
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "   Leia   " } });

  const button = screen.getByRole("button", { name: /search by name/i });
  fireEvent.click(button);

  expect(saveDataToLocalStorage).toHaveBeenCalledWith(
    "Leia",
    expect.any(String),
  );
  expect(callback).toHaveBeenCalledWith("Leia");
});

test("disables input and button when loading", () => {
  render(
    <Search initialValue="test" isLoading={true} onInputChange={() => {}} />,
  );
  expect(screen.getByRole("textbox")).toBeDisabled();
  expect(screen.getByRole("button")).toBeDisabled();
});
