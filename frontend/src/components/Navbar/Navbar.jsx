import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { openLogin, openSignup } from "../../redux/uiSlice";
import { assets } from "../../assets/assets";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((s) => s.auth);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the dropdown when clicking outside of it
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
    navigate("/");
  };

  return (
    <div className="fixed top-0 w-full flex items-center justify-between bg-white shadow-md px-3 sm:px-6 py-2 sm:py-3 z-50">
      <Link to="/" className="shrink-0">
        <img src={assets.logo} alt="Logo" className="h-9 sm:h-12" />
      </Link>

      <ul className="flex items-center gap-3 sm:gap-6 text-sm sm:text-base font-medium">
        <li><Link to="/" className="hover:text-orange-600">Home</Link></li>
        <li><Link to="/cart" className="hover:text-orange-600">Cart</Link></li>
        <li className="hidden sm:block"><Link to="/profile" className="hover:text-orange-600">Profile</Link></li>
      </ul>

      <div className="flex items-center gap-2 sm:gap-4">
        {!isAuthenticated ? (
          <>
            <button onClick={() => dispatch(openSignup())} className="bg-orange-600 hover:bg-orange-700 text-white text-sm sm:text-base px-3 sm:px-4 py-1 rounded">
              Sign up
            </button>
            <button onClick={() => dispatch(openLogin())} className="border border-orange-600 text-orange-600 hover:bg-orange-50 text-sm sm:text-base px-3 sm:px-4 py-1 rounded">
              Login
            </button>
          </>
        ) : (
          <div className="relative" ref={menuRef}>
            {/* Avatar button (user logo) */}
            <button
              onClick={() => setMenuOpen((open) => !open)}
              className="h-10 w-10 rounded-full bg-orange-600 text-white font-semibold flex items-center justify-center hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              aria-haspopup="true"
              aria-expanded={menuOpen}
              title={user?.name}
            >
              {initial}
            </button>

            {/* Dropdown menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cart
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
    </div>
  );
}

export default Navbar;
