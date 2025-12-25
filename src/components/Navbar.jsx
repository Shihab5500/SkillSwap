


import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoGo from "../assets/logo.png"

export default function Navbar() {
  const { user, logout } = useAuth();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 transition ${
        solid
          ? "bg-base-100/95 backdrop-blur shadow-sm"
          : "bg-base-100/80 backdrop-blur"
      }`}
    >
      <div className="navbar container mx-auto px-4">
        {/* Left: Brand */}
        <div className="flex-1 flex items-center justify-between md:justify-start">
          <Link to="/">
            <img className="w-[150px] h-[130px]" src={LoGo} alt="" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-auto btn btn-ghost"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Right: Menu */}
        <div
          className={`flex-col md:flex md:flex-row md:items-center md:gap-3 absolute md:static top-full left-0 w-full md:w-auto bg-base-100 md:bg-transparent transition-all duration-300 ease-in-out ${
            menuOpen ? "flex shadow-md p-4 md:p-0" : "hidden md:flex"
          }`}
        >
          <ul className="menu flex flex-col md:flex-row md:menu-horizontal gap-2 w-full md:w-auto">
            <li>
              <NavLink to="/" onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
                My Profile
              </NavLink>
            </li>

            {!user && (
              <>
                <li>
                  <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" onClick={() => setMenuOpen(false)}>
                    Signup
                  </NavLink>
                </li>
              </>
            )}

            {user && (
              <>
                <li className="flex items-center justify-center md:justify-start">
                  <div
                    className="tooltip tooltip-bottom"
                    data-tip={user.displayName || user.email}
                  >
                    <img
                      className="w-10 h-10 rounded-full ring-2 ring-base-300"
                      src={user.photoURL || "https://i.pravatar.cc/100"}
                      alt="User"
                    />
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="btn btn-sm btn-outline w-full md:w-auto"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

