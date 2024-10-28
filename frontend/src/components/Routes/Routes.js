import { createBrowserRouter, Navigate } from "react-router-dom";
import App from '../../App';
import Home from "../Home/Home";
import Cart from "../Cart/Cart"; // Import your Cart component

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />, 
      },
      {
        path: "/",
        element: <Navigate to="/home" replace />,
      },
    ],
  },
]);

export default router;
