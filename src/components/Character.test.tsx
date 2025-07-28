import { fireEvent, render, screen } from "@testing-library/react";
import { Character } from "./Character";

describe("Character component", () => {
  it("All props view correctly", () => {
    render(
      <Character
        character={{
          uid: "1",
          name: "test",
          gender: "V",
          alternateReality: true,
          bloodType: "blood",
        }}
        onClick={() => {}}
      />,
    );
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("V")).toBeInTheDocument();
    expect(screen.getByText("blood")).toBeInTheDocument();
    expect(
      screen.getByTestId("info-alternateReality-true"),
    ).toBeInTheDocument();
  });

  it("correct view with only required props", () => {
    render(
      <Character
        character={{
          uid: "1",
          name: "test",
        }}
        onClick={() => {}}
      />,
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
      <Character
        character={{
          uid: "1",
          name: "test",
        }}
        onClick={mockOnClick}
      />,
    );
    const card = screen.getByTestId("wrapper");
    fireEvent.click(card);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("renders correctly", () => {
    const { asFragment } = render(
      <Character
        character={{
          uid: "1",
          name: "test",
        }}
        onClick={() => {}}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
