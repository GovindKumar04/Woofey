import { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ onClose, setlogin }) {
  const [formData, setformData] = useState({
    email: "",
    number: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const api_endpoint = "http://localhost:5000/api/v1/user/login";

    try {
      const response = await axios.post(api_endpoint, formData, {
        withCredentials: true,
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success("Login successful!");
        setlogin(true);
        setTimeout(() => onClose(), 1500);
      } else {
        toast.error(response.data?.msg || "An error occurred.");
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again.");
      console.error(e);
    }
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div className="bg-orange-50 bg-opacity-30 backdrop-blur-sm w-full h-full fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="relative w-full max-w-md bg-orange-100 rounded-lg shadow-lg p-6">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-red-600 font-bold text-2xl hover:text-red-800"
            aria-label="Close"
          >
            ×
          </button>

          <div className="flex flex-col items-center mb-4">
            <img src={assets.logo} alt="Logo" className="w-20" />
            <h1 className="mt-3 text-xl font-bold text-slate-800 text-center">
              Sign in to your account
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <input
                onChange={handleChange}
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 rounded-md text-gray-900 shadow-sm focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 rounded-md text-gray-900 shadow-sm focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white font-semibold py-2 rounded-md hover:bg-orange-500"
            >
              Sign in
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            Not a member?{" "}
            <button onClick={() => setlogin(false)} className="text-orange-600 font-semibold">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
