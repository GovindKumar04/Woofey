import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar"; 
import { Outlet } from "react-router-dom";
import LoginSignup from "./components/Auth/LoginSignup";
import "./App.css";
import Footer from "./components/Footer/Footer";

function App() {
  const [signUpVisible, setSignupVisible] = useState(false);
  const [login, setlogin] = useState(false)

  const handleSignupVisibility = () => {
    setSignupVisible(true);
  };

  const handleClose = () => {
    setSignupVisible(false);
  };
  const handlelogin= (status)=>{
    setlogin(status)
  }
  return (
    <>
      <Navbar onSignupClick={handleSignupVisibility} login={login}/>
      <div className={`${signUpVisible ? "" : ""} transition-all duration-300 pt-20 px-40 min-h-screen -z-0 `}>
        <Outlet />
      </div>
      {signUpVisible && <LoginSignup onClose={handleClose} setlogin={handlelogin}/>}
      <Footer/>
    </>
  );
}

export default App;


 