import { useEffect, useMemo, useState } from "react";
import Error from "../../components/common/Error";
import Loading from "../../components/common/Loading";
import JobFilter from "../../components/job/JobFilter";
import JobForm from "../../components/job/JobForm";
import JobList from "../../components/job/JobList";
import Button from "../../components/ui/Button";
import {
  createJob,
  deleteJob,
  getJobs,
  updateJob,
} from "../../services/job.service";
import type { Job } from "../../types/job";

type JobPayload = Omit<
  Job,
  "id" | "createdAt" | "updatedAt"
>;

type FormErrors = Partial<
  Record<keyof JobPayload, string>
>;

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] =
    useState<Job | null>(null);

  const [formErrors, setFormErrors] =
    useState<FormErrors>({});

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await getJobs();
      setJobs(data);
      setError("");
    } catch {
      setError("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        job.location
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        !category || job.category === category;

      return (
        matchesSearch && matchesCategory
      );
    });
  }, [jobs, search, category]);

  const mapBackendErrors = (
    messages: string[]
  ): FormErrors => {
    const errors: FormErrors = {};

    messages.forEach((message) => {
      const lower = message.toLowerCase();

      if (lower.includes("title")) {
        errors.title = message;
      } else if (
        lower.includes("description")
      ) {
        errors.description = message;
      } else if (lower.includes("salary")) {
        errors.salary = message;
      } else if (
        lower.includes("location")
      ) {
        errors.location = message;
      } else if (
        lower.includes("employment")
      ) {
        errors.employmentType = message;
      } else if (
        lower.includes("experience")
      ) {
        errors.experience = message;
      } else if (
        lower.includes("category")
      ) {
        errors.category = message;
      } else if (
        lower.includes("company")
      ) {
        errors.companyId = message;
      }
    });

    return errors;
  };

  const handleCreate = async (
    values: JobPayload
  ) => {
    try {
      setFormErrors({});

      await createJob(values);

      setShowForm(false);

      await loadJobs();
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
            "Failed to create job."
        );
      }
    }
  };

  const handleUpdate = async (
    values: JobPayload
  ) => {
    if (!editingJob) return;

    try {
      setFormErrors({});

      await updateJob(
        editingJob.id,
        values
      );

      setEditingJob(null);

      await loadJobs();
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
            "Failed to update job."
        );
      }
    }
  };

  const handleDelete = async (
    id: string
  ) => {
    if (!window.confirm("Delete this job?"))
      return;

    await deleteJob(id);

    await loadJobs();
  };

  if (loading) return <Loading />;

  if (error) return <Error message={error} />;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Available Jobs
        </h1>

        <Button
          onClick={() => {
            setEditingJob(null);
            setFormErrors({});
            setShowForm((prev) => !prev);
          }}
        >
          {showForm ? "Close" : "Add Job"}
        </Button>
      </div>

      {showForm && (
        <JobForm
          onSubmit={handleCreate}
          errors={formErrors}
        />
      )}

      {editingJob && (
        <JobForm
          defaultValues={{
            title: editingJob.title,
            description:
              editingJob.description,
            salary: editingJob.salary,
            location: editingJob.location,
            employmentType:
              editingJob.employmentType,
            experience:
              editingJob.experience,
            category: editingJob.category,
            companyId:
              editingJob.companyId,
          }}
          onSubmit={handleUpdate}
          errors={formErrors}
        />
      )}

      <JobFilter
        search={search}
        category={category}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      <JobList
        jobs={filteredJobs}
        onEdit={(job) => {
          setShowForm(false);
          setEditingJob(job);
          setFormErrors({});
        }}
        onDelete={handleDelete}
      />
    </section>
  );
}