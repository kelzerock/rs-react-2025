import { fireEvent, render, screen } from "@testing-library/react";
import { PaginationSection } from "./Pagination";
import type { Pagination } from "../models/types/pagination";
import {
  BrowserRouter,
  MemoryRouter,
  Route,
  Routes,
  useLocation,
} from "react-router";

const createMockPage = (flag: boolean, overrides?: Partial<Pagination>) =>
  flag
    ? {
        firstPage: false,
        lastPage: false,
        numberOfElements: 10,
        pageNumber: 1,
        pageSize: 10,
        totalElements: 100,
        totalPages: 10,
        ...overrides,
      }
    : null;

const createWithRouter = (flag: boolean, overrides?: Partial<Pagination>) => (
  <BrowserRouter>
    <PaginationSection
      isLoading={false}
      page={createMockPage(flag, overrides)}
    />
  </BrowserRouter>
);

const createWithoutRouter = (
  flag: boolean,
  overrides?: Partial<Pagination>,
) => (
  <PaginationSection isLoading={false} page={createMockPage(flag, overrides)} />
);

const LocationDebug = () => {
  const location = useLocation();
  return <div data-testid="location">{location.search}</div>;
};

describe("Pagination component", () => {
  it("component correctly rendered", () => {
    render(createWithRouter(true));
    expect(screen.getByTestId("wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("prev")).toBeInTheDocument();
    expect(screen.getByTestId("page")).toBeInTheDocument();
    expect(screen.getByTestId("next")).toBeInTheDocument();
  });

  it("component doesn't rendered without page data", () => {
    render(createWithRouter(false));
    expect(screen.queryByTestId("wrapper")).not.toBeInTheDocument();
    expect(screen.queryByTestId("prev")).not.toBeInTheDocument();
    expect(screen.queryByTestId("page")).not.toBeInTheDocument();
    expect(screen.queryByTestId("next")).not.toBeInTheDocument();
  });

  it("if first page and last prev button disabled", () => {
    render(createWithRouter(true, { lastPage: true, firstPage: true }));
    expect(screen.getByTestId("prev")).toBeDisabled();
    expect(screen.getByTestId("next")).toBeDisabled();
  });

  it("renders correctly (snapshot)", () => {
    const { asFragment } = render(createWithRouter(true));
    expect(asFragment()).toMatchSnapshot();
  });

  it("click the 'prev' button", () => {
    render(
      <MemoryRouter initialEntries={["/?page=2"]}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {createWithoutRouter(true)}
                <LocationDebug />
              </>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByTestId("prev"));

    const search = screen.getByTestId("location").textContent;
    const params = new URLSearchParams(search || "");
    expect(params.get("page")).toBe("1");
  });

  it("click the 'next' button", () => {
    render(
      <MemoryRouter initialEntries={["/?page=2"]}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {createWithoutRouter(true)}
                <LocationDebug />
              </>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByTestId("next"));

    const search = screen.getByTestId("location").textContent;
    const params = new URLSearchParams(search || "");
    expect(params.get("page")).toBe("3");
  });
});
