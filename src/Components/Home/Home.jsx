import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import ProductCard from "../ProductCard/ProductCard";
import React, { useContext, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { WishListContext } from "../../Context/WishListContext";
import { useGetProducts } from "../../Hooks/useGetProducts";

export default function Home() {


document.title="Home"
 const {isLoading,error,isError,products,isFetching}=useGetProducts();
 const [searchTerm, setSearchTerm] = useState("");
      const {wishList,addProductToWishList,removeProductFromWishList,isInWishList} = useContext(WishListContext);
 const filteredProducts = products ? products.filter(product => 
  product.title.toLowerCase().includes(searchTerm.toLowerCase())
) : [];

  return <>
 <div className="lg:py-24">
    <div className="mb-4">
        <MainSlider/>
        <CategoriesSlider/>
      </div>
    <div className="relative py-16">
    <div className="mb-8 p-4">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-400 rounded px-4 py-2 w-full outline-none focus:border-green-400 focus:outline-none focus:ring-green-400"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
    {
        isLoading?<>
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center" >
             <FaSpinner className="loaderIcon text-white text-5xl"/>
        </div>
        </>:
        <>
            <div className="grid gap-12 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {
                  filteredProducts.map((p) => {
                                    const isFav =isInWishList(p.id)
                                    return(<ProductCard key={p.id} product={p} isFav={isFav} />);
                                  })
                }
              </div>
        </>
    }

    </div>
 </div>
  </>
}
