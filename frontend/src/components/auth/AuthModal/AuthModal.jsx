import { useSelector, useDispatch } from "react-redux";
import Modal from "../../Modal";
import Login from "../Login";
import Signup from "../Signup";
import { closeAuthModal } from "../../../redux/uiSlice";

// Renders whichever auth form is active inside the blurred modal.
// Modal state lives in the redux `ui` slice, keeping App clean.
export function AuthModal() {
  const view = useSelector((s) => s.ui.authModal);
  const dispatch = useDispatch();

  if (!view) return null;

  return (
    <Modal onClose={() => dispatch(closeAuthModal())}>
      {view === "login" ? <Login /> : <Signup />}
    </Modal>
  );
}


