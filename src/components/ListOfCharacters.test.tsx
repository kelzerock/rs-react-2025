import { render, screen } from "@testing-library/react";
import { ListOfCharacters } from "./ListOfCharacters";
import { MemoryRouter } from "react-router";

describe("basic test for ListOfCharacters", () => {
  test("displays loader when isLoading is true", () => {
    render(
      <MemoryRouter>
        <ListOfCharacters characters={[]} isLoading={true} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("displays title when no characters are present", () => {
    render(
      <MemoryRouter>
        <ListOfCharacters characters={[]} isLoading={false} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Characters are absent")).toBeInTheDocument();
  });
});
