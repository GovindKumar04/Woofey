import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/authSlice";
import { openSignup, closeAuthModal } from "../../../redux/uiSlice";
import { toast } from "react-toastify";
import { assets } from "../../../assets/assets";

function Login() {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [phone_number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login({ email, phone_number, password }));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Login successful");
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
        <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
        <p className="text-sm text-gray-500 mt-1">Login to continue ordering</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className={inputClass}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex-1 h-px bg-gray-200" />
          OR
          <span className="flex-1 h-px bg-gray-200" />
        </div>

        <input
          className={inputClass}
          placeholder="Phone number"
          value={phone_number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <input
          className={inputClass}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition mt-1"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-5">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => dispatch(openSignup())}
          className="text-orange-600 font-semibold hover:underline"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}

export default Login;
