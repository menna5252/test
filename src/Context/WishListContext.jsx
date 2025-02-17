import axios from "axios";
import toast from "react-hot-toast";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const WishListContext =createContext();

export default function WishListContextProvider({ children }){
    const {token}=useContext(UserContext);

    const[wishList,setWishList]= useState([]);
    
    function getUserWishList(){
        try {
          const {data}= axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers:{
                  token
              }
          })
          setWishList(data?.data||[]);
          localStorage.setItem("wishlist",JSON.stringify(data?.data||[]));
        } catch (error) {
          console.log(error);    
        }
     }
 
  async function addProductToWishList(product){
     
        try {
          await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            productId : product.id,
        },{
            headers:{
                token
            }
        })
        let updateList=([...(wishList||[]) , product]);
        setWishList(updateList);
        toast.success("Product added successfully to your wishlist", {
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
        localStorage.setItem("wishlist",JSON.stringify(updateList));

        } catch (error) {
          console.log(error);
          
        }
    }

   
  async function removeProductFromWishList(productId){
     
      try {
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
          headers:{
                token
            }
        })
        let filteredProduct =wishList?.filter((item)=>item.id!==productId);
        setWishList(filteredProduct);
        toast.success("Product removed successfully from your wishlist", {
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
        localStorage.setItem('wishlist',JSON.stringify(filteredProduct));
      } catch (error) {
        console.log(error);
        
      }
   }
  function isInWishList(productId){
    return wishList?.some(item => item.id == productId);
  }

  useEffect(() => {
    const storedFav = localStorage.getItem("wishlist");
    if(storedFav){
      setWishList(JSON.parse(storedFav));
    }else{
      getUserWishList();
    }
  }, [])

     return <WishListContext.Provider value={{ wishList, addProductToWishList , getUserWishList , removeProductFromWishList, isInWishList }}>
         {children}
     </WishListContext.Provider>
 }