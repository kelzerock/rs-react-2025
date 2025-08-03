import { fireEvent, render, screen } from "@testing-library/react";
import { Character } from "./Character";
import { Provider } from "react-redux";
import { store } from "../store/store";

describe("Character component", () => {
  it("All props view correctly", () => {
    render(
      <Provider store={store}>
        <Character
          character={{
            uid: "1",
            name: "test",
            gender: "M",
            alternateReality: true,
            bloodType: "B_NEGATIVE",
          }}
          onClick={() => {}}
        />
        ,
      </Provider>,
    );
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("M")).toBeInTheDocument();
    expect(screen.getByText("B_NEGATIVE")).toBeInTheDocument();
    expect(
      screen.getByTestId("info-alternateReality-true"),
    ).toBeInTheDocument();
  });

  it("correct view with only required props", () => {
    render(
      <Provider store={store}>
        <Character
          character={{
            uid: "1",
            name: "test",
          }}
          onClick={() => {}}
        />
      </Provider>,
    );
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByTestId("gender-false")).toBeInTheDocument();
    expect(
      screen.getByTestId("info-alternateReality-false"),
    ).toBeInTheDocument();
  });

  it("execute function onClick when click on the card", () => {
    const mockOnClick = vi.fn();
    render(
      <Provider store={store}>
        <Character
          character={{
            uid: "1",
            name: "test",
          }}
          onClick={mockOnClick}
        />
      </Provider>,
    );
    const buttonMoreInfo = screen.getByTestId("btn-more-info");
    fireEvent.click(buttonMoreInfo);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("renders correctly", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Character
          character={{
            uid: "1",
            name: "test",
          }}
          onClick={() => {}}
        />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
