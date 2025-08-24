import { useEffect, useRef } from "react";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SchemaFormType } from "../../models/types/schemaForm";
import { SchemaForm } from "../../schema/schemaForm";
import { selectCountries } from "../../store/countrySlice";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentState, addToDb } from "../../store/formControlSlice";
import { fileToBase64 } from "../../utils/fileToBase64";

export const ControlledForm = ({ close }: { close: () => void }) => {
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
    trigger,
  } = useForm({
    resolver: zodResolver(SchemaForm),
    mode: "onChange",
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
    const base64Image = await fileToBase64(data.picture);
    const newData = { ...data, picture: base64Image };
    dispatch(addCurrentState(newData));
    dispatch(addToDb());
    reset();
    close();
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
          <Controller
            render={({ field }) => <input {...field} className="input-text" />}
            name="name"
            control={control}
            defaultValue=""
          />
        </label>
        {errors.name && (
          <p role="alert" className="error-msg">
            {errors.name.message}
          </p>
        )}
        <label className="label">
          age
          <Controller
            render={({ field }) => (
              <input
                {...field}
                onChange={(event) => field.onChange(+event.target.value)}
                type="number"
                className="input-text"
              />
            )}
            name="age"
            control={control}
            defaultValue={0}
          />
        </label>
        {errors.age && (
          <p role="alert" className="error-msg">
            {errors.age.message}
          </p>
        )}
        <label className="label">
          email
          <Controller
            render={({ field }) => <input {...field} className="input-text" />}
            name="email"
            control={control}
            defaultValue=""
          />
        </label>
        {errors.email && (
          <p role="alert" className="error-msg">
            {errors.email.message}
          </p>
        )}
        <label className="label">
          password
          <Controller
            render={({ field }) => (
              <input
                {...field}
                type="password"
                className="input-text"
                onChange={(e) => {
                  field.onChange(e);
                  trigger(["password", "confirmPassword"]);
                }}
              />
            )}
            name="password"
            control={control}
            defaultValue=""
          />
        </label>
        {errors.password && (
          <p role="alert" className="error-msg">
            {errors.password.message}
          </p>
        )}
        <label className="label">
          confirm password
          <Controller
            render={({ field }) => (
              <input
                {...field}
                type="password"
                className="input-text"
                onChange={(e) => {
                  field.onChange(e);
                  trigger(["password", "confirmPassword"]);
                }}
              />
            )}
            name="confirmPassword"
            control={control}
            defaultValue=""
          />
        </label>
        {errors.confirmPassword && (
          <p role="alert" className="error-msg">
            {errors.confirmPassword.message}
          </p>
        )}
        <label className="label">
          gender
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <select {...field} className="input-text">
                <option value="female">female</option>
                <option value="male">male</option>
              </select>
            )}
            defaultValue="female"
          />
        </label>
        {errors.gender && (
          <p role="alert" className="error-msg">
            {errors.gender.message}
          </p>
        )}
        <label className="label">
          Accept term
          <Controller
            name="acceptTerms"
            render={({ field }) => (
              <input
                type="checkbox"
                className="input-text"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
            )}
            control={control}
            defaultValue={false}
          />
        </label>
        {errors.acceptTerms && (
          <p role="alert" className="error-msg">
            {errors.acceptTerms.message}
          </p>
        )}
        <label className="label">
          Load image
          <Controller
            render={({ field }) => (
              <input
                type="file"
                className="input-text"
                accept="image/png, image/jpeg"
                onChange={(e) => field.onChange(e.target.files)}
                onBlur={field.onBlur}
                ref={field.ref}
              />
            )}
            name="picture"
            control={control}
          />
        </label>
        {typeof errors.picture?.message === "string" && (
          <p role="alert" className="error-msg">
            {errors.picture.message}
          </p>
        )}
        <label className="label">
          country
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <input
                list="control-list"
                className="input-text w-full"
                {...field}
              />
            )}
            defaultValue=""
          />
          <datalist id="control-list">
            {countriesList.map((country) => (
              <option value={country} key={country}>
                {country}
              </option>
            ))}
          </datalist>
        </label>
        {errors.country && (
          <p role="alert" className="error-msg">
            {errors.country.message}
          </p>
        )}
        <button className="btn-form-open" disabled={!isValid}>
          Submit form
        </button>
      </form>
    </div>
  );
};
