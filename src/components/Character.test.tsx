import { render, screen } from "@testing-library/react";
import { Character } from "./Character";

describe("Character component", () => {
  it("All props view correctly", () => {
    render(
      <Character
        data={{
          uid: "1",
          name: "test",
          gender: "V",
          alternateReality: true,
          bloodType: "blood",
        }}
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
        data={{
          uid: "1",
          name: "test",
        }}
      />,
    );
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByTestId("gender-false")).toBeInTheDocument();
    expect(
      screen.getByTestId("info-alternateReality-false"),
    ).toBeInTheDocument();
  });
});
