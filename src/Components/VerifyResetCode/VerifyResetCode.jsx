import * as Yup from "yup";
import React from "react";
import axios from "axios";
import verifyImg from "../../assets/verifyCode.png";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function VerifyResetCode() {
  document.title="Verification"
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { resetCode: "" },
    validationSchema: Yup.object({
      resetCode: Yup.string()
        .required("Verification code is required")
        .matches(/^[0-9]{6}$/, "Code must be 6 digits"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      console.log("Form Submitted", values);
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          { resetCode: values.resetCode.toString() }
        );
        console.log(data);  
        if (data.status === "Success") {
          navigate("/reset-password");
        }
      } catch (error) {
        console.error(error);  
        setErrors({ resetCode: error.response?.data?.message || "Invalid verification code" });
      }
      setSubmitting(false);
    },
    
  });

  return (
    <div className="py-24">
      <div className="grid grid-cols-12 gap-5 items-center justify-center pt-6">
        <div className="col-span-12 md:col-span-6">
          <img className="block w-full lg:w-[70%] mx-auto" src={verifyImg} alt="verify code" />
        </div>
        <div className="col-span-12 md:col-span-6 w-full mx-auto">
        <form onSubmit={formik.handleSubmit}>
  <h2 className="text-2xl md:text-lg xl:text-3xl text-center capitalize text-green-500 mb-10">
    Reset Your Account Password
  </h2>
<div className="relative z-0 w-full mb-10 group">
<input
    type="text"  
    name="resetCode"
    placeholder=""
    id="resetCode"
    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
    value={formik.values.resetCode}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your verification code</label>

</div>
  {formik.touched.resetCode && formik.errors.resetCode && (
    <p className="text-red-500 text-sm mt-2">{formik.errors.resetCode}</p>
  )}
  <div className="flex justify-end">
    <button
      type="submit"  
      disabled={formik.isSubmitting}
      className="mt-8 capitalize bg-transparent border border-green-500 px-12 py-3 rounded-md font-semibold text-md tracking-wide text-green-500 hover:bg-green-500 hover:text-white transition"
    >
      {formik.isSubmitting ? "Verifying..." : "Verify"}
    </button>
  </div>
</form>

        </div>
      </div>
    </div>
  );
}
