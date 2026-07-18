import EmptyState from "../../components/common/EmptyState";

export default function SavedJobs() {
  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold text-slate-900">
        Saved Jobs
      </h1>

      <EmptyState
        title="No saved jobs"
        description="Jobs you save will appear here."
      />
    </section>
  );
}