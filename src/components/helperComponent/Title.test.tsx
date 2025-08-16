import { render, screen } from "@testing-library/react";
import { Title } from "./Title";

describe("Title component", () => {
  it("snapshot component", () => {
    const { asFragment } = render(<Title title="test title" />);
    expect(asFragment).toMatchSnapshot();
  });

  it("correct rendered main elements, and props", () => {
    const title = "some text";
    render(<Title title={title} />);
    expect(screen.getByTestId("wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByText(title));
  });
});
