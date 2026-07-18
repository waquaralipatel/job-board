import { Link } from "react-router-dom";
import type { Job } from "../../types/job";
import Button from "../ui/Button";

type JobCardProps = {
  job: Job;
  onEdit?: (job: Job) => void;
  onDelete?: (id: string) => void;
};

export default function JobCard({
  job,
  onEdit,
  onDelete,
}: JobCardProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {job.title}
            </h2>

            <p className="text-sm text-slate-500">
              {job.location}
            </p>
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            {job.category}
          </span>
        </div>

        <p className="line-clamp-3 text-slate-600">
          {job.description}
        </p>

        <div className="space-y-1 text-sm text-slate-700">
          <p>
            <strong>Salary:</strong> {job.salary}
          </p>

          <p>
            <strong>Experience:</strong> {job.experience}
          </p>

          <p>
            <strong>Employment:</strong> {job.employmentType}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link to={`/jobs/${job.id}`}>
          <Button>View</Button>
        </Link>

        {onEdit && (
          <Button onClick={() => onEdit(job)}>
            Edit
          </Button>
        )}

        {onDelete && (
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={() => onDelete(job.id)}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}