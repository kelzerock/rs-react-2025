export const LocalStorageKey = {
  inputData: "inputData",
} as const;

export type LocalStorageKeyType =
  (typeof LocalStorageKey)[keyof typeof LocalStorageKey];
