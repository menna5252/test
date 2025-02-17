import BrandCard from "../BrandCard/BrandCard";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function Brands() {
  document.title="Brands"
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getBrands() {
    try {
      setIsLoading(true);
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      setBrands(res.data.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getSpecificBrand(_id) {
    try {
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${_id}`);
      setSelectedBrand(res.data.data);
    } catch (error) {
      console.error("Error fetching brand details:", error);
    }
  }
 
  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <div className="lg:py-24">
        <div className="relative py-16">
          {isLoading ? (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
              <FaSpinner className="loaderIcon text-white text-5xl" />
            </div>
          ) : (
            <div className="grid gap-10 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {brands.map((b)  => (
                <div >
                  <BrandCard brand={b} key={b._id} onClick={() => getSpecificBrand(b._id)} />
                </div>
              ))}
            </div>
          )}
          {
            selectedBrand && (
             
             <>
                 <div onClick={() => setSelectedBrand(null)} className="fixed inset-0 bg-black/50 flex justify-center "> 
                  </div>
                  <div  className="mt-10 bg-white h-72 rounded-lg shadow-lg max-w-md w-full py-3 px-3 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                     <div className="border-b">
                     <button
                     onClick={() => setSelectedBrand(null)}
                     className="relative -right-[95%] text-gray-500 hover:text-red-500 text-xl"
                     >
                     <IoClose />
                     </button>
                     </div>
                     <div className=" border-b mb-4 flex justify-between">
                     <div className="mt-2 p-5">
                     <h2 className="font-semibold text-center mt-4 py-4 text-green-500 text-xl">{selectedBrand.name}</h2>
                     <p className="text-gray-600 text-center">{selectedBrand.slug}</p>
                     </div>
                     <img className="w-72 h-40 block object-cover " src={selectedBrand.image} alt={selectedBrand.name} />
                     </div>
   
                     <div className="py-2 px-3 flex justify-end items-center">
                     <button onClick={() => setSelectedBrand(null)} className="rounded text-white bg-gray-500 transition-all duration-500 hover:bg-gray-600  px-3.5 py-1.5">
                     close
                     </button>
                     </div>
                   </div>
             </>
           
            )
          }
        </div>
      </div>
    </>
  );
}
