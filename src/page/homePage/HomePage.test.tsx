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
    vi.mock("../../serviceAPI/stapiAPI", async () => {
      const actual = await vi.importActual<
        typeof import("../../serviceAPI/stapiAPI")
      >("../../serviceAPI/stapiAPI");

      return {
        ...actual,
        useGetCharactersQuery: vi.fn().mockReturnValue({
          data: undefined,
          isError: true,
          isFetching: false,
          error: {
            status: 500,
            data: { message: "Internal Server Error" },
          },
        }),
      };
    });
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
      expect(screen.getByTestId("error-status")).toHaveTextContent("500");
      expect(screen.getByTestId("error-data")).toHaveTextContent(
        "Internal Server Error",
      );
    });
  });
});
