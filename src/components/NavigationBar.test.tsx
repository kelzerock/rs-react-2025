import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { NavigationBar } from "./NavigationBar";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { ThemeProvider } from "../context/themeProvider";

describe("Navigation bar component", () => {
  it("snapshot of component", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Provider store={store}>
            <NavigationBar />
          </Provider>
        </ThemeProvider>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders without crash", () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Provider store={store}>
            <NavigationBar />
          </Provider>
        </ThemeProvider>
      </MemoryRouter>,
    );
  });

  it("rendered main blocks", () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Provider store={store}>
            <NavigationBar />
          </Provider>
        </ThemeProvider>
      </MemoryRouter>,
    );
    expect(screen.getByTestId("wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByTestId("nav")).toBeInTheDocument();
  });
});
