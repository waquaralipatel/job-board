import { useForm } from "react-hook-form";
import type { Job } from "../../types/job";
import Button from "../ui/Button";
import Input from "../ui/Input";

type JobFormProps = {
  defaultValues?: Partial<Job>;
  onSubmit: (
    values: Omit<Job, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
};

export default function JobForm({
  defaultValues,
  onSubmit,
}: JobFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Omit<Job, "id" | "createdAt" | "updatedAt">>({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-6"
    >
      <Input
        placeholder="Job Title"
        {...register("title", { required: true })}
      />

      <Input
        placeholder="Description"
        {...register("description", { required: true })}
      />

      <Input
        placeholder="Salary"
        {...register("salary", { required: true })}
      />

      <Input
        placeholder="Location"
        {...register("location", { required: true })}
      />

      <Input
        placeholder="Employment Type"
        {...register("employmentType", { required: true })}
      />

      <Input
        placeholder="Experience"
        {...register("experience", { required: true })}
      />

      <Input
        placeholder="Category"
        {...register("category", { required: true })}
      />

      <Input
        placeholder="Company Id"
        {...register("companyId", { required: true })}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Job"}
      </Button>
    </form>
  );
}