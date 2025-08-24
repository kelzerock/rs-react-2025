import { render, screen } from "@testing-library/react";
import { PasswordStrength } from "./PasswordStrength";

describe("PasswordStrength", () => {
  it("should render", () => {
    render(<PasswordStrength password="password" />);
  });

  it("should render password strength", () => {
    render(<PasswordStrength password="password" />);
    expect(screen.getByTestId("password-strength-0")).toBeInTheDocument();
    expect(screen.queryByTestId("password-strength-1")).toBe(null);
    expect(screen.queryByTestId("password-strength-2")).toBe(null);
    expect(screen.queryByTestId("password-strength-3")).toBe(null);
  });

  it("should render password strength 1", () => {
    render(<PasswordStrength password="Password" />);
    expect(screen.getByTestId("password-strength-0")).toBeInTheDocument();
    expect(screen.getByTestId("password-strength-1")).toBeInTheDocument();
    expect(screen.queryByTestId("password-strength-2")).toBe(null);
    expect(screen.queryByTestId("password-strength-3")).toBe(null);
  });

  it("should render password strength 2", () => {
    render(<PasswordStrength password="Password123" />);
    expect(screen.getByTestId("password-strength-0")).toBeInTheDocument();
    expect(screen.getByTestId("password-strength-1")).toBeInTheDocument();
    expect(screen.getByTestId("password-strength-2")).toBeInTheDocument();
    expect(screen.queryByTestId("password-strength-3")).toBe(null);
  });

  it("should render password strength 3", () => {
    render(<PasswordStrength password="Password123!" />);
    expect(screen.getByTestId("password-strength-0")).toBeInTheDocument();
    expect(screen.getByTestId("password-strength-1")).toBeInTheDocument();
    expect(screen.getByTestId("password-strength-2")).toBeInTheDocument();
    expect(screen.getByTestId("password-strength-3")).toBeInTheDocument();
  });
});
