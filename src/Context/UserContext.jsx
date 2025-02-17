import { createContext, useEffect, useState } from "react";

export let UserContext =createContext(0);
export default function UserContextProvider(props){
    const [userLogin, setUserLogin] = useState(null);
    const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
    const [token, setToken] = useState(localStorage.getItem("token"));
    useEffect(()=>{
       if(token ==null){
        localStorage.removeItem("token");
        setIsLogin(false);
       }else{
        localStorage.setItem("token",token);
        setIsLogin(true);
       }

    },[token])
    
return <UserContext.Provider value={ {setToken, token, userLogin, setUserLogin, isLogin, setIsLogin,} }>
    {props.children}
</UserContext.Provider>
}