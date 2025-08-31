export const handlePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.match(/[A-Z]/)) strength++;
  if (password.match(/[a-z]/)) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[!@#$%^&*]/)) strength++;
  return strength;
};
