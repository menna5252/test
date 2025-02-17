import ProductCard from "../ProductCard/ProductCard";
import React, { useContext } from "react";
import Slider from "react-slick";
import axios from "axios";
import toast from "react-hot-toast";
import { Query, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

export default function ProductDetails({product}) {
  const{id,cId}= useParams();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const {wishList,addProductToWishList,removeProductFromWishList,isInWishList} = useContext(WishListContext);
  const[isAdding,setIsAdding]=useState(false);
  const{addProductToCart,setCart}=useContext(CartContext);
 

const {isFetching, isLoading, error, data, isError}=useQuery({
  queryKey: ["getProductDetails", id],
  queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
  staleTime:0,
})
async function handleAddProductToCart(id){
  setIsAdding(true);
  const response =await addProductToCart(id);
  setIsAdding(false);
  setCart(response.data.numOfCartItems)
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
 
 
  console.log(response);
  
}
const isFav = isInWishList(data?.id);



  const [relatedProducts, setRelatedProducts] = useState([]);

async function getProducts(){
  
try {
  const{data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
 const products= data.data.filter(p=> p.category._id === cId);
 setRelatedProducts(products);
}catch (error) {
  console.log("error fetching product", error)
}
 }

 useEffect(()=>{

  getProducts();
 },[cId])
 
  return <>
    {
      isLoading ? <>
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center" >
                   <FaSpinner className="loaderIcon text-white text-5xl"/>
              </div>
      </>:<>
       <div className="grid grid-cols-12 gap-4 mt-7 mb-8 py-20">
    <div className="col-span-12 md:col-span-6">
     {data?.images.length>1?<>
      <Slider {...settings} className="w-[350px]">
        {data?.images.map((src)=><img className="w-full  mx-auto md:w-[70%]" src={src} alt="" />
)}
    </Slider>
     </>:<>
     <img className="w-[70%]" src={data?.imageCover} alt="" />
     </>}
    </div>
    <div className="col-span-12 mt-6 md:mt-0 md:col-span-6 md:self-center">
      <h2 className="mb-6 leading-normal text-green-500 text-3xl">{data?.title}</h2>
      <p className="mb-3 leading-normal text-black/70">{data?.description}</p>
      <p className="mb-3">{data?.name}</p>
      <div className="flex justify-between mb-2 text-gray-500">
        <span>{data?.price} Egy</span>
        <span className="flex gap-3 items-center">{data?.ratingsAverage}<FaStar className="text-yellow-400"/></span>
      </div>
      <div className="flex justify-center mt-10 gap-6">
        <button disabled={isAdding} onClick={()=>handleAddProductToCart(id)} className="text-center flex justify-center group w-full lg:w-[70%] bg-green-500 border hover:bg-transparent group-hover:shadow-xl hover:text-green-500 transition-all duration-500 border-green-500 outline-none  px-12 py-3 rounded-md font-semibold text-md tracking-wide text-white">
        {isAdding ? <>
              <FaSpinner className="loaderIcon text-white group-hover:text-green-500" />
              </>:"+ Add Product"}
        </button>
        <button className="self-center cursor-pointer ml-2 lg:ml-0 text-3xl mr-2"
         onClick={() =>{isFav ? removeProductFromWishList(data.id):addProductToWishList(data)}}>
          < FaHeart className={`${isFav ? "text-red-500" : "text-gray-600"} `} />

        </button>
      </div>
    </div>
  </div>
  <h2 className="mb-10 text-center text-green-500">Related Products</h2>
  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
  {
    relatedProducts.map((p)=> {
      const isFav =isInWishList(p.id)
     return <ProductCard key={p.id} product={p} isFav={isFav} />})
  }
  </div>
      </>
    }
  
  </>
}
