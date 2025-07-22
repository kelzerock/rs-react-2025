import { render, screen } from "@testing-library/react";
import { ListOfCharacters } from "./ListOfCharacters";
import type { MainCharacter } from "../models/types/mainCharacter";

vi.mock("./Character", () => ({
  Character: ({ character }: { character: MainCharacter }) => (
    <li>
      <div>{character.name}</div>
      <div>{character.gender ?? "Unknown gender"}</div>
      <div>{character.alternateReality ? "Alternate" : "Original"}</div>
      <div>{character.bloodType ?? "Unknown blood type"}</div>
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
  render(<ListOfCharacters characters={fullData} />);
  const items = screen.getAllByRole("listitem");
  expect(items).toHaveLength(2);
});

test("renders all character fields correctly", () => {
  render(<ListOfCharacters characters={fullData} />);
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
  render(<ListOfCharacters characters={partial} />);
  expect(screen.getByText("Test 3")).toBeInTheDocument();
  expect(screen.getByText("Unknown gender")).toBeInTheDocument();
  expect(screen.getByText("Original")).toBeInTheDocument();
  expect(screen.getByText("Unknown blood type")).toBeInTheDocument();
});

test("shows empty state message when list is empty", () => {
  render(<ListOfCharacters characters={[]} />);
  expect(screen.getByText(/characters are absent/i)).toBeInTheDocument();
});
