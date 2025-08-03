import { render, screen } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { router } from "./router"; // путь к файлу с createBrowserRouter
import { Provider } from "react-redux";
import { store } from "../store/store";

describe("App routing", () => {
  it("renders HomePage on root path", async () => {
    window.history.pushState({}, "", "/");

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );

    expect(await screen.findByText(/home/i)).toBeInTheDocument();
  });

  it("renders AboutPage on /about", async () => {
    window.history.pushState({}, "", "/about");

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );

    expect(await screen.findByText(/about/i)).toBeInTheDocument();
  });
});
