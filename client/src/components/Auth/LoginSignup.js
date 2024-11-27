import React, { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginSignup({ onClose, setlogin }) {
  const [isLogin, setisLogin] = useState(true);
  

  const toggleisLogin = () => {
    setisLogin(!isLogin);
  };

  const [formData, setformData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirm_password: "",
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
    try {
      const api_endpoint = "http://localhost:4000"
      if (!isLogin && formData.password !== formData.confirm_password) {
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
            confirm_password: formData.confirm_password,
          };

      const response = await axios.post(`${api_endpoint}${url}`, payload);
      if (isLogin && response.status === 200) {
        setlogin(true);
        toast.success("Login successful!");
        setTimeout(()=>{

          onClose();
        },3000)
      }else if(isLogin && response.status === 404){
        toast.error(response.msg)
      }else if(isLogin && response.status === 401){
        toast.error(response.msg)
      }
      if(!isLogin && response.status===201){
        toast.success("Signup successful!");
        toggleisLogin()
        setTimeout(()=>{

          onClose();
        },3000)
      }else if(!isLogin && response.status===409){
        toast.error(response.msg);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const url = isLogin ? "/signin" : "/signup";
  return (
    <>
      <ToastContainer/>
      <div className="bg-orange-50 bg-opacity-30 backdrop-blur-sm w-screen h-screen fixed top-0">
        <div className="flex  flex-col p-5  bg-orange-100 w-96 h-fit fixed top-1/4 bottom-1/4 right-1/3 left-1/3 rounded m-auto ">
          <div className="flex flex-col items-center  text-xl font-bold">
            <div>
              {" "}
              <img src={assets.logo} alt="" className="w-20" />
              <span onClick={onClose} className="cursor-pointer text-red-600">
                X
              </span>
            </div>

            <h1 className="mt-3 text-slate-800">
              {isLogin ? "Sign in to your account" : "Sign up to new account"}
            </h1>
          </div>

          <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} method="POST" className="space-y-6">
              {!isLogin && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="block w-full px-3 rounded-md py-1.5 text-gray-900 shadow-sm focus:outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full px-3 rounded-md  py-1.5 text-gray-900 shadow-sm focus:outline-none placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Mobile Number
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      id="number"
                      name="number"
                      type="tel"
                      required
                      autoComplete="email"
                      className="block w-full px-3 rounded-md  py-1.5 text-gray-900 shadow-sm focus:outline-none placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  {isLogin && (
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-orange-600 hover:text-orange-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  )}
                </div>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm focus:outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
                {!isLogin && (
                  <div className="mt-5">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm password
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={handleChange}
                        id="confirm-password"
                        name="confirm_password"
                        type="text"
                        required
                        className="block w-full px-3 rounded-md py-1.5 text-gray-900 shadow-sm focus:outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <button
                  onSubmit={handleSubmit}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isLogin ? "Sign in" : "Sign up"}
                </button>
              </div>
            </form>
          </div>
          <div>
            <p className="mt-5 text-center text-sm text-gray-500">
              {isLogin ? "Not a member?" : "Already a member?"}
              <a href="#" className="text-orange-600" onClick={toggleisLogin}>
                {isLogin ? "Sign up" : "Sign in"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginSignup;


