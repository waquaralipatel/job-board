import type { Job } from "../../types/job";
import EmptyState from "../common/EmptyState";
import JobCard from "./JobCard";

type JobListProps = {
  jobs: Job[];
  onEdit?: (job: Job) => void;
  onDelete?: (id: string) => void;
};

export default function JobList({
  jobs,
  onEdit,
  onDelete,
}: JobListProps) {
  if (jobs.length === 0) {
    return (
      <EmptyState
        title="No jobs found"
        description="There are no jobs matching your search."
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}