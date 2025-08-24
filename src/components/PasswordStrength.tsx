import { handlePasswordStrength } from "../utils/handlePasswordStrength";

export const PasswordStrength = ({ password }: { password: string }) => {
  const passStrength = handlePasswordStrength(password);
  return (
    <div className="flex gap-1 p-1">
      {passStrength > 0 && (
        <div
          className="w-1/4 h-2 bg-red-800"
          data-testid="password-strength-0"
        ></div>
      )}
      {passStrength > 1 && (
        <div
          className="w-1/4 h-2 bg-red-400"
          data-testid="password-strength-1"
        ></div>
      )}
      {passStrength > 2 && (
        <div
          className="w-1/4 h-2 bg-yellow-500"
          data-testid="password-strength-2"
        ></div>
      )}
      {passStrength > 3 && (
        <div
          className="w-1/4 h-2 bg-green-500"
          data-testid="password-strength-3"
        ></div>
      )}
    </div>
  );
};
