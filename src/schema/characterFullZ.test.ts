import { describe, expect, it } from "vitest";
import { CharacterFullZ } from "./characterFullZ";

describe("CharacterFullZ schema", () => {
  it("should accept valid object", () => {
    const data = { uid: "123", name: "test" };
    const result = CharacterFullZ.safeParse(data);
    expect(result.success).toBe(true);
  });
  it("should accept valid object with overwhelmed data", () => {
    const data = { uid: "123", name: "test", xx: "xx" };
    const result = CharacterFullZ.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should reject missing uid", () => {
    const data = { name: "test" };
    const result = CharacterFullZ.safeParse(data);
    expect(result.success).toBe(false);
  });
});
