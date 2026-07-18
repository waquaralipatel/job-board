import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-6xl font-bold text-slate-900">404</h1>

      <h2 className="mt-4 text-2xl font-semibold text-slate-800">
        Page Not Found
      </h2>

      <p className="mt-3 text-slate-600">
        The page you are looking for does not exist.
      </p>

      <div className="mt-8">
        <Link to="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </section>
  );
}