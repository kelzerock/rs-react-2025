import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { NavigationBar } from "./NavigationBar";

describe("Navigation bar component", () => {
  it("snapshot of component", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders without crash", () => {
    render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>,
    );
  });

  it("rendered main blocks", () => {
    render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByTestId("nav")).toBeInTheDocument();
  });
});
