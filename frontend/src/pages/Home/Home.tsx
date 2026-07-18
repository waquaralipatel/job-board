import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import JobList from "../../components/job/JobList";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import { getJobs } from "../../services/job.service";
import { getCompanies } from "../../services/company.service";
import type { Job } from "../../types/job";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companyCount, setCompanyCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [jobData, companyData] = await Promise.all([
          getJobs(),
          getCompanies(),
        ]);

        setJobs(jobData);
        setCompanyCount(companyData.length);
      } catch {
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-16 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-5xl font-bold leading-tight">
            Find Your Dream Job
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            Discover exciting career opportunities, explore top companies,
            and take the next step in your professional journey.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/jobs">
              <Button className="border border-white !bg-transparent !text-white hover:!bg-white hover:!text-blue-700">
                Browse Jobs
              </Button>
            </Link>

            <Link to="/companies">
              <Button className="border border-white !bg-transparent !text-white hover:!bg-white hover:!text-blue-700">
                Explore Companies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h2 className="text-4xl font-bold text-blue-600">
            {jobs.length}
          </h2>

          <p className="mt-2 text-slate-600">
            Total Jobs
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h2 className="text-4xl font-bold text-green-600">
            {companyCount}
          </h2>

          <p className="mt-2 text-slate-600">
            Companies
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h2 className="text-4xl font-bold text-purple-600">
            100%
          </h2>

          <p className="mt-2 text-slate-600">
            Free to Explore
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            Latest Jobs
          </h2>

          <Link
            to="/jobs"
            className="font-medium text-blue-600 hover:underline"
          >
            View All →
          </Link>
        </div>

        <JobList jobs={jobs.slice(0, 6)} />
      </section>

      <section className="rounded-3xl bg-slate-900 px-8 py-14 text-center text-white">
        <h2 className="text-3xl font-bold">
          Ready to Start Your Career?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          Browse hundreds of opportunities and connect with leading companies.
        </p>

        <div className="mt-8">
          <Link to="/jobs">
            <Button>
              Explore Jobs
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}