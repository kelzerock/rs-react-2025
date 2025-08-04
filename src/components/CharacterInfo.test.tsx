import { render, screen, waitFor } from "@testing-library/react";
import { CharacterInfo } from "./CharacterInfo";
import { MemoryRouter } from "react-router";

const createWithRouter = () => (
  <MemoryRouter>
    <CharacterInfo />
  </MemoryRouter>
);

describe("CharacterInfo component", () => {
  it("snapshot of component", () => {
    const { asFragment } = render(createWithRouter());
    expect(asFragment).toMatchSnapshot();
  });

  test("renders without crash", () => {
    render(createWithRouter());
  });

  it("rendered main blocks that suggest to choose person", () => {
    render(createWithRouter());
    expect(
      screen.getByText(/Select a character to view detailed information/i),
    ).toBeInTheDocument();
  });
});

describe("CharacterInfo component - success", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.doMock("../utils/requestAPI", () => ({
      requestAPI: vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              character: { name: "Rick", species: "Human" },
            }),
        }),
      ),
    }));
  });

  afterEach(() => {
    vi.resetModules();
  });

  it("loads and displays character info from query param", async () => {
    const { CharacterInfo } = await import("./CharacterInfo");
    render(
      <MemoryRouter initialEntries={["/?details=1"]}>
        <CharacterInfo />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("main-title")).toBeInTheDocument();
    });

    expect(screen.getByText("name : Rick")).toBeInTheDocument();
    expect(screen.getByText("species : Human")).toBeInTheDocument();
  });
});

describe("CharacterInfo component - failure", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.doMock("../utils/requestAPI", () => ({
      requestAPI: vi.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({}),
        }),
      ),
    }));
  });

  afterEach(() => {
    vi.resetModules();
  });

  it("handles failed API response", async () => {
    const { CharacterInfo } = await import("./CharacterInfo");
    render(
      <MemoryRouter initialEntries={["/?details=1"]}>
        <CharacterInfo />
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(
        screen.getByText("Select a character to view detailed information"),
      ).toBeInTheDocument(),
    );
  });
});

describe("render multiple array data", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.doMock("../utils/requestAPI", () => ({
      requestAPI: vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              character: {
                name: "Morty",
                origin: { name: "Earth", type: "Planet" },
                episodes: ["Pilot", "Lawnmower Dog"],
              },
            }),
        }),
      ),
    }));
  });

  afterEach(() => {
    vi.resetModules();
  });

  test("renders nested object and arrays", async () => {
    const { CharacterInfo } = await import("./CharacterInfo");
    render(
      <MemoryRouter initialEntries={["/?details=2"]}>
        <CharacterInfo />
      </MemoryRouter>,
    );

    await waitFor(() => screen.getByTestId("main-title"));

    expect(screen.getByText("name : Morty")).toBeInTheDocument();
    expect(screen.getByText("origin:")).toBeInTheDocument();
    expect(screen.getByText("name : Earth")).toBeInTheDocument();
    expect(screen.getByText("type : Planet")).toBeInTheDocument();
    expect(screen.getByText("Pilot")).toBeInTheDocument();
  });
});

describe("testing loader", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();

    vi.mock("../utils/requestAPI", () => ({
      requestAPI: vi.fn(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                ok: true,
                json: () => Promise.resolve({ character: { name: "Beth" } }),
              });
            }, 1000);
          }),
      ),
    }));
  });

  afterEach(() => {
    vi.resetModules();
  });

  test("displays loader while fetching", async () => {
    render(
      <MemoryRouter initialEntries={["/?details=3"]}>
        <CharacterInfo />
      </MemoryRouter>,
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
