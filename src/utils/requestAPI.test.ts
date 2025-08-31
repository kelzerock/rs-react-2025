import { requestAPI } from "./requestAPI";
import { Methods } from "../models/enums/methods";
import { LINK_TO_API } from "../constant/global-constant";

describe("requestAPI", () => {
  const mockFetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    }),
  );

  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch);
    mockFetch.mockClear();
  });

  it("makes a GET request with query string", async () => {
    const queries = new URLSearchParams({ q: "search", page: "2" });

    await requestAPI({
      method: Methods.GET,
      queries,
      path: "/characters",
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/characters?q=search&page=2"),
      expect.objectContaining({ method: Methods.GET }),
    );
  });

  it("makes a POST request with body as URLSearchParams", async () => {
    const body = { name: "Alexey", uid: "007" };

    await requestAPI({
      method: Methods.POST,
      body,
      path: "/submit",
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/submit"),
      expect.objectContaining({
        method: Methods.POST,
        body: new URLSearchParams(body),
      }),
    );
  });

  it("handles missing query and path gracefully", async () => {
    await requestAPI({ method: Methods.GET });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining(LINK_TO_API), // base URL
      expect.objectContaining({ method: Methods.GET }),
    );
  });
});
