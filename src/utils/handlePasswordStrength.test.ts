import { describe, it, expect } from "vitest";
import { handlePasswordStrength } from "./handlePasswordStrength";

describe("handlePasswordStrength", () => {
  it("should return 0 for empty password", () => {
    const result = handlePasswordStrength("");
    expect(result).toBe(0);
  });

  it("should return 0 for password with only lowercase letters", () => {
    const result = handlePasswordStrength("password");
    expect(result).toBe(1);
  });

  it("should return 1 for password with only uppercase letters", () => {
    const result = handlePasswordStrength("PASSWORD");
    expect(result).toBe(1);
  });

  it("should return 1 for password with only numbers", () => {
    const result = handlePasswordStrength("123456");
    expect(result).toBe(1);
  });

  it("should return 1 for password with only special characters", () => {
    const result = handlePasswordStrength("!@#$%^&*");
    expect(result).toBe(1);
  });

  it("should return 2 for password with lowercase and uppercase letters", () => {
    const result = handlePasswordStrength("Password");
    expect(result).toBe(2);
  });

  it("should return 2 for password with lowercase letters and numbers", () => {
    const result = handlePasswordStrength("password123");
    expect(result).toBe(2);
  });

  it("should return 2 for password with lowercase letters and special characters", () => {
    const result = handlePasswordStrength("password!");
    expect(result).toBe(2);
  });

  it("should return 2 for password with uppercase letters and numbers", () => {
    const result = handlePasswordStrength("PASSWORD123");
    expect(result).toBe(2);
  });

  it("should return 2 for password with uppercase letters and special characters", () => {
    const result = handlePasswordStrength("PASSWORD!");
    expect(result).toBe(2);
  });

  it("should return 2 for password with numbers and special characters", () => {
    const result = handlePasswordStrength("123!@#");
    expect(result).toBe(2);
  });

  it("should return 3 for password with lowercase, uppercase and numbers", () => {
    const result = handlePasswordStrength("Password123");
    expect(result).toBe(3);
  });

  it("should return 3 for password with lowercase, uppercase and special characters", () => {
    const result = handlePasswordStrength("Password!");
    expect(result).toBe(3);
  });

  it("should return 3 for password with lowercase, numbers and special characters", () => {
    const result = handlePasswordStrength("password123!");
    expect(result).toBe(3);
  });

  it("should return 3 for password with uppercase, numbers and special characters", () => {
    const result = handlePasswordStrength("PASSWORD123!");
    expect(result).toBe(3);
  });

  it("should return 4 for password with all character types", () => {
    const result = handlePasswordStrength("Password123!");
    expect(result).toBe(4);
  });

  it("should return 4 for complex password with all character types", () => {
    const result = handlePasswordStrength("MyP@ssw0rd!");
    expect(result).toBe(4);
  });
});
