import type { MainResponse } from "../../models/types/mainResponse";
import { isResponse } from "./isResponse";

describe("isResponse", () => {
  const validResponse = {
    characters: [{ uid: "1", name: "Alice" }],
    page: {
      firstPage: true,
      lastPage: false,
      numberOfElements: 10,
      pageNumber: 1,
      pageSize: 20,
      totalElements: 100,
      totalPages: 5,
    },
  };

  it("returns true for valid MainResponse object", () => {
    expect(isResponse(validResponse)).toBe(true);
  });

  it("returns false if characters is not an array", () => {
    const invalid = { ...validResponse, characters: "not-an-array" };
    expect(isResponse(invalid)).toBe(false);
  });

  it("returns false if characters contain invalid items", () => {
    const invalid = {
      ...validResponse,
      characters: [{ uid: 1, name: "Alice" }], // uid should be string
    };
    expect(isResponse(invalid)).toBe(false);
  });

  it("returns false if page is missing", () => {
    const invalid: Partial<MainResponse> = { ...validResponse };
    delete invalid.page;
    expect(isResponse(invalid)).toBe(false);
  });

  it("returns false if page is null", () => {
    const invalid = { ...validResponse, page: null };
    expect(isResponse(invalid)).toBe(false);
  });

  it("returns false if page has incorrect types", () => {
    const brokenPage = {
      firstPage: "yes",
      lastPage: false,
      numberOfElements: "ten",
      pageNumber: "1",
      pageSize: 20,
      totalElements: 100,
      totalPages: "five",
    };
    expect(isResponse({ ...validResponse, page: brokenPage })).toBe(false);
  });

  it("returns false for completely unrelated data", () => {
    expect(isResponse("just a string")).toBe(false);
    expect(isResponse(null)).toBe(false);
    expect(isResponse(42)).toBe(false);
    expect(isResponse({})).toBe(false);
  });

  it("returns false if page fields are missing", () => {
    const incompletePage = {
      firstPage: true,
    };
    expect(
      isResponse({
        characters: validResponse.characters,
        page: incompletePage,
      }),
    ).toBe(false);
  });
});
