import { render, screen } from "@testing-library/react";
import App from "./app/page";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "./context/themeProvider";

test("render container and main block", () => {
  render(
    <BrowserRouter>
      <ThemeProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>,
  );
  expect(screen.getByTestId("app-wrapper")).toBeInTheDocument();
  expect(screen.getByTestId("app-main-container")).toBeInTheDocument();
});
