import { render, screen } from "@testing-library/react";
import AboutPage from "./AboutPage";

describe("AboutPage component", () => {
  it("snapshot of component", () => {
    const { asFragment } = render(<AboutPage />);
    expect(asFragment).toMatchSnapshot();
  });

  it("rendered main blocks", () => {
    render(<AboutPage />);
    expect(screen.getByTestId("wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("addition-info")).toBeInTheDocument();
    expect(screen.getByTestId("logo-rs")).toBeInTheDocument();
  });
});
