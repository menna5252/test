import Navbar from "../Navbar/Navbar.jsx";
import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  

    useEffect(() => {
    
      return () => {
      }
    }, []);
    
  return <>
   <Navbar/>
   <div className="lg:max-w-screen-2xl container mx-auto">
      <div className="mb-4 py-10 md:py-20 lg:py-4">
        <Outlet></Outlet>
      </div>
   </div>
 
  
  </>
}
