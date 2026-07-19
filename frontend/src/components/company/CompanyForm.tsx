import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Company } from "../../types/company";
import Button from "../ui/Button";
import Input from "../ui/Input";

type CompanyPayload = Omit<
  Company,
  "id" | "createdAt" | "updatedAt"
>;

type CompanyFormProps = {
  defaultValues?: Partial<CompanyPayload>;

  onSubmit: (
    values: CompanyPayload
  ) => Promise<void>;

  errors?: Partial<
    Record<keyof CompanyPayload, string>
  >;
};

export default function CompanyForm({
  defaultValues,
  onSubmit,
  errors = {},
}: CompanyFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: {
      errors: formErrors,
      isSubmitting,
    },
  } = useForm<CompanyPayload>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    clearErrors();

    Object.entries(errors).forEach(
      ([field, message]) => {
        if (!message) return;

        setError(field as keyof CompanyPayload, {
          type: "server",
          message,
        });
      }
    );
  }, [errors, setError, clearErrors]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-6"
    >
      <div>
        <Input
          placeholder="Company Name"
          {...register("name", {
            required: "Company name is required",
          })}
        />

        {formErrors.name && (
          <p className="mt-1 text-sm text-red-600">
            {formErrors.name.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Logo URL"
          {...register("logo", {
            required: "Logo URL is required",
          })}
        />

        {formErrors.logo && (
          <p className="mt-1 text-sm text-red-600">
            {formErrors.logo.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Website"
          {...register("website", {
            required: "Website is required",
          })}
        />

        {formErrors.website && (
          <p className="mt-1 text-sm text-red-600">
            {formErrors.website.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Location"
          {...register("location", {
            required: "Location is required",
          })}
        />

        {formErrors.location && (
          <p className="mt-1 text-sm text-red-600">
            {formErrors.location.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Saving..."
          : "Save Company"}
      </Button>
    </form>
  );
}