import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { Search } from "./Search";

test("renders search input and button", () => {
  render(<Search initialValue="" isLoading={false} onInputChange={() => {}} />);
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByTestId("input")).toBeInTheDocument();
  expect(screen.getByTestId("button")).toBeInTheDocument();
});

test("updates input value when user types without spaces", () => {
  render(<Search initialValue="" isLoading={false} onInputChange={() => {}} />);
  const input = screen.getByTestId("input");
  fireEvent.change(input, { target: { value: " Luke Test " } });
  expect(input).toHaveValue("LukeTest");
});

test(" when user push the submit button the onInputChange function will call", () => {
  const onInputChangeMock = vi.fn();
  render(
    <Search
      initialValue=""
      isLoading={false}
      onInputChange={onInputChangeMock}
    />,
  );
  const button = screen.getByTestId("button");
  fireEvent.click(button);
  expect(onInputChangeMock).toHaveBeenCalled();
});

test("disables input and button when loading", () => {
  render(
    <Search initialValue="test" isLoading={true} onInputChange={() => {}} />,
  );
  expect(screen.getByRole("textbox")).toBeDisabled();
  expect(screen.getByRole("button")).toBeDisabled();
});

test("updates input when initialValue changes", () => {
  const { rerender } = render(
    <Search initialValue="test1" isLoading={false} onInputChange={() => {}} />,
  );
  const input = screen.getByTestId("input");
  expect(input).toHaveValue("test1");

  rerender(
    <Search initialValue="test2" isLoading={false} onInputChange={() => {}} />,
  );
  expect(input).toHaveValue("test2");
});
