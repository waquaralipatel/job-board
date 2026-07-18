import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Error from "../../components/common/Error";
import Loading from "../../components/common/Loading";
import Button from "../../components/ui/Button";
import { getJobById } from "../../services/job.service";
import type { Job } from "../../types/job";

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJob = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getJobById(id);
        setJob(data);
        setError("");
      } catch {
        setError("Failed to load job.");
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (!job) {
    return (
      <Error message="Job not found." />
    );
  }

  return (
    <section className="mx-auto max-w-5xl space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {job.category}
            </span>

            <h1 className="mt-4 text-4xl font-bold text-slate-900">
              {job.title}
            </h1>

            <p className="mt-2 text-lg text-slate-500">
              {job.location}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Salary
            </p>

            <p className="mt-1 text-2xl font-bold text-green-600">
              {job.salary}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border p-5">
            <p className="text-sm text-slate-500">
              Employment Type
            </p>

            <p className="mt-2 font-semibold">
              {job.employmentType}
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-slate-500">
              Experience
            </p>

            <p className="mt-2 font-semibold">
              {job.experience}
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-slate-500">
              Company ID
            </p>

            <p className="mt-2 font-semibold">
              {job.companyId}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-3 text-2xl font-semibold">
            Job Description
          </h2>

          <p className="leading-8 text-slate-600 whitespace-pre-line">
            {job.description}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/jobs">
            <Button>
              Back to Jobs
            </Button>
          </Link>

          <Button>
            Apply Now
          </Button>
        </div>
      </div>
    </section>
  );
}