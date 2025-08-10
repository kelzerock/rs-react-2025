import { describe, expect, it } from "vitest";
import { EpisodeBaseZ } from "./episodeBaseZ";

describe("EpisodeBaseZ schema", () => {
  it("should accept valid object", () => {
    const data = { uid: "123", title: "test" };
    const result = EpisodeBaseZ.safeParse(data);
    expect(result.success).toBe(true);
  });
  it("should accept valid object with overwhelmed data", () => {
    const data = { uid: "123", title: "test", xx: "xx" };
    const result = EpisodeBaseZ.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should reject missing uid", () => {
    const data = { title: "test" };
    const result = EpisodeBaseZ.safeParse(data);
    expect(result.success).toBe(false);
  });
});
