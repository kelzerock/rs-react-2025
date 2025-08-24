export type FormInputs = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female";
  acceptTerms: boolean;
  picture: FileList;
  country: string;
};
