import { render, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import App from "./App";

vi.mock("./utils/requestAPI", () => ({
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

vi.mock("./utils/checkFn/isResponse", () => ({
  isResponse: vi.fn(() => true),
}));

vi.mock("./utils/loadDataFromLocalStorage", () => ({
  loadDataFromLocalStorage: vi.fn(() => "Test LS"),
}));

test("renders loading indicator while isLoading is true", async () => {
  render(<App />);
  waitFor(() => {
    expect(screen.getByText(/loading data\.\.\./i)).toBeInTheDocument();
  });
});

test("hides loading indicator after data is fetched", async () => {
  render(<App />);
  await waitFor(() =>
    expect(screen.queryByText(/loading data\.\.\./i)).not.toBeInTheDocument(),
  );
});

test("loading indicator has proper ARIA label", async () => {
  render(<App />);
  waitFor(() => {
    const loader = screen.getByLabelText("Loading data...");
    expect(loader).toBeInTheDocument();
  });
});

test("makes initial API call on component mount", async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText("Test 1")).toBeInTheDocument();
  });
});

test("uses localStorage search term on initial load", async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByDisplayValue("Test LS")).toBeInTheDocument();
  });
});

test("shows and hides loading indicator correctly", async () => {
  render(<App />);
  expect(screen.getByText(/loading data/i)).toBeInTheDocument();

  await waitFor(() =>
    expect(screen.queryByText(/loading data/i)).not.toBeInTheDocument(),
  );
});
