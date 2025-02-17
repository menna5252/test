import React, { useContext, useEffect, useState } from "react";
import WishListProductDetails from "../WishListProductDetails/WishListProductDetails";
import emptyWishList from "../../assets/emptyone.png";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

export default function WishList() {
  document.title="WishList"
const{wishList,removeProductFromWishList}=useContext(WishListContext);
  const {addProductToCart,setCart}= useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
 

  async function handleAddProductToCart(id){
    setIsLoading(true);
    const response =await addProductToCart(id);
    setCart(response.data.numOfCartItems);
     toast.success(response.data.message,{
      duration:5000,
      position:"top-right",
      style:{
        background:"#367c2b",
        color:"#fff"
      },
      iconTheme:{
        primary:"#fff",
        secondary:"black"
      }
    });
   setIsLoading(false)
  }

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <FaSpinner className="loaderIcon text-white text-5xl" />
        </div>
      ) : (<>
        <div className="py-24 text-center mt-10">
          <h2 className="capitalize text-green-400">WishList Page</h2>

          {wishList?.length !== 0 ? <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        <span className="sr-only">Image</span>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Remove
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Add
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishList?.map((item) => (
                      <WishListProductDetails
                        key={item.id}
                        item={item}
                        removeProductFromWishList={removeProductFromWishList}
                        handleAddProductToCart={handleAddProductToCart}
                      />
                    
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          : <>
              <div className="my-7 text-center">
                <img className="block mx-auto" src={emptyWishList} alt="Empty WishList" />
                <h3 className="capitalize text-black/80 mb-3">Your Wish List is empty</h3>
                <p className="text-gray-500 max-w-[90%] md:max-w-[50%] lg:max-w-[30%] mx-auto leading-6 mb-7">Looks like you have not added anything to your cart. Go ahead & explore our products</p>
                <Link to="/products" className="text-center border border-green-500 outline-none hover:bg-green-500 hover:text-white transition-all duration-500 px-12 py-3 rounded-md font-semibold text-md tracking-wide text-green-500">explore products</Link>
              </div>
          
            </>}
        </div>
        </>)}
    </>
  );
}
