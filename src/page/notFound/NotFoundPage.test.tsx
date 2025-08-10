import { render, screen } from "@testing-library/react";
import { NotFoundPage } from "./NotFoundPage";
import { MemoryRouter } from "react-router";

describe("NotFound component", () => {
  it("snapshot of component", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders without crash", () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );
  });

  it("rendered main blocks", () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("title-not-found-page")).toBeInTheDocument();
    expect(screen.getByTestId("link")).toBeInTheDocument();
  });
});
