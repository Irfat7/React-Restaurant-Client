import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import Secret from "../pages/Shared/Secret/Secret";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../pages/Dashboard/MyCart/MyCart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoutes from "./AdminRoutes";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import Payment from "../pages/Dashboard/Payment/Payment";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/menu',
        element: <Menu></Menu>
      },
      {
        path: '/order',
        element: <Order></Order>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/secret',
        element: <PrivateRoutes><Secret></Secret></PrivateRoutes>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoutes> <Dashboard></Dashboard></PrivateRoutes>,
    children: [
      {
        path: '/dashboard/mycart',
        element: <MyCart></MyCart>
      },
      {
        path: '/dashboard/allusers',
        element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
      },
      {
        path: '/dashboard/additems',
        element: <AdminRoutes><AddItems></AddItems></AdminRoutes>
      },
      {
        path: '/dashboard/manageitems',
        element: <AdminRoutes><ManageItems></ManageItems></AdminRoutes>
      },
      {
        path: '/dashboard/payment',
        element: <PrivateRoutes><Payment></Payment></PrivateRoutes>
      },
      {
        path: '/dashboard/userhome',
        element: <PrivateRoutes><UserHome></UserHome></PrivateRoutes>
      },
      {
        path: '/dashboard/adminhome',
        element: <AdminRoutes><AdminHome></AdminHome></AdminRoutes>
      }
    ]
  },
]);