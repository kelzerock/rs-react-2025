import { render, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import App from "./App";

describe("API successful", () => {
  beforeEach(async () => {
    vi.resetModules();

    vi.doMock("./utils/requestAPI", () => ({
      requestAPI: vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            characters: [{ uid: "1", name: "Test 1" }],
          }),
        }),
      ),
    }));

    vi.doMock("./utils/loadDataFromLocalStorage", () => ({
      loadDataFromLocalStorage: vi.fn(() => "Test LS"),
    }));

    vi.doMock("./utils/checkFn/isResponse", () => ({
      isResponse: vi.fn(() => true),
    }));
  });

  test("renders loading indicator while isLoading is true", async () => {
    const { default: App } = await import("./App");
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/loading data\.\.\./i)).toBeInTheDocument();
    });
  });

  test("hides loading indicator after data is fetched", async () => {
    const { default: App } = await import("./App");
    render(<App />);
    await waitFor(() =>
      expect(screen.queryByText(/loading data\.\.\./i)).not.toBeInTheDocument(),
    );
  });

  test("loading indicator has proper ARIA label", async () => {
    const { default: App } = await import("./App");
    render(<App />);
    await waitFor(() => {
      const loader = screen.getByLabelText("Loading data...");
      expect(loader).toBeInTheDocument();
    });
  });

  test("makes initial API call on component mount", async () => {
    const { default: App } = await import("./App");
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Test 1")).toBeInTheDocument();
    });
  });

  test("uses localStorage search term on initial load", async () => {
    const { default: App } = await import("./App");
    render(<App />);
    await waitFor(() => {
      expect(screen.getByDisplayValue("Test LS")).toBeInTheDocument();
    });
  });

  test("shows and hides loading indicator correctly", async () => {
    const { default: App } = await import("./App");
    render(<App />);
    expect(screen.getByText(/loading data/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByText(/loading data/i)).not.toBeInTheDocument(),
    );
  });

  test("calls API with correct parameters", async () => {
    const { requestAPI } = await import("./utils/requestAPI");
    const mockedRequestAPI = vi.mocked(requestAPI);
    const { default: App } = await import("./App");
    render(<App />);
    await waitFor(() => {
      expect(mockedRequestAPI).toHaveBeenCalledWith("Test LS");
    });
  });

  test("handles successful API response", async () => {
    const { default: App } = await import("./App");
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Test 1")).toBeInTheDocument();
    });
  });
});

describe("API Error Handling", () => {
  beforeEach(() => {
    vi.mock("./utils/requestAPI", () => ({
      requestAPI: vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          json: async () => ({}),
        }),
      ),
    }));
  });

  test("handles API error response", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
      expect(screen.getByText(/status code: 500/i)).toBeInTheDocument();
    });
  });
});
