import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaSpinner, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { UserContext } from "../../Context/UserContext";
import { WishListContext } from "../../Context/WishListContext";

export default function ProductCard({ product, isFav }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  let {wishList,addProductToWishList,removeProductFromWishList,isInWishList} = useContext(WishListContext);
  const { addProductToCart, setCart } = useContext(CartContext);
  const { isLogin } = useContext(UserContext);
  
  async function handleAddProductToCart(id) {
    setIsAddingToCart(true);
    try {
      const response = await addProductToCart(id);
      setCart(response.data.numOfCartItems);
      toast.success(response.data.message, {
        duration: 5000,
        position: "top-right",
        style: {
          background: "#367c2b",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "black",
        },
      });
    } catch (error) {
      toast.error("Failed to add product to cart.");
    }
    setIsAddingToCart(false);
  }



  return (
    <div className="hover:shadow-md p-4 group rounded-md border-2 border-gray-300 hover:border-green-400 hover:-translate-y-4 transition-all duration-500">
      <Link to={`/productDetails/${product.id}/${product.category._id}`}>
        <img className="w-full object-cover object-center" src={product.imageCover} alt="" />
        <div className="p-3">
          <span className="text-green-500 text-sm">{product.category.name}</span>
          <h2 className="text-base font-semibold my-3 text-gray-800">
            {product.title.split(" ", 2).join(" ")}
          </h2>
          <div className="flex justify-between">
            <span className="text-gray-500">{product.price} EGP</span>
            <span className="text-gray-500">
              {product.ratingsAverage} <FaStar className="inline-block text-yellow-300" />
            </span>
          </div>
        </div>
      </Link>

      <div className="flex justify-between py-4">
        <button
          disabled={isAddingToCart || !isLogin}
          onClick={() => handleAddProductToCart(product.id)}
          className={`group border px-12 py-3 rounded-md font-semibold text-md tracking-wide transition-all duration-500 
            ${isLogin ? "bg-green-500 text-white border-green-500 hover:bg-transparent group-hover:shadow-xl hover:text-green-500" 
                      : "bg-green-400 text-white border-green-400 cursor-not-allowed"}`}
        >
          {isAddingToCart ? (
            <FaSpinner className="loaderIcon animate-spin text-white group-hover:text-green-500" />
          ) : (
            "+ Add Product"
          )}
        </button>
        <button
        disabled={!isLogin}
         className={`self-center ml-2 lg:ml-0 text-3xl mr-2 ${isLogin?"cursor-pointer":"cursor-not-allowed"} `}
         onClick={() =>{isFav ? removeProductFromWishList(product.id): addProductToWishList(product)}}>
            <FaHeart
            className={`${isFav ? "text-red-500" : "text-gray-600"} `}
            />
        </button>
      </div>
    </div>
  );
}
