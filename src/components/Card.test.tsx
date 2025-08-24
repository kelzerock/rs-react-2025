import { render, screen } from "@testing-library/react";
import type { SchemaFormTypeForDb } from "../models/types/schemaFormForDb";
import { Card } from "./Card";

const card: SchemaFormTypeForDb = {
  name: "John Doe",
  age: 10,
  email: "john.doe@example.com",
  password: "password",
  confirmPassword: "password",
  gender: "male",
  acceptTerms: true,
  picture: "string-to-picture",
  country: "string",
  id: "1",
};

describe("Card", () => {
  it("should render", () => {
    render(<Card card={card} />);
  });

  it("should render card information", () => {
    render(<Card card={card} />);
    expect(screen.getByTestId("card-name")).toHaveTextContent("Name: John Doe");
    expect(screen.getByTestId("card-age")).toHaveTextContent("Age: 10");
    expect(screen.getByTestId("card-password")).toHaveTextContent(
      "Password: password",
    );
    expect(screen.getByTestId("card-email")).toHaveTextContent(
      "Email: john.doe@example.com",
    );
  });

  it("should render card image", () => {
    render(<Card card={card} />);
    expect(screen.getByTestId("card-image")).toHaveAttribute(
      "src",
      "string-to-picture",
    );
  });

  it("should not render new label", () => {
    render(<Card card={card} />);
    expect(screen.queryByTestId("card-new")).not.toBeInTheDocument();
  });

  it("should render new label", () => {
    card.id = new Date().getTime().toString();
    render(<Card card={card} />);
    expect(screen.getByTestId("card-new")).toHaveTextContent("NEW!");
  });
});
