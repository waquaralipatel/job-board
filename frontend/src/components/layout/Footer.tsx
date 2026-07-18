export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-center text-sm text-slate-600 md:flex-row md:text-left">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Job Board
          </h2>

          <p className="mt-1 text-slate-500">
            Discover jobs, explore companies, and find your next opportunity.
          </p>
        </div>

        <div className="space-y-1">
          <p>
            © {new Date().getFullYear()} WAP. All rights reserved.
          </p>

          <p className="text-slate-500">
            Built with React, TypeScript, Tailwind CSS, Express & PostgreSQL.
          </p>
        </div>
      </div>
    </footer>
  );
}