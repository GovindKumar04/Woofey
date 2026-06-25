import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { openLogin, openSignup } from "../../redux/uiSlice";
import { assets } from "../../assets/assets";
import { ShoppingBag, Menu, X } from "lucide-react";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((s) => s.auth);

  const [menuOpen, setMenuOpen] = useState(false); // desktop avatar dropdown
  const [mobileOpen, setMobileOpen] = useState(false); // mobile nav drawer
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    setMobileOpen(false);
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    isActive ? "text-orange-600" : "hover:text-orange-600";

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3">
        {/* Logo */}
        <Link to="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
          <img src={assets.logo} alt="Logo" className="h-9 sm:h-12" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 text-base font-medium">
          <li>
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="#" className="hover:text-orange-600">
              Partner With Us
            </NavLink>
          </li>
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <NavLink
            to="/cart"
            className="hover:text-orange-600"
            aria-label="Cart"
          >
            <ShoppingBag className="h-6 w-6" />
          </NavLink>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => dispatch(openSignup())}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1 rounded"
                >
                  Sign up
                </button>
                <button
                  onClick={() => dispatch(openLogin())}
                  className="border border-orange-600 text-orange-600 hover:bg-orange-50 px-4 py-1 rounded"
                >
                  Login
                </button>
              </>
            ) : (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((open) => !open)}
                  className="h-10 w-10 rounded-full bg-orange-600 text-white font-semibold flex items-center justify-center hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                  title={user?.name}
                >
                  {initial}
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-1">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1 text-gray-700"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3">
          {isAuthenticated && (
            <div className="pb-3 mb-2 border-b border-gray-100">
              <p className="font-semibold text-gray-800 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          )}

          <NavLink
            to="/"
            onClick={() => setMobileOpen(false)}
            className="block py-2 font-medium"
          >
            Home
          </NavLink>
          <NavLink
            to="#"
            onClick={() => setMobileOpen(false)}
            className="block py-2 font-medium"
          >
            Partner With Us
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setMobileOpen(false)}
            className="block py-2 font-medium"
          >
            Cart
          </NavLink>

          {!isAuthenticated ? (
            <div className="flex gap-3 pt-3">
              <button
                onClick={() => {
                  dispatch(openSignup());
                  setMobileOpen(false);
                }}
                className="flex-1 bg-orange-600 text-white py-2 rounded"
              >
                Sign up
              </button>
              <button
                onClick={() => {
                  dispatch(openLogin());
                  setMobileOpen(false);
                }}
                className="flex-1 border border-orange-600 text-orange-600 py-2 rounded"
              >
                Login
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="block py-2 font-medium"
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 font-medium text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
