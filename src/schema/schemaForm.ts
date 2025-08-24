import z from "zod";

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
      .number("Please, inter number")
      .positive("Age must be positive integer")
      .max(120, "I think you are lier!!!")
      .min(1, "Age must be more than 0"),
    email: z.email("Please, enter correct mail!"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    gender: z.literal(["male", "female"], "Please choose one option"),
    acceptTerms: z
      .boolean()
      .refine((val) => val === true, "You need to agree with it!"),
    picture: z
      .any()
      .refine(
        (val) => {
          console.log({ val });
          if (!val || !(val instanceof FileList)) return false;
          return val.length > 0;
        },
        {
          message: "Load image file (png/jpeg)",
        },
      )
      .transform((val) => (val instanceof FileList ? val[0] : val))
      .refine((file) => file && file.size <= 1_000_000, {
        message: "Maximum size 1Mb",
      })
      .refine(
        (file) => file && ["image/png", "image/jpeg"].includes(file.type),
        {
          message: "Allow only 'png' and 'jpeg'",
        },
      ),
    country: z.string("Please choose one option."),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        message: "Passwords do not match",
        path: ["confirmPassword"],
        code: "custom",
      });
    }
  });
