import { NavLink } from "react-router-dom";

const links = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Jobs",
    path: "/jobs",
  },
  {
    label: "Companies",
    path: "/companies",
  },
  {
    label: "Saved Jobs",
    path: "/saved-jobs",
  },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink
          to="/"
          className="text-2xl font-bold tracking-tight text-blue-600"
        >
        Jobs Board
        </NavLink>

        <div className="flex flex-wrap items-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}