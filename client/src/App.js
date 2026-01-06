import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import "./App.css";
import Footer from "./components/Footer/Footer";

function App() {
  const [authModal, setAuthModal] = useState(null); // "login" | "signup" | null
  const [loginStatus, setLoginStatus] = useState(false);

  const openLogin = () => setAuthModal("login");
  const openSignup = () => setAuthModal("signup");
  const closeAuthModal = () => setAuthModal(null);

  const handleLoginStatus = (status) => {
    setLoginStatus(status);
    closeAuthModal(); // close modal after login/signup
  };

  return (
    <>
      <Navbar onLoginClick={openLogin} onSignupClick={openSignup} login={loginStatus} />

      <div className="transition-all duration-300 pt-20 px-40 min-h-screen -z-0">
        <Outlet />
      </div>

      {/* Conditionally render Login or Signup modal */}
      {authModal === "login" && <Login onClose={closeAuthModal} setlogin={handleLoginStatus} />}
      {authModal === "signup" && <Signup onClose={closeAuthModal} setlogin={handleLoginStatus} />}

      <Footer />
    </>
  );
}

export default App;
