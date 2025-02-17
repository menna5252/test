import Products from "../Products/Products";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function WishListProductDetails({ item, removeProductFromWishList, handleAddProductToCart }) {
  const [isRemoving, setIsRemoving] = useState(false); 
  const [isAdding, setIsAdding] = useState(false); 
  
  async function handleRemove() {
    try {
      setIsRemoving(true); 
      await removeProductFromWishList(item._id);
    } catch (error) {
      console.error("Error removing product:", error);
    } finally {
      setIsRemoving(false);
    }
  }

  const handleAdd = async () => {
    try {
      setIsAdding(true); 
      await handleAddProductToCart(item.id);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsAdding(false); 
    }
  }

  return (
    <>
       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="p-4">
                        <img
                          src={item.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={item.title} 
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </td>
              
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {item.price}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          onClick={handleRemove}
                          className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
                        >
                          {isRemoving ? (
                            <FaSpinner className="loaderIcon text-red-600 dark:text-red-500" />
                          ) : (
                            "Remove"
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          onClick={handleAdd}
                          className="font-medium cursor-pointer text-green-500 dark:text-green-400 hover:underline"
                        >
                          {isAdding ? (
                            <FaSpinner className="loaderIcon text-green-500 dark:text-green-400" />
                          ) : (
                            "Add To Cart"
                          )}
                        </span>
                      </td>
                    </tr>
    </>
  );
}
