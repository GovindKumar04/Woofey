import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../redux/authSlice";
import { openLogin, closeAuthModal } from "../../../redux/uiSlice";
import { toast } from "react-toastify";
import { assets } from "../../../assets/assets";

function Signup() {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    const res = await dispatch(register(form));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Signup successful");
      dispatch(closeAuthModal());
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition";

  return (
    <div className="relative">
      <button
        className="absolute -top-2 -right-2 text-gray-400 hover:text-gray-700 text-2xl leading-none"
        onClick={() => dispatch(closeAuthModal())}
        aria-label="Close"
      >
        &times;
      </button>

      <div className="flex flex-col items-center mb-6">
        <img src={assets.logo} alt="Woofey" className="h-14 mb-3" />
        <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
        <p className="text-sm text-gray-500 mt-1">Sign up to start ordering</p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className={inputClass}
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className={inputClass}
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className={inputClass}
          placeholder="Phone number"
          value={form.number}
          onChange={(e) => setForm({ ...form, number: e.target.value })}
        />
        <input
          className={inputClass}
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          className={inputClass}
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button
          disabled={loading}
          className="bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition mt-1"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-5">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => dispatch(openLogin())}
          className="text-orange-600 font-semibold hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default Signup;
