import { useEffect, useState } from "react";
import CompanyForm from "../../components/company/CompanyForm";
import CompanyList from "../../components/company/CompanyList";
import Error from "../../components/common/Error";
import Loading from "../../components/common/Loading";
import Button from "../../components/ui/Button";
import {
  createCompany,
  deleteCompany,
  getCompanies,
  updateCompany,
} from "../../services/company.service";
import type { Company } from "../../types/company";

type CompanyPayload = Omit<
  Company,
  "id" | "createdAt" | "updatedAt"
>;

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] =
    useState<Company | null>(null);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const data = await getCompanies();
      setCompanies(data);
      setError("");
    } catch {
      setError("Failed to load companies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleCreate = async (values: CompanyPayload) => {
    await createCompany(values);
    setShowForm(false);
    await loadCompanies();
  };

  const handleUpdate = async (values: CompanyPayload) => {
    if (!editingCompany) return;

    await updateCompany(editingCompany.id, values);
    setEditingCompany(null);
    await loadCompanies();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this company?")) return;

    await deleteCompany(id);
    await loadCompanies();
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Companies
        </h1>

        <Button
          onClick={() => {
            setEditingCompany(null);
            setShowForm((prev) => !prev);
          }}
        >
          {showForm ? "Close" : "Add Company"}
        </Button>
      </div>

      {showForm && (
        <CompanyForm
          onSubmit={handleCreate}
        />
      )}

      {editingCompany && (
        <CompanyForm
          defaultValues={editingCompany}
          onSubmit={handleUpdate}
        />
      )}

      <CompanyList
        companies={companies}
        onEdit={(company) => {
          setShowForm(false);
          setEditingCompany(company);
        }}
        onDelete={handleDelete}
      />
    </section>
  );
}