import { render, screen } from "@testing-library/react";
import { HomePage } from "./HomePage";
import { Provider } from "react-redux";
import { store } from "../../store/store";

test("renders title and search component", () => {
  render(
    <Provider store={store}>
      <HomePage />
    </Provider>,
  );
  expect(screen.getByTestId("test-main")).toBeInTheDocument();
});
