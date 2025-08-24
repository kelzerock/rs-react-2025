import { useEffect, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SchemaFormType } from "../../models/types/schemaForm";
import { SchemaForm } from "../../schema/schemaForm";
import { useDispatch, useSelector } from "react-redux";
import { selectCountries } from "../../store/countrySlice";
import { fileToBase64 } from "../../utils/fileToBase64";
import {
  addCurrentStateUncontrolledForm,
  addToDbUncontrolledForm,
} from "../../store/formUncontrolledSlice";
import { PasswordStrength } from "../PasswordStrength";

export const UncontrolledForm = ({ close }: { close: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(SchemaForm),
  });
  const formWrapperRef = useRef<HTMLDivElement>(null);
  const countriesList = useSelector(selectCountries);
  const dispatch = useDispatch();

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

  const onSubmit: SubmitHandler<SchemaFormType> = async (data) => {
    if (isValid) {
      const base64Image = await fileToBase64(data.picture);
      const newData = { ...data, picture: base64Image };
      dispatch(addCurrentStateUncontrolledForm(newData));
      dispatch(addToDbUncontrolledForm());
      reset();
      close();
    }
  };

  return (
    <div ref={formWrapperRef} className="flex flex-col gap-2">
      <h4>UncontrolledForm</h4>
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
        <PasswordStrength password={watch("password") || ""} />
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
          <div className="relative">
            <input
              {...register("country", {
                onChange: (e) => {
                  // Автоматически приводим к правильному регистру при выборе из списка
                  const selectedCountry = countriesList.find(
                    (country) =>
                      country.toLowerCase() === e.target.value.toLowerCase(),
                  );
                  if (selectedCountry) {
                    e.target.value = selectedCountry;
                  }
                },
              })}
              className="input-text w-full"
              aria-required="true"
              list="uncontrolled-list"
              placeholder="Start typing to search countries..."
            />
            <datalist id="uncontrolled-list">
              {countriesList.map((country) => (
                <option value={country} key={country}>
                  {country}
                </option>
              ))}
            </datalist>
          </div>
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
