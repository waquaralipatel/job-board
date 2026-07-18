import type { Company } from "../../types/company";
import Button from "../ui/Button";

type CompanyCardProps = {
  company: Company;
  onEdit?: (company: Company) => void;
  onDelete?: (id: string) => void;
};

export default function CompanyCard({
  company,
  onEdit,
  onDelete,
}: CompanyCardProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div>
        <div className="mb-4 flex items-center gap-4">
          <img
            src={company.logo}
            alt={company.name}
            className="h-16 w-16 rounded-lg border object-cover"
          />

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {company.name}
            </h2>

            <p className="text-sm text-slate-500">
              {company.location}
            </p>
          </div>
        </div>

        <a
          href={company.website}
          target="_blank"
          rel="noreferrer"
          className="break-all text-blue-600 hover:underline"
        >
          {company.website}
        </a>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {onEdit && (
          <Button onClick={() => onEdit(company)}>
            Edit
          </Button>
        )}

        {onDelete && (
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={() => onDelete(company.id)}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}