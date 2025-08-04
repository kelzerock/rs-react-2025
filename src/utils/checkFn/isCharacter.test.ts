import { isCharacter } from "./isCharacter";

describe("isCharacter", () => {
  it("returns true for a valid MainCharacter", () => {
    expect(isCharacter({ uid: "123", name: "Alice" })).toBe(true);
  });

  it("returns true for a valid MainCharacter with partial data", () => {
    expect(isCharacter({ uid: "123", name: "Alice", gender: "male" })).toBe(
      true,
    );
  });

  it("returns false if uid is missing", () => {
    expect(isCharacter({ name: "Alice" })).toBe(false);
  });

  it("returns false if uid is not a string", () => {
    expect(isCharacter({ uid: 123, name: "Alice" })).toBe(false);
  });

  it("returns false for null", () => {
    expect(isCharacter(null)).toBe(false);
  });

  it("returns false for non-object values", () => {
    expect(isCharacter("just a string")).toBe(false);
  });
});
