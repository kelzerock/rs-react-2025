import { render, screen } from "@testing-library/react";
import { ListOfCharacters } from "./ListOfCharacters";
import type { MainCharacter } from "../models/types/mainCharacter";

vi.mock("./Character", () => ({
  Character: ({ data }: { data: MainCharacter }) => (
    <li>
      <div>{data.name}</div>
      <div>{data.gender ?? "Unknown gender"}</div>
      <div>{data.alternateReality ? "Alternate" : "Original"}</div>
      <div>{data.bloodType ?? "Unknown blood type"}</div>
    </li>
  ),
}));

const fullData: MainCharacter[] = [
  {
    uid: "1",
    name: "Test 1",
    gender: "Male",
    alternateReality: false,
    bloodType: "O",
  },
  {
    uid: "2",
    name: "Test 2",
    gender: "Female",
    alternateReality: true,
    bloodType: "AB",
  },
];

test("renders correct number of characters", () => {
  render(<ListOfCharacters list={fullData} />);
  const items = screen.getAllByRole("listitem");
  expect(items).toHaveLength(2);
});

test("renders all character fields correctly", () => {
  render(<ListOfCharacters list={fullData} />);
  expect(screen.getByText("Test 1")).toBeInTheDocument();
  expect(screen.getByText("Male")).toBeInTheDocument();
  expect(screen.getByText("Original")).toBeInTheDocument();
  expect(screen.getByText("O")).toBeInTheDocument();

  expect(screen.getByText("Test 2")).toBeInTheDocument();
  expect(screen.getByText("Female")).toBeInTheDocument();
  expect(screen.getByText("Alternate")).toBeInTheDocument();
  expect(screen.getByText("AB")).toBeInTheDocument();
});

test("renders fallback values for missing optional fields", () => {
  const partial: MainCharacter[] = [
    {
      uid: "3",
      name: "Test 3",
    },
  ];
  render(<ListOfCharacters list={partial} />);
  expect(screen.getByText("Test 3")).toBeInTheDocument();
  expect(screen.getByText("Unknown gender")).toBeInTheDocument();
  expect(screen.getByText("Original")).toBeInTheDocument();
  expect(screen.getByText("Unknown blood type")).toBeInTheDocument();
});

test("shows empty state message when list is empty", () => {
  render(<ListOfCharacters list={[]} />);
  expect(screen.getByText(/characters are absent/i)).toBeInTheDocument();
});
