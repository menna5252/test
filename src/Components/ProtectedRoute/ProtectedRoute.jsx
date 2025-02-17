import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function ProtectedRoute({children}) {
    const [first, setfirst] = useState()
    const {isLogin}= useContext(UserContext);
    if(isLogin){
      return children;
    }else{
      return <Navigate to={"/login"}></Navigate>
    }
  return (
   <>
   <h1>ProtectedRoute</h1>
   <p>Lorem ipsum dolor sit amet consectetur.</p>
   </>
  )
}
