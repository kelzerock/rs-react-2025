import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { HomePage } from "./HomePage";
import { Provider } from "react-redux";
import { store } from "../../store/store";

test("renders title and search component", () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <HomePage />
      </Provider>
    </MemoryRouter>,
  );

  expect(screen.getByText("StarTrek characters library:")).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

describe("test error at component", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.mock("../../utils/requestAPI", () => ({
      requestAPI: vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({}),
      }),
    }));
  });

  test("shows error message when API request fails", async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toHaveTextContent(
        "Error connecting to API. Status code: 500",
      );
    });
  });
});
