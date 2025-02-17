import * as Yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import signup from "../../assets/signup.png";
import { useFormik } from "formik";
import { FaSpinner } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  document.title="Register"
  const{setToken}=useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setapiError] = useState("");
    const navigate=useNavigate();
    function handleRegister(formValues){
      setIsLoading(true);
      axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,formValues)
       .then((apiResponse)=>{
        setIsLoading(false);
        navigate("/");
        setToken(apiResponse.data.token);
       })
       .catch((apiResponse)=>{
        setIsLoading(false);
        setapiError(apiResponse?.response?.data?.message);
        console.log(apiResponse?.response?.data?.message);
       })
    }
    let registerSchema=Yup.object().shape({
      name:Yup.string().min(3,'Name minLength must be 3 characters').max(10,'name maxLength must be 10 characters').required("name is required"),
      email:Yup.string().email("email is inValid").required("email is required"),
      phone:Yup.string().matches(/^01[0125][0-9]{8}$/,"phone must be egyption number").required("phone is required"),
      password:Yup.string().matches(/^[A-Z][a-z0-9]{5,16}$/,"password must start with capital letter and must be more than 5 characters").required("password is required"),
      rePassword:Yup.string().oneOf([Yup.ref('password')],"password and repassword should be the same ").required("repassword is required"),
    })
    const formik =useFormik({
      initialValues:{
        name:"",
        email:"",
        phone:"",
        password:"",
        rePassword:"",
      },
      onSubmit:handleRegister,
      validationSchema:registerSchema
    })
    useEffect(()=>{


        return ()=>{

        }
    },[])
  return (
   <>
   <div>
    <div className="grid grid-cols-12 gap-5 items-center pt-12">
      <div className="col-span-12 md:col-span-6">
        <img className="block w-full" src={signup} alt="login image" />
      </div>
      <div className="col-span-12 md:col-span-6 w-full mx-auto">
    
        <h2 className="mb-8 text-center capitalize text-green-400">register now</h2>
        <form onSubmit={formik.handleSubmit} className="mt-5">
         
        <div className="relative z-0 w-full mb-5 group">
    <input
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     value={formik.values.email}
     type="email" 
     name="email" 
     id="email"
     placeholder="" 
     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"  />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  



  <div className="relative z-0 w-full mb-5 group">
    <input 
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.password}
      type="password" 
      name="password" 
      id="password" 
      placeholder=""
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"  />
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  {
  formik.errors.password && formik.touched.password && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.password}
</div>
}
 
  <div className="relative z-0 w-full mb-5 group">
    <input 
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.rePassword}
    type="password" 
    name="rePassword" 
    id="rePassword" 
    placeholder=""
    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
     />
    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
  </div>
  {
  formik.errors.rePassword && formik.touched.rePassword && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.rePassword}
</div>
}
 
  <div className="relative z-0 w-full mb-5 group">
    <input 
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.name}
    type="text" 
    name="name" 
    id="name" 
    placeholder=""
    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"  />
    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
  </div>
  {
  formik.errors.name && formik.touched.name && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.name}
</div>
}

  <div className="relative z-0 w-full mb-5 group">
    <input 
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     value={formik.values.phone}
    type="tel" 
    name="phone" 
    id="phone" 
    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"  
    placeholder=""/>
    <label 
    htmlFor="phone" 
    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >Phone</label>
  </div>

  {
  formik.errors.phone && formik.touched.phone && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.phone}
</div>
}
{
          apiError? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {apiError}</div>:null}

          <div className="flex justify-end mt-3 mb-10">
            <button className="capitalize  bg-green-500 border border-green-500 outline-none  px-12 py-3 rounded-md font-semibold text-md tracking-wide text-white">
              {
                isLoading?<FaSpinner className="loaderIcon text-white" />:"register"
              }
            </button>
          </div>
         <p className="text-center text-gray-500 font-medium text-base">Already have an Account?</p>
        <div className="flex justify-center mt-6">
        <NavLink className="text-center border border-green-500 outline-none hover:bg-green-500 hover:text-white transition-all duration-500 px-12 py-3 rounded-md font-semibold text-md tracking-wide text-green-500 capitalize" to="/login">login now</NavLink>
        </div>
        </form>
      </div>
    </div>
   </div>
   </>
  )
}
