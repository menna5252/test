import React, { useContext, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { GiShoppingCart } from "react-icons/gi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext.jsx";
import { UserContext } from "../../Context/UserContext.jsx";

export default function Navbar() {
  const {cart} = useContext(CartContext);
  const navigate=useNavigate();
    const [pages, setPages] = useState([
      {name:"Home",path:"/"},
      {name:"Cart",path:"/cart"},
      {name:"WishList",path:"/wishlist"},
      {name:"Products",path:"/products"},
      {name:"Categories",path:"/categories"},
      {name:"Brands",path:"/brands"},
    ])
    const [authPages, setAuthPages] = useState([
      {name:"Register",url:"/register"},
      {name:"Login",url:"/login"},
     
    ])

    let {isLogin,setToken} = useContext(UserContext);
    function logOut(){
      setToken(null);
      navigate("/login")
    }
   
    useEffect(()=>{
        return ()=>{

        }
    },[])
  return (
   <>
   

  <nav className="bg-[#eee] fixed top-0 left-0 right-0 shadow-md z-30 border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center gap-4  mx-auto p-4">
    <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
    <GiShoppingCart className="text-5xl text-green-500 translate-x-4 scale-x-[-1]" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Fresh Cart</span>
    </Link>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center ml-auto text-xl p-2 w-10 h-10 justify-center  text-green-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none  focus:ring-2  focus:ring-green-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <FaBars />
    </button>
    <div className="hidden grow gap-6 w-full mx-auto text-center lg:flex items-center lg:w-auto" id="navbar-default">
      <ul className="font-medium lg:mx-auto flex flex-col p-4 lg:p-0 mt-4 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
       
     {
      
    isLogin && pages.map(({name,path})=> <li key={path}>
      <NavLink to={path} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-green-500 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">{name}</NavLink>
  </li>)}
     
      </ul>
   
      <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0  dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
       
          {
          !isLogin && authPages.map(({name,url})=> <li key={url}><NavLink to={url} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-green-500 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">{name}</NavLink></li>)
          }

          {
            isLogin&&<li>
              <button type="button" class="relative inline-flex items-center p-3 text-sm font-medium text-center text-gray-600 hover:text-green-500 transition-all duration-500  focus:outline-none  dark:text-green-600 dark:hover:text-green-700">
              <FaCartShopping className="text-3xl" />

              <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 border-2 border-green-500 rounded-lg -top-1 -end-2 dark:border-gray-900">{cart}</div>
            </button>
           
            </li>
          }
     {
       isLogin &&<li className="flex items-center">
        <button
        onClick={()=>logOut()}
         className="block w-full py-2 px-3 mx-auto text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-green-500 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">
          logOut
        </button>
      </li>
     }
      </ul>
    </div>
  </div>
</nav>
   </>
  )
}
