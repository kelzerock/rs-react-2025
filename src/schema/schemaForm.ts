import z from "zod";
import { countryList } from "../constant/countries";

export const SchemaForm = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Name must have 1 and more characters" })
      .refine((val) => /^[A-ZА-Я]/.test(val), {
        message: "First character must be uppercase",
      }),
    age: z
      .number()
      .positive("Age must be positive integer")
      .max(120, "I think you are lier!!!")
      .min(1, "Age must be more than 0"),
    email: z.string().email("Please, enter correct mail!"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    gender: z.enum(["male", "female"], "Please choose one option"),
    acceptTerms: z
      .boolean()
      .refine((val) => val === true, "You need to agree with it!"),
    picture: z
      .custom<FileList>((val) => val instanceof FileList && val.length > 0, {
        message: "Load image file (png/jpeg)",
      })
      .transform((val) => val[0])
      .refine((file) => file.size <= 1_000_000, {
        message: "Maximum size 1Mb",
      })
      .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
        message: "Allow only 'png' and 'jpeg'",
      }),
    country: z
      .string()
      .refine(
        (val) =>
          countryList.some(
            (country) => country.toLowerCase() === val.trim().toLowerCase(),
          ),
        "Please choose one option",
      ),
  })
  .refine(
    (data) => {
      if (!data.password) return true;
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.confirmPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Please enter password first",
      path: ["password"],
    },
  );
