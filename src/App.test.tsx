import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router";

test("render container and main block", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  expect(screen.getByTestId("app-wrapper")).toBeInTheDocument();
  expect(screen.getByTestId("app-main-container")).toBeInTheDocument();
});
