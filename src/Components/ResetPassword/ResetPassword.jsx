import * as Yup from "yup";
import React, { useContext, useState } from "react";
import axios from "axios";
import resetImg from "../../assets/Resetpassword.png";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function ResetPasswordAndChangePassword() {
  document.title="Reset Password"
  const { token, setToken, setIsLogin, setUserLogin } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token); 
  const navigate=useNavigate();
  const resetPasswordSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{5,16}$/,"password must start with capital letter and must be more than 5 characters").required("New password is required"),
  });
  
  const resetPasswordFormik = useFormik({
    initialValues: {
      email:  "" , 
      newPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      try {   
        let response = await axios.put(
            "https://ecommerce.routemisr.com/api/v1/auth/resetPassword", 
            {
              email: values.email,
              newPassword: values.newPassword,
            }
          );
          if (response.data && response.data.token) {
            localStorage.setItem("token", response.data.token);
            setToken(response.data.token);
            setIsLogin(true);
            toast.success("Password reset successful. You are now logged in.", {
              duration: 3000,
              position: "top-right",
              style: {
                background: "#367c2b",
                color: "#fff",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "black",
              },
            });
           
            navigate("/"); 
          }
        
      } catch (error) {
        toast.error(error.response?.data?.message || "Error processing password update.", {
          duration: 3000,
          position: "top-right",
        });
        console.log();
      }
    },
  });

  return (
    <div className="py-24">
      <div className="grid grid-cols-12 gap-5 items-center justify-center pt-6">
        <div className="col-span-12 md:col-span-6">
          <img className="block w-full lg:w-[70%] mx-auto" src={resetImg} alt="reset password" />
        </div>
        <div className="col-span-12 md:col-span-6 w-full mx-auto">
          <form onSubmit={resetPasswordFormik.handleSubmit}>
            <h2 className="text-2xl md:text-lg xl:text-3xl text-center capitalize text-green-500 mb-9">
             Reset Your Account Password
            </h2>
            {!isLoggedIn && (
              <div className="relative z-0 w-full mb-10 group">
                <input
                  type="email"
                  name="email"
                  placeholder=""
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  value={resetPasswordFormik.values.email}
                  onChange={resetPasswordFormik.handleChange}
                  onBlur={resetPasswordFormik.handleBlur}
                />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Email Address</label>

                {resetPasswordFormik.touched.email && resetPasswordFormik.errors.email && (
                  <p className="text-red-500">{resetPasswordFormik.errors.email}</p>
                )}
              </div>
            )}
            <div className="relative z-0 w-full group">
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder=""
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                value={resetPasswordFormik.values.newPassword}
                onChange={resetPasswordFormik.handleChange}
                onBlur={resetPasswordFormik.handleBlur}
              />
              <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Password</label>

              {resetPasswordFormik.touched.newPassword && resetPasswordFormik.errors.newPassword && (
                <p className="text-red-500">{resetPasswordFormik.errors.newPassword}</p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={resetPasswordFormik.isSubmitting}
                className="mt-8 capitalize bg-transparent border border-green-500 px-12 py-3 rounded-md font-semibold text-md tracking-wide text-green-500 hover:bg-green-500 hover:text-white transition"
              >
                {resetPasswordFormik.isSubmitting ? "Processing..." : isLoggedIn ? "Change Password" : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
