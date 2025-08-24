import { render, screen } from "@testing-library/react";
import { CardList } from "./CardList";

describe("CardList", () => {
  it("should render", () => {
    render(<CardList list={[]} />);
  });

  it("should render cards wrapper", () => {
    render(<CardList list={[]} />);
    expect(screen.getByTestId("card-list")).toBeInTheDocument();
  });

  it("should render cards information", () => {
    render(
      <CardList
        list={[
          {
            name: "John Doe",
            age: 10,
            email: "john.doe@example.com",
            password: "password",
            confirmPassword: "password",
            gender: "male",
            acceptTerms: true,
            picture: "string",
            country: "string",
            id: "1",
          },
          {
            name: "John Doe",
            age: 10,
            email: "john.doe@example.com",
            password: "password",
            confirmPassword: "password",
            gender: "male",
            acceptTerms: true,
            picture: "string",
            country: "string",
            id: "2",
          },
        ]}
      />,
    );
    expect(screen.getAllByTestId("card")).toHaveLength(2);
  });
});
