import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/authSlice";
import { toast } from "react-toastify";

function Signup({ onClose }) {
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
      onClose();
    }
  };

  return (
    <div className="relative">
      <button className="absolute top-2 right-2 text-red-600 text-xl" onClick={onClose}>×</button>

      <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input className="border p-2 rounded" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="border p-2 rounded" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="border p-2 rounded" placeholder="Phone" onChange={(e) => setForm({ ...form, number: e.target.value })} />
        <input className="border p-2 rounded" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <input className="border p-2 rounded" type="password" placeholder="Confirm Password" onChange={(e) => setConfirm(e.target.value)} />
        <button disabled={loading} className="bg-orange-600 text-white py-2 rounded">
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
