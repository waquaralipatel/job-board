import { Link } from "react-router-dom";
import Button from "../ui/Button";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionLink?: string;
};

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionLink,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-8 py-16 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
        📭
      </div>

      <h2 className="text-2xl font-semibold text-slate-900">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-slate-600">
        {description}
      </p>

      {actionLabel && actionLink && (
        <Link to={actionLink} className="mt-8">
          <Button>{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}