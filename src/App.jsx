import "./App.css";
import AllOrders from "./Components/AllOrders/AllOrders";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Notfound from "./Components/Notfound/Notfound";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Products from "./Components/Products/Products";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Register from "./Components/Register/Register";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import VerifyResetCode from "./Components/VerifyResetCode/VerifyResetCode";
import WishList from "./Components/WishList/WishList";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  let router = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute><Categories/></ProtectedRoute> },
        { path: "productDetails/:id/:cId", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "verify-code", element: <VerifyResetCode /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "wishlist", element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: "*", element: <Notfound /> },
      ]
    }
  ])

  return (
    <>
      <Toaster />
      <RouterProvider router={router}></RouterProvider>

    </>
  )
}

export default App
