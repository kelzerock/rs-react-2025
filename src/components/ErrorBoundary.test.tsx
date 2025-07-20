import { render, screen } from "@testing-library/react";
import { CrashComponent } from "./CrashComponent";
import { ErrorBoundary } from "./ErrorBoundary";
const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

test("renders fallback UI when CrashComponent throws", () => {
  render(
    <ErrorBoundary>
      <CrashComponent />
    </ErrorBoundary>,
  );

  expect(errorSpy).toHaveBeenCalled();
  errorSpy.mockRestore();
  expect(screen.getByText("Something went wrong...")).toBeInTheDocument();
  expect(screen.getByText("Reload page")).toBeInTheDocument();
  expect(screen.getByTestId("error-boundary-wrapper")).toBeInTheDocument();
  expect(screen.getByTestId("error-boundary-title")).toBeInTheDocument();
  expect(screen.getByTestId("error-boundary-btn-back")).toBeInTheDocument();
});
