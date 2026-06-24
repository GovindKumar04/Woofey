import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthModal from "./components/auth/AuthModal";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import { fetchUser } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();

  // Restore the logged-in user from the auth cookie on first load.
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <Footer />

      <AuthModal />
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
