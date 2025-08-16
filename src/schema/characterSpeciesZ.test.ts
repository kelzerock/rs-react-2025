import { describe, expect, it } from "vitest";
import { CharacterSpeciesZ } from "./characterSpeciesZ";

describe("CharacterSpeciesZ schema", () => {
  it("should accept valid object", () => {
    const data = { uid: "123", name: "test" };
    const result = CharacterSpeciesZ.safeParse(data);
    expect(result.success).toBe(true);
  });
  it("should accept valid object with overwhelmed data", () => {
    const data = { uid: "123", name: "test", xx: "xx" };
    const result = CharacterSpeciesZ.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should correct without data", () => {
    const data = {};
    const result = CharacterSpeciesZ.safeParse(data);
    expect(result.success).toBe(true);
  });
  it("should reject without primitive data", () => {
    const data = "test";
    const result = CharacterSpeciesZ.safeParse(data);
    expect(result.success).toBe(false);
  });
  it("should reject without data", () => {
    const data = 5;
    const result = CharacterSpeciesZ.safeParse(data);
    expect(result.success).toBe(false);
  });
});
