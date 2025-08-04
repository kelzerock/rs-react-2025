import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer component", () => {
  it("hav link to the github author", () => {
    render(<Footer />);
    expect(screen.getByText(/created by/i));
    expect(screen.getByText(/Aleksei Zhuchkov/i));
    expect(screen.getByTestId("link-to-author"));
  });

  it("hav link to RSSCHOOL", () => {
    render(<Footer />);
    expect(screen.getByText(/RSSchool 2025 react/i));
    expect(screen.getByTestId("link-to-rsschool"));
  });
});
