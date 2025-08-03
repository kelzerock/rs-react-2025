import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store";

test("render container and main block", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  );
  expect(screen.getByTestId("app-wrapper")).toBeInTheDocument();
  expect(screen.getByTestId("app-main-container")).toBeInTheDocument();
});
