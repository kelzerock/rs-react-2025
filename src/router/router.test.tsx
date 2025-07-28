import { render, screen } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { router } from "./router"; // путь к файлу с createBrowserRouter

describe("App routing", () => {
  it("renders HomePage on root path", async () => {
    window.history.pushState({}, "", "/");

    render(<RouterProvider router={router} />);

    expect(await screen.findByText(/home/i)).toBeInTheDocument();
  });

  it("renders AboutPage on /about", async () => {
    window.history.pushState({}, "", "/about");

    render(<RouterProvider router={router} />);

    expect(await screen.findByText(/about/i)).toBeInTheDocument();
  });
});
