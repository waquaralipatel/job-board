export default function Loading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-10 w-1/3 rounded-lg bg-slate-200" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-200 bg-white p-6"
          >
            <div className="mb-4 h-6 w-3/4 rounded bg-slate-200" />

            <div className="mb-2 h-4 rounded bg-slate-200" />
            <div className="mb-2 h-4 rounded bg-slate-200" />
            <div className="mb-6 h-4 w-2/3 rounded bg-slate-200" />

            <div className="h-10 rounded-lg bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}