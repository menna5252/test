import React, { useEffect, useState } from "react";
import _404page from "../../assets/404box.png";
import { Link } from "react-router-dom";

export default function Notfound() {
  document.title="Page Not Found"
    useEffect(()=>{


        return ()=>{

        }
    },[])
  return (
   <>
   <div className="py-24 text-center">
    <div className="flex flex-col justify-center items-center mt-5">
      <img src={_404page} className="w-full lg:w-[40%] mb-6" alt="404page" />
      <h2 className="my-3 text-black/80">404 Error</h2>
      <p className="max-w-[90%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[37%] text-gray-500 mb-5 text-lg tracking-wide">It seems like we can't find what you searched. The page you were looking for doesn't exist.</p>
      <Link to="/" className="capitalize  bg-green-500 border border-green-500 hover:bg-green-600 outline-none  px-12 py-3 rounded-md font-semibold text-md tracking-wide text-white">back to home</Link>
    </div>
   </div>
   </>
  )
}
