import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import LoginSignup from "./components/Auth/LoginSignup";
import "./App.css";
import Footer from "./components/Footer/Footer";
import axios from "axios";

function App() {
  const [signUpVisible, setSignupVisible] = useState(false);
  const [login, setlogin] = useState(false);

  const handleSignupVisibility = () => {
    setSignupVisible(true);
  };

  const handleClose = () => {
    setSignupVisible(false);
  };

  const handlelogin = (status) => {
    setlogin(status);
  };

  // 👇 Auto-login check on first render
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:4000/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setlogin(true);
        }
      } catch (err) {
        console.log("Token invalid or expired:", err);
        localStorage.removeItem("token");
      }
    };

    verifyToken();
  }, []);

  return (
    <>
      <Navbar onSignupClick={handleSignupVisibility} login={login} />
      <div className={`${signUpVisible ? "" : ""} transition-all duration-300 pt-20 px-40 min-h-screen -z-0 `}>
        <Outlet />
      </div>
      {signUpVisible && <LoginSignup onClose={handleClose} setlogin={handlelogin} />}
      <Footer />
    </>
  );
}

export default App;
