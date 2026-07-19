import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Job } from "../../types/job";
import Button from "../ui/Button";
import Input from "../ui/Input";

type JobPayload = Omit<
  Job,
  "id" | "createdAt" | "updatedAt"
>;

type JobFormProps = {
  defaultValues?: Partial<JobPayload>;

  onSubmit: (
    values: JobPayload
  ) => Promise<void>;

  errors?: Partial<
    Record<keyof JobPayload, string>
  >;
};

export default function JobForm({
  defaultValues,
  onSubmit,
  errors = {},
}: JobFormProps) {
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
  } = useForm<JobPayload>({
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

        setError(field as keyof JobPayload, {
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
          placeholder="Job Title"
          {...register("title", {
            required: "Job title is required",
          })}
        />

        {formErrors.title && (
          <p className="mt-1 text-sm text-red-600">
            {formErrors.title.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Description"
          {...register("description", {
            required: "Description is required",
          })}
        />

        {formErrors.description && (
          <p className="mt-1 text-sm text-red-600">
            {formErrors.description.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Salary"
          {...register("salary", {
            required: "Salary is required",
          })}
        />

        {formErrors.salary && (
          <p className="mt-1 text-sm text-red-600">
            {formErrors.salary.message}
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

      <div>
        <Input
          placeholder="Employment Type"
          {...register("employmentType", {
            required: "Employment type is required",
          })}
        />

        {formErrors.employmentType && (
          <p className="mt-1 text-sm text-red-600">
            {formErrors.employmentType.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Experience"
          {...register("experience", {
            required: "Experience is required",
          })}
        />

        {formErrors.experience && (
          <p className="mt-1 text-sm text-red-600">
            {formErrors.experience.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Category"
          {...register("category", {
            required: "Category is required",
          })}
        />

        {formErrors.category && (
          <p className="mt-1 text-sm text-red-600">
            {formErrors.category.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Company Id"
          {...register("companyId", {
            required: "Company is required",
          })}
        />

        {formErrors.companyId && (
          <p className="mt-1 text-sm text-red-600">
            {formErrors.companyId.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Saving..."
          : "Save Job"}
      </Button>
    </form>
  );
}