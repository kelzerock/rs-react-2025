import { describe, it, beforeEach, vi, expect } from "vitest";
import { fileToBase64 } from "./fileToBase64";

describe("fileToBase64", () => {
  let mockFileReader: {
    onload: ((event: ProgressEvent<FileReader>) => void) | null;
    onerror: ((event: ProgressEvent<FileReader>) => void) | null;
    readAsDataURL: (file: File) => void;
    result: string | ArrayBuffer | null;
    error: DOMException | null;
  };

  beforeEach(() => {
    mockFileReader = {
      onload: null,
      onerror: null,
      readAsDataURL: vi.fn(),
      result: null,
      error: null,
    };

    // @ts-expect-error - mock FileReader for tests
    global.FileReader = vi.fn().mockImplementation(() => mockFileReader);
  });

  it("should convert file to base64 successfully", async () => {
    const mockFile = new File(["test content"], "test.txt", {
      type: "text/plain",
    });

    const mockBase64Result = "data:text/plain;base64,dGVzdCBjb250ZW50";

    const promise = fileToBase64(mockFile);

    mockFileReader.result = mockBase64Result;
    mockFileReader.onload?.({} as ProgressEvent<FileReader>);

    const result = await promise;
    expect(result).toBe(mockBase64Result);
    expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(mockFile);
  });

  it("should reject when FileReader result is null", async () => {
    const mockFile = new File(["test content"], "test.txt", {
      type: "text/plain",
    });

    const promise = fileToBase64(mockFile);

    mockFileReader.result = null;
    mockFileReader.onload?.({} as ProgressEvent<FileReader>);

    await expect(promise).rejects.toBe("Ошибка: результат не является строкой");
  });

  it("should handle image file conversion", async () => {
    const mockImageFile = new File(["image data"], "test.jpg", {
      type: "image/jpeg",
    });

    const mockImageBase64 = "data:image/jpeg;base64,aW1hZ2UgZGF0YQ==";

    const promise = fileToBase64(mockImageFile);

    mockFileReader.result = mockImageBase64;
    mockFileReader.onload?.({} as ProgressEvent<FileReader>);

    const result = await promise;
    expect(result).toBe(mockImageBase64);
    expect(result).toMatch(/^data:image\/jpeg;base64,/);
  });

  it("should handle empty file", async () => {
    const mockEmptyFile = new File([""], "empty.txt", {
      type: "text/plain",
    });

    const mockEmptyBase64 = "data:text/plain;base64,";

    const promise = fileToBase64(mockEmptyFile);

    mockFileReader.result = mockEmptyBase64;
    mockFileReader.onload?.({} as ProgressEvent<FileReader>);

    const result = await promise;
    expect(result).toBe(mockEmptyBase64);
  });
});
