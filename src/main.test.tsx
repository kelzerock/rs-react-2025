import "./main"; // просто импортирует файл и выполняет код

vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

import { createRoot } from "react-dom/client";
const mockedCreateRoot = vi.mocked(createRoot, { deep: true });
test("calls createRoot and render App", () => {
  expect(mockedCreateRoot).toHaveBeenCalled();
  const root = mockedCreateRoot.mock.calls[0][0];
  if (root instanceof HTMLElement) {
    expect(root.id).toBe("root");
  } else {
    throw new Error("Expected HTMLElement for root container");
  }
});
