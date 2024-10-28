import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar"; 
import { Outlet } from "react-router-dom";
import LoginSignup from "./components/Auth/LoginSignup";
import "./App.css";
import Footer from "./components/Footer/Footer";

function App() {
  const [signUpVisible, setSignupVisible] = useState(false);

  const handleSignupVisibility = () => {
    setSignupVisible(true);
  };

  const handleClose = () => {
    setSignupVisible(false);
  };

  return (
    <>
      <Navbar onSignupClick={handleSignupVisibility} />
      <div className={`${signUpVisible ? "" : ""} transition-all duration-300 pt-20 px-40 h-screen`}>
        <Outlet />
      </div>
      {signUpVisible && <LoginSignup onClose={handleClose} />}
      <Footer/>
    </>
  );
}

export default App;
