import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { openLogin } from "../redux/uiSlice";

// Runs `callback` only when authenticated; otherwise prompts login.
export default function useAuthGuard() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const requireAuth = (callback, message = "Please login to continue") => {
    if (!isAuthenticated) {
      toast.error(message);
      dispatch(openLogin());
      return;
    }

    callback();
  };

  return { requireAuth };
}
