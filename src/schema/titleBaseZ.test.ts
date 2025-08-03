import { describe, expect, it } from "vitest";
import { TitleBaseZ } from "./titleBaseZ";

describe("TitleBaseZ schema", () => {
  it("should accept valid object", () => {
    const data = { uid: "123", name: "test" };
    const result = TitleBaseZ.safeParse(data);
    expect(result.success).toBe(true);
  });
  it("should accept valid object with overwhelmed data", () => {
    const data = { uid: "123", name: "test", xx: "xx" };
    const result = TitleBaseZ.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should reject missing uid", () => {
    const data = { name: "test" };
    const result = TitleBaseZ.safeParse(data);
    expect(result.success).toBe(false);
  });
});
