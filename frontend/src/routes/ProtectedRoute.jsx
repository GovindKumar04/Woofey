import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authChecked } = useSelector((state) => state.auth);

  // Wait for the initial cookie-based auth check before deciding,
  // otherwise a logged-in user gets bounced on refresh.
  if (!authChecked) {
    return (
      <div className="pt-24 px-4 md:px-20">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
