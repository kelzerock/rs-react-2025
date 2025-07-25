import { useLS } from "./useLS";
import { render, screen, fireEvent } from "@testing-library/react";

const Test = {
  KEY: "testKey",
  VALUE: "testValue",
  NEW_VALUE: "newValue",
} as const;

export const TestComponent = () => {
  const [value, setValue] = useLS<string>(Test.KEY, Test.VALUE);

  return (
    <div>
      <span data-testid="value">{value}</span>
      <button onClick={() => setValue(Test.NEW_VALUE)}>Update</button>
    </div>
  );
};

describe("TestComponent using useLS", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(Storage.prototype, "getItem");
    vi.spyOn(Storage.prototype, "setItem");
  });

  it("shows initial value from hook", () => {
    render(<TestComponent />);
    expect(screen.getByTestId("value").textContent).toBe(Test.VALUE);
    expect(localStorage.getItem).toHaveBeenCalledWith(Test.KEY);
  });

  it("updates value and localStorage on click", () => {
    render(<TestComponent />);
    fireEvent.click(screen.getByText("Update"));

    expect(screen.getByTestId("value").textContent).toBe(Test.NEW_VALUE);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      Test.KEY,
      JSON.stringify(Test.NEW_VALUE),
    );
  });

  it("reads persisted value from localStorage", () => {
    localStorage.setItem(Test.KEY, JSON.stringify(Test.NEW_VALUE));
    render(<TestComponent />);
    expect(screen.getByTestId("value").textContent).toBe(Test.NEW_VALUE);
  });
});
