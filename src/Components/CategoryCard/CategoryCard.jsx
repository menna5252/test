import React, { useEffect, useState } from "react";

export default function CategoryCard({category,onClick}) {
   
       
    useEffect(()=>{

 
        return ()=>{

        }
    },[])
  return (
   <>
      <div onClick={onClick} className="rounded-md cursor-pointer  border-2 border-gray-300  hover:shadow-xl hover:border-green-400 transition-all duration-500 overflow-hidden ">
        <img src={category.image} className="-translate-y-2 h-[300px] block w-full object-cover" alt="" />
        <div className="py-2">
        <h4 className="p-2 text-center text-green-500">{category.name}</h4>
        </div>
      </div> 
   </>
  )
}
