import { useForm } from "react-hook-form";
import type { Company } from "../../types/company";
import Button from "../ui/Button";
import Input from "../ui/Input";

type CompanyFormProps = {
  defaultValues?: Partial<Company>;
  onSubmit: (
    values: Omit<Company, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
};

export default function CompanyForm({
  defaultValues,
  onSubmit,
}: CompanyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Omit<Company, "id" | "createdAt" | "updatedAt">>({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-6"
    >
      <Input
        placeholder="Company Name"
        {...register("name", { required: true })}
      />

      <Input
        placeholder="Logo URL"
        {...register("logo", { required: true })}
      />

      <Input
        placeholder="Website"
        {...register("website", { required: true })}
      />

      <Input
        placeholder="Location"
        {...register("location", { required: true })}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Company"}
      </Button>
    </form>
  );
}