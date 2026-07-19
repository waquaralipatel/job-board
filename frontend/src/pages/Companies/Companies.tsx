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

type FormErrors = Partial<
  Record<keyof CompanyPayload, string>
>;

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] =
    useState<Company | null>(null);

  const [formErrors, setFormErrors] =
    useState<FormErrors>({});

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

  const mapBackendErrors = (
    messages: string[]
  ): FormErrors => {
    const errors: FormErrors = {};

    messages.forEach((message) => {
      const lower = message.toLowerCase();

      if (lower.includes("name")) {
        errors.name = message;
      } else if (lower.includes("logo")) {
        errors.logo = message;
      } else if (lower.includes("website")) {
        errors.website = message;
      } else if (lower.includes("location")) {
        errors.location = message;
      }
    });

    return errors;
  };

  const handleCreate = async (
    values: CompanyPayload
  ) => {
    try {
      setFormErrors({});

      await createCompany(values);

      setShowForm(false);

      await loadCompanies();
    } catch (err: any) {
      const backendErrors =
        err.response?.data?.errors?.body;

      if (Array.isArray(backendErrors)) {
        setFormErrors(
          mapBackendErrors(backendErrors)
        );
      } else {
        setError(
          err.response?.data?.message ??
            "Failed to create company."
        );
      }
    }
  };

  const handleUpdate = async (
    values: CompanyPayload
  ) => {
    if (!editingCompany) return;

    try {
      setFormErrors({});

      await updateCompany(
        editingCompany.id,
        values
      );

      setEditingCompany(null);

      await loadCompanies();
    } catch (err: any) {
      const backendErrors =
        err.response?.data?.errors?.body;

      if (Array.isArray(backendErrors)) {
        setFormErrors(
          mapBackendErrors(backendErrors)
        );
      } else {
        setError(
          err.response?.data?.message ??
            "Failed to update company."
        );
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this company?"))
      return;

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
            setFormErrors({});
            setShowForm((prev) => !prev);
          }}
        >
          {showForm ? "Close" : "Add Company"}
        </Button>
      </div>

      {showForm && (
        <CompanyForm
          onSubmit={handleCreate}
          errors={formErrors}
        />
      )}

      {editingCompany && (
        <CompanyForm
          defaultValues={{
            name: editingCompany.name,
            logo: editingCompany.logo,
            website: editingCompany.website,
            location: editingCompany.location,
          }}
          onSubmit={handleUpdate}
          errors={formErrors}
        />
      )}

      <CompanyList
        companies={companies}
        onEdit={(company) => {
          setShowForm(false);
          setEditingCompany(company);
          setFormErrors({});
        }}
        onDelete={handleDelete}
      />
    </section>
  );
}