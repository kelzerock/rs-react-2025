import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { NavigationBar } from "./NavigationBar";
import { Provider } from "react-redux";
import { store } from "../store/store";

describe("Navigation bar component", () => {
  it("snapshot of component", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Provider store={store}>
          <NavigationBar />
        </Provider>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders without crash", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <NavigationBar />
        </Provider>
      </MemoryRouter>,
    );
  });

  it("rendered main blocks", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <NavigationBar />
        </Provider>
      </MemoryRouter>,
    );
    expect(screen.getByTestId("wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByTestId("nav")).toBeInTheDocument();
  });
});
