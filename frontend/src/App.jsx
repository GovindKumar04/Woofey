import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/authSlice";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const dispatch = useDispatch();

  useEffect( () => {
    const a=dispatch( fetchUser());
    console.log(a)
  }, [dispatch]);

  return (
    <>
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {/* Login Modal */}
      {showLogin && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowLogin(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg relative">
              <Login onClose={() => setShowLogin(false)} />
            </div>
          </div>
        </>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowSignup(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg relative">
              <Signup onClose={() => setShowSignup(false)} />
            </div>
          </div>
        </>
      )}

      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
