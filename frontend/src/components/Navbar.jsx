import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

function Navbar({ onLoginClick, onSignupClick }) {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((s) => s.auth);

  return (
    <div className="fixed top-0 w-full flex items-center justify-between bg-white shadow-md px-6 py-3 z-50">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="h-12" />
      </Link>

      <ul className="flex space-x-6">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>

      <div className="flex gap-4">
        {!isAuthenticated ? (
          <>
            <button onClick={onSignupClick} className="bg-orange-600 text-white px-4 py-1 rounded">
              Sign up
            </button>
            <button onClick={onLoginClick} className="border border-orange-600 text-orange-600 px-4 py-1 rounded">
              Login
            </button>
          </>
        ) : (
          <>
            <span>Hi, {user?.name}</span>
            <button
              onClick={() => dispatch(logout())}
              className="bg-red-500 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
