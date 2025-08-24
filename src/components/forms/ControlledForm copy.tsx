import { useEffect, useRef } from "react";
import { countryList } from "../../constant/countries";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schemaForm = z
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
      .refine((val) => val instanceof FileList && val.length > 0, {
        message: "Load image file (png/jpeg)",
      })
      .transform((val) => val[0])
      .refine((file) => file.size <= 1_000_000, {
        message: "Maximum size 1Mb",
      })
      .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
        message: "Allow only 'png' and 'jpeg'",
      }),
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

type SchemaForm = z.infer<typeof schemaForm>;

export const ControlledForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaForm),
  });
  const formWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formWrapperRef.current === null) return;
    const focusableElements = Array.from(
      formWrapperRef.current.querySelectorAll("input, select, button"),
    );

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (
      focusableElements.length === 0 ||
      !(first instanceof HTMLElement) ||
      !(last instanceof HTMLElement)
    )
      return;

    first.focus();

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    formWrapperRef.current.addEventListener("keydown", trapFocus);
    return () =>
      formWrapperRef.current?.removeEventListener("keydown", trapFocus);
  }, []);

  const onSubmit: SubmitHandler<SchemaForm> = (data) => {
    console.log({ data });
  };

  return (
    <div ref={formWrapperRef} className="flex flex-col gap-2">
      <h4>ControlledForm</h4>
      <form
        className="border-2 border-stone-700 p-2 rounded-md flex flex-col gap-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="label">
          name
          <input
            className="input-text"
            type="text"
            {...register("name", { required: "Name is required" })}
            aria-required="true"
          />
        </label>
        {errors.name && (
          <p role="alert" className="error-msg">
            {errors.name.message}
          </p>
        )}
        <label className="label">
          age
          <input
            className="input-text"
            type="number"
            {...register("age", { valueAsNumber: true })}
            aria-required="true"
          />
        </label>
        {errors.age && (
          <p role="alert" className="error-msg">
            {errors.age.message}
          </p>
        )}
        <label className="label">
          email
          <input
            className="input-text"
            type="text"
            {...register("email")}
            aria-required="true"
          />
        </label>
        {errors.email && (
          <p role="alert" className="error-msg">
            {errors.email.message}
          </p>
        )}
        <label className="label">
          password
          <input
            className="input-text"
            type="password"
            {...register("password")}
            aria-required="true"
          />
        </label>
        {errors.password && (
          <p role="alert" className="error-msg">
            {errors.password.message}
          </p>
        )}
        <label className="label">
          confirm password
          <input
            className="input-text"
            type="password"
            {...register("confirmPassword")}
            aria-required="true"
          />
        </label>
        {errors.confirmPassword && (
          <p role="alert" className="error-msg">
            {errors.confirmPassword.message}
          </p>
        )}
        <label className="label">
          gender
          <select
            {...register("gender")}
            className="input-text"
            aria-required="true"
          >
            <option value="female">female</option>
            <option value="male">male</option>
          </select>
        </label>
        {errors.gender && (
          <p role="alert" className="error-msg">
            {errors.gender.message}
          </p>
        )}
        <label className="label">
          Accept term
          <input
            className="input-text"
            type="checkbox"
            {...register("acceptTerms")}
            aria-required="true"
          />
        </label>
        {errors.acceptTerms && (
          <p role="alert" className="error-msg">
            {errors.acceptTerms.message}
          </p>
        )}
        <label className="label">
          Load image
          <input
            className="input-text w-full"
            type="file"
            {...register("picture")}
            aria-required="true"
          />
        </label>
        {typeof errors.picture?.message === "string" && (
          <p role="alert" className="error-msg">
            {errors.picture.message}
          </p>
        )}
        <label className="label">
          country
          <select
            {...register("country")}
            className="input-text w-full"
            aria-required="true"
          >
            {countryList.map((country) => (
              <option value={country} key={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
        {errors.country && (
          <p role="alert" className="error-msg">
            {errors.country.message}
          </p>
        )}
        <button className="btn-form-open">Submit form</button>
      </form>
    </div>
  );
};
