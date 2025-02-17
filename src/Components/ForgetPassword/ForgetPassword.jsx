import * as Yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import forgetPass from "../../assets/Forgot password.png";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  document.title="Forget Password"
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
    }),
    onSubmit: async (values) => {
      setMessage("");
      setError("");
      setLoading(true);

      try {
        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          values
        );

        setMessage("A verification code has been sent to your email.");
        navigate("/verify-code"); 
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="py-24">
      <div className="grid grid-cols-12 gap-5 items-center justify-center pt-6">
        <div className="col-span-12 md:col-span-6">
          <img className="block w-full lg:w-[70%] mx-auto" src={forgetPass} alt="Forgot password" />
        </div>
        <div className="col-span-12 md:col-span-6 w-full mx-auto">
          <form onSubmit={formik.handleSubmit}>
            <h2 className="text-2xl md:text-lg xl:text-3xl text-center capitalize text-green-500 mb-10">
              Please enter your email to receive a verification code
            </h2>
          <div className="relative z-0 w-full  group">
          <input
              type="email"
              name="email"
              placeholder=""
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Email Address</label>

          </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 mt-2">{formik.errors.email}</p>
            )}
            {message && <p className="text-green-500 mt-2">{message}</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="mt-8 capitalize bg-transparent border border-green-500 px-12 py-3 rounded-md font-semibold text-md tracking-wide text-green-500 hover:bg-green-500 hover:text-white transition"
              >
                {loading ? "Sending..." : "Verify"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
