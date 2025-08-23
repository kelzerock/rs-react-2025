import { render, screen } from "@testing-library/react";
import { HomePage } from "./HomePage";

test("renders title and search component", () => {
  render(<HomePage />);
  expect(screen.getByTestId("test-main")).toBeInTheDocument();
});
