import { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginSignup({ onClose, setlogin }) {
  const [isLogin, setisLogin] = useState(true);

  const toggleisLogin = () => {
    setisLogin(!isLogin);
  };
  const [confirm_password, set_confirm_password] = useState("");
  const [formData, setformData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const api_endpoint = "http://localhost:5000/api/v1/user";
    const url = isLogin ? "/login" : "/register";

    try {
      if (!isLogin && formData.password !== confirm_password) {
        toast.error("Passwords do not match.");
        return;
      }

      const payload = isLogin
        ? {
            email: formData.email,
            number: formData.number,
            password: formData.password,
          }
        : {
            name: formData.name,
            email: formData.email,
            number: formData.number,
            password: formData.password,
          };

      const response = await axios.post(`${api_endpoint}${url}`, payload, {
        withCredentials: true,
      });
      // console.log(response);
      if (response.status >= 200 && response.status < 300) {
        toast.success(isLogin ? "Login successful!" : "Signup successful!");
        if (isLogin) setlogin(true);
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
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-red-600 font-bold text-2xl hover:text-red-800"
            aria-label="Close"
          >
            ×
          </button>

          {/* Logo and Header */}
          <div className="flex flex-col items-center mb-4">
            <img src={assets.logo} alt="Logo" className="w-20" />
            <h1 className="mt-3 text-xl font-bold text-slate-800 text-center">
              {isLogin
                ? "Sign in to your account"
                : "Sign up for a new account"}
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} method="POST" className="space-y-4">
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  onChange={handleChange}
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-3 py-2 rounded-md text-gray-900 shadow-sm focus:outline-none"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <input
                onChange={handleChange}
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full px-3 py-2 rounded-md text-gray-900 shadow-sm focus:outline-none"
              />
            </div>

            {!isLogin && (
              <div>
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-900"
                >
                  Mobile Number
                </label>
                <input
                  onChange={handleChange}
                  id="number"
                  name="number"
                  type="tel"
                  required
                  className="w-full px-3 py-2 rounded-md text-gray-900 shadow-sm focus:outline-none"
                />
              </div>
            )}

            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                {isLogin && (
                  <button
                    type="button"
                    className="text-sm text-orange-600 hover:text-orange-500"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full px-3 py-2 rounded-md text-gray-900 shadow-sm focus:outline-none"
              />
            </div>

            {!isLogin && (
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Confirm password
                </label>
                <input
                  onChange={(e) => set_confirm_password(e.target.value)}
                  value={confirm_password}
                  id="confirm-password"
                  name="confirm_password"
                  type="password"
                  required
                  className="w-full px-3 py-2 rounded-md text-gray-900 shadow-sm focus:outline-none"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-orange-600 text-white font-semibold py-2 rounded-md hover:bg-orange-500"
            >
              {isLogin ? "Sign in" : "Sign up"}
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-4 text-center text-sm text-gray-600">
            {isLogin ? "Not a member?" : "Already a member?"}{" "}
            <button
              onClick={toggleisLogin}
              className="text-orange-600 font-semibold"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginSignup;
