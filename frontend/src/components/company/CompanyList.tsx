import type { Company } from "../../types/company";
import EmptyState from "../common/EmptyState";
import CompanyCard from "./CompanyCard";

type CompanyListProps = {
  companies: Company[];
  onEdit?: (company: Company) => void;
  onDelete?: (id: string) => void;
};

export default function CompanyList({
  companies,
  onEdit,
  onDelete,
}: CompanyListProps) {
  if (companies.length === 0) {
    return (
      <EmptyState
        title="No companies found"
        description="There are no companies available."
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <CompanyCard
          key={company.id}
          company={company}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}