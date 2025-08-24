import { render, screen } from "@testing-library/react";
import { ControlledForm } from "./ControlledForm";
import { Provider } from "react-redux";
import { store } from "../../store/store";

describe("ControlledForm", () => {
  it("should render", () => {
    render(
      <Provider store={store}>
        <ControlledForm close={() => {}} />
      </Provider>,
    );
  });

  it("should render all inputs", () => {
    render(
      <Provider store={store}>
        <ControlledForm close={() => {}} />
      </Provider>,
    );
    expect(screen.getByTestId("name-input")).toBeInTheDocument();
    expect(screen.getByTestId("age-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-password-input")).toBeInTheDocument();
    expect(screen.getByTestId("gender-input")).toBeInTheDocument();
    expect(screen.getByTestId("accept-terms-input")).toBeInTheDocument();
    expect(screen.getByTestId("picture-input")).toBeInTheDocument();
    expect(screen.getByTestId("country-input")).toBeInTheDocument();
  });
});
