import { describe, it, beforeEach, vi, expect } from "vitest";
import { downloadCSVFile } from "./downloadCVSFile";

const mockItems = [
  {
    uid: "CHMA0000280385",
    name: "A. Armaganian",
    gender: null,
    yearOfBirth: null,
    monthOfBirth: null,
    dayOfBirth: null,
    placeOfBirth: null,
    yearOfDeath: null,
    monthOfDeath: null,
    dayOfDeath: null,
    placeOfDeath: null,
    height: null,
    weight: null,
    deceased: null,
    bloodType: null,
    maritalStatus: null,
    serialNumber: null,
    hologramActivationDate: null,
    hologramStatus: null,
    hologramDateStatus: null,
    hologram: false,
    fictionalCharacter: false,
    mirror: false,
    alternateReality: false,
  },
  {
    uid: "CHMA0000026532",
    name: "A'trom",
    gender: null,
    yearOfBirth: null,
    monthOfBirth: null,
    dayOfBirth: null,
    placeOfBirth: null,
    yearOfDeath: null,
    monthOfDeath: null,
    dayOfDeath: null,
    placeOfDeath: null,
    height: null,
    weight: null,
    deceased: null,
    bloodType: null,
    maritalStatus: null,
    serialNumber: null,
    hologramActivationDate: null,
    hologramStatus: null,
    hologramDateStatus: null,
    hologram: false,
    fictionalCharacter: false,
    mirror: false,
    alternateReality: false,
  },
];

describe("downloadCSVFile", () => {
  let clickMock: () => void;

  beforeEach(() => {
    globalThis.URL.createObjectURL = vi.fn().mockReturnValue("blob:mock-url");
    clickMock = vi.fn();

    vi.spyOn(document, "createElement").mockImplementation(() => {
      return {
        download: "",
        href: "",
        style: { display: "" },
        click: clickMock,
      } as unknown as HTMLAnchorElement;
    });

    vi.spyOn(document.body, "appendChild").mockImplementation((node) => node);
    vi.spyOn(document.body, "removeChild").mockImplementation((node) => node);
    vi.spyOn(window.URL, "createObjectURL").mockReturnValue("blob:mock-url");
  });

  it("should create link and trigger download", () => {
    downloadCSVFile(mockItems);

    expect(document.createElement).toHaveBeenCalledWith("a");
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(document.body.appendChild).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalled();
    expect(document.body.removeChild).toHaveBeenCalled();
  });
});
