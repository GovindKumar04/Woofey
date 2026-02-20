import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useAuthGuard(openLoginModal) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const requireAuth = (callback, message = "Please login to continue") => {
    if (!isAuthenticated) {
      toast.error(message);
      openLoginModal();
      return;
    }

    callback();
  };

  return { requireAuth };
}
