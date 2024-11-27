import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../App";
import Home from "../Home/Home";
import Cart from "../Cart/Cart";
import Biryani from "../Pages/Biryani";
import Rolls from "../Pages/Rolls";
import Pizzas from "../Pages/Pizzas";
import Icecream from "../Pages/Icecream";
import Dosa from "../Pages/Dosa";
import Payment from "../Payment/Payment";
import Profile from "../Profile/Profile";
import Contact from "../Contact/Contact";

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
        element: <Cart />
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/biryani",
        element: <Biryani />,
      },
      {
        path : "/contact",
        element: <Contact/>
      },
      {
        path: "/roll",
        element: <Rolls />,
      },
      {
        path: "/pizzas",
        element: <Pizzas />,
      },
      {
        path: "/biryani",
        element: <Icecream />,
      },
      {
        path: "/dosa",
        element: <Dosa />,
      },

      {
        path: "/",
        element: <Navigate to="/home" replace />,
      },
      {
        path: '/profile',
        element: <Profile/>
      }
    ],
  },
]);

export default router;
