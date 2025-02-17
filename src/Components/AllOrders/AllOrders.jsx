import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AllOrders() {
    document.title = "Orders";
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { id } = jwtDecode(localStorage.getItem("token"));
   async function getAllOrders(){
    setIsLoading(true)
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    setIsLoading(false)
    console.log(response.data);
    setOrders(response.data);
   }
    useEffect(() => {
        getAllOrders();
    }, []);

 
    return (
     <>
      { isLoading?<>
             <div className="fixed inset-0 bg-black/50 flex justify-center items-center" >
                  <FaSpinner
                   className="loaderIcon text-white text-5xl"/>
             </div>
             </>:<>
     <div className="py-28">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
       {orders?.map((order,idx)=>{return <div key={idx} className="p-4 border border-green-400 shadow-lg">
            <h2 className="mb-5 capitalize text-green-500 text-center text-xl lg:text-3xl">total Price: <span className="text-xl lg:text-3xl text-black/80">{order.totalOrderPrice} Egy</span></h2>
            <h2 className="mb-5 capitalize text-green-500 text-center text-xl lg:text-3xl">payment Method: <span className="text-xl lg:text-3xl text-black/80">{order.paymentMethodType}</span></h2>
           <div className="p-4">
           <h2 className="my-7 capitalize text-green-500">product:</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {order.cartItems?.map((item,idx)=>{return <div key={idx} className="p-3 shadow-md">
                <img src={item.product.imageCover} className="w-full" alt="" />
                </div>})}
              </div>
           </div>
        </div>})}
       </div>
       <div className="flex justify-center mt-10">
       <Link className="capitalize bg-transparent border border-green-500  outline-none  px-12 py-3 rounded-md font-semibold text-md tracking-wide text-green-500" to="/">Go To Home</Link>

       </div>
     </div>
     </>}
     </>
    );
}