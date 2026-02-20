import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { toast } from "react-toastify";

function Login({ onClose }) {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login({ email, number, password }));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Login successful");
      onClose();
    }
  };

  return (
    <div className="relative">
      <button
        className="absolute top-2 right-2 text-red-600 text-xl"
        onClick={onClose}
      >
        ×
      </button>

      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Phone"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={loading}
          className="bg-green-500 text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"} 
        </button>
      </form>
    </div>
  );
}

export default Login;
