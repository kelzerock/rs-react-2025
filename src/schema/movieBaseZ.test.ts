import { describe, expect, it } from "vitest";
import { MovieBaseZ } from "./movieBaseZ";

describe("MovieBaseZ schema", () => {
  it("should accept valid object", () => {
    const data = { uid: "123", title: "test" };
    const result = MovieBaseZ.safeParse(data);
    expect(result.success).toBe(true);
  });
  it("should accept valid object with overwhelmed data", () => {
    const data = { uid: "123", title: "test", xx: "xx" };
    const result = MovieBaseZ.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should reject missing uid", () => {
    const data = { title: "test" };
    const result = MovieBaseZ.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should reject with incorrect property", () => {
    const data = { uid: "123", name: "test" };
    const result = MovieBaseZ.safeParse(data);
    expect(result.success).toBe(false);
  });
});
