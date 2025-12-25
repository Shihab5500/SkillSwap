import { Link, useLocation, useNavigate } from "react-router-dom";

export default function NotFound() {
  const { pathname } = useLocation();
  const nav = useNavigate();

  return (
    <div className="min-h-[60vh] grid place-items-center px-6">
      <div className="max-w-xl text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-error/10 text-error text-2xl mb-4">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">Page not found</h1>
        <p className="mt-2 opacity-70">
          The path <code className="px-2 py-1 rounded bg-base-200">{pathname}</code> doesn’t
          exist on this site. Please check the URL, or go back to a known page.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => nav(-1)}
            className="btn btn-outline"
          >
            ← Go Back
          </button>
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>

        {/* Quick links (optional) */}
        <div className="mt-8 text-sm">
          <p className="mb-2 font-semibold">Quick links</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/" className="link">Home</Link>
            <Link to="/profile" className="link">My Profile</Link>
            <Link to="/login" className="link">Login</Link>
            <Link to="/signup" className="link">Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
