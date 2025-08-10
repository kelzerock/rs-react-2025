import { fireEvent, render, screen } from "@testing-library/react";
import { CloseIcon } from "./CloseIcon";

describe("CloseIcon component", () => {
  it("snapshot of component", () => {
    const { asFragment } = render(<CloseIcon onClick={() => {}} />);
    expect(asFragment).toMatchSnapshot();
  });

  it("render main block", () => {
    render(<CloseIcon onClick={() => {}} />);
    expect(screen.getByTestId("wrapper")).toBeInTheDocument();
    expect(screen.getByText("x")).toBeInTheDocument();
  });

  it("function onClick from props execute after click on element", () => {
    const mockOnClick = vi.fn();
    render(<CloseIcon onClick={mockOnClick} />);
    fireEvent.click(screen.getByTestId("wrapper"));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
