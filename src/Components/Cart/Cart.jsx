import * as Yup from "yup";
import CartProductDetails from "../CartProductDetails/CartProductDetails";
import React, { useContext } from "react";
import emptyCart from "../../assets/emptyone.png";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { FaSpinner, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

export default function Cart() {

  document.title="Cart"
  const [openOnlineForm, setOpenOnlineForm] = useState(false);
  const [openCashForm, setOpenCashForm] = useState(false);
  const {getUserCart, removeProductFromCart, updateProductQuantity, clearCart,checkOutSession,setCart,cashPayment } =useContext(CartContext);
  const [numOfCartItems, setNumOfCartItems] = useState(0)
  const [cartId, setCartId] = useState(null)
  const [cartDetails, setCartDetails] = useState(null)
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoadings] = useState(false);
  const [apiError, setapiError] = useState("");
  const navigate=useNavigate();

  async function handleGetUserCart() {
    setIsLoadings(true);
    const res = await getUserCart();
    setIsLoadings(false);
    console.log(res)
    setCart(res.data.numOfCartItems)
    setNumOfCartItems(res.data.numOfCartItems);
    setCartId(res.data.cartId);
    setCartDetails(res.data.data);
    setProducts(res.data.data.products);
  }
  async function handleRemoveProductFromCart(id) {

    const res = await removeProductFromCart(id);
    console.log(res);
    setNumOfCartItems(res.data.numOfCartItems);
    setCart(res.data.numOfCartItems)
    setCartId(res.data.cartId);
    setCartDetails(res.data.data);
    setProducts(res.data.data.products);
    toast.success("Product removed successfully from your cart", {
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
    console.log(res.data.data)
  }
  async function handleUpdateProductQuantity(id, count) {

    const res = await updateProductQuantity(id, count);
    console.log(res);
    setNumOfCartItems(res.data.numOfCartItems);
    setCartId(res.data.cartId);
    setCartDetails(res.data.data);
    setProducts(res.data.data.products);
  }
  async function handleClearCart() {
    const response = await clearCart()
    setCartDetails(null);
    setCartId(null);
    setNumOfCartItems(0);
    setCart(0)
    setProducts([]);
    toast.success("Your Cart is Cleared", {
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

  }
  let paymentSchema=Yup.object().shape({
    city:Yup.string().min(3,"minimum character is 3").required("City is required"),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/,"phone must be egyption number").required("Phone is required"),
    details:Yup.string().min(5,"minimum character is 5 ").required("Address is required")
  })
 const formik= useFormik({
  initialValues:{
    city:'',
    phone:'',
    details:''
  },
  onSubmit:()=> {handleCheckOut(cartId)},
  validationSchema:paymentSchema
})
 const cashFormik= useFormik({
  initialValues:{
    city:'',
    phone:'',
    details:''
  },
  onSubmit:()=> {handleCashPayment(cartId)},
  validationSchema:paymentSchema
})

  async function handleCheckOut(cartId) {
    const {data} = await checkOutSession(cartId,formik.values);
    if(data.status=="success"){
      console.log(data.session.url)
    location.href=(data.session.url)
    }
  }

  async function handleCashPayment(cartId) {
    const {data} = await cashPayment(cartId,cashFormik.values);
    setCart(0)
    
        navigate("/allorders");
   
  }


  useEffect(() => {
    handleGetUserCart();
    return () => {
    }
  }, []);


  return <>
    {
      isLoading ? <>
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center" >
          <FaSpinner className="loaderIcon text-white text-5xl" />
        </div>
      </> : <>
        <div className="py-24 text-center">
          <h2 className="capitalize text-green-400">Cart Page</h2>
          {
            numOfCartItems == 0 && <>
              <div className="my-7 text-center">
                <img className="block mx-auto" src={emptyCart} alt="Empty Cart" />
                <h3 className="capitalize text-black/80 mb-3">Your cart is empty</h3>
                <p className="text-gray-500 max-w-[90%] md:max-w-[50%] lg:max-w-[30%] mx-auto leading-6 mb-7">Looks like you have not added anything to your cart. Go ahead & explore our products</p>
                <Link to="/products" className="text-center border border-green-500 outline-none hover:bg-green-500 hover:text-white transition-all duration-500 px-12 py-3 rounded-md font-semibold text-md tracking-wide text-green-500">explore products</Link>
              </div>
            </>
          }
          {
            numOfCartItems != 0 && <>
              <div className="">
                <div className="my-10 flex justify-between p-4">
                  <h6>Total Price : <span className="text-green-500">{cartDetails?.totalCartPrice}</span></h6>
                 <div className="flex gap-4">
                 <button onClick={()=>{setOpenOnlineForm(true)}} className="capitalize  bg-green-500 border border-green-500 hover:bg-green-600 outline-none  px-12 py-3 rounded-md font-semibold text-md tracking-wide text-white">Pay Online</button>
                 <button onClick={()=>{setOpenCashForm(true)}}  className="text-center border border-green-500 outline-none hover:bg-green-500 hover:text-white transition-all duration-500 px-12 py-3 rounded-md font-semibold text-md tracking-wide text-green-500">Pay Cash</button>

                 </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                          Qty
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Total Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        products.map((p) => <CartProductDetails handleUpdateProductQuantity={handleUpdateProductQuantity} handleRemoveProductFromCart={handleRemoveProductFromCart} p={p} key={p.product._id} />)
                      }

                    </tbody>
                  </table>
                </div>

                <div className="mt-10 flex justify-between p-4">
                  <h6>Total Number Of Items : <span className="text-green-500">{numOfCartItems}</span></h6>
                  <button onClick={handleClearCart} className="flex gap-2 text-center border border-green-500 outline-none hover:bg-green-500 hover:text-white transition-all duration-500 px-12 py-3 rounded-md font-semibold text-md tracking-wide text-green-500">Clear Your Cart <FaTrash className="self-center " /></button>
                </div>


              </div>
            </>
          }
          {
            openOnlineForm&&<>
            <div onClick={()=>setOpenOnlineForm(false)} className="fixed inset-0 bg-black/40 flex justify-center items-center z-40">
             
            </div>
            <form onSubmit={formik.handleSubmit} className="bg-white rounded-lg p-4 min-h-96 flex flex-col gap-3 justify-center fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="mb-6 capitalize text-green-600">shipping address form</h2>
                <div className="flex flex-col gap-3">
                    <div className="relative z-0 w-full mb-6 group text-start">
                     <input  
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.city} 
                      type="text" 
                      name="city"
                      placeholder="" 
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
                      <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your City</label>
                    </div>
            
              
                    {
                        formik.errors.city && formik.touched.city && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {formik.errors.city}
                      </div>
                    }
                    <div className="relative z-0 w-full mb-6 group text-start">
                     <input  
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone} 
                      type="tel" 
                      name="phone"
                      placeholder="" 
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
                      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>
                    </div>
                   {
                        formik.errors.phone && formik.touched.phone && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {formik.errors.phone}
                      </div>
                    }
                  
                  <div className="relative z-0 w-full mb-6 group text-start">
                     <input  
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.details} 
                      type="text" 
                      name="details"
                      placeholder="" 
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
                      <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Adreess</label>
                    </div> {
                        formik.errors.details && formik.touched.details && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {formik.errors.details}
                      </div>
                    }                
                </div>
              <div className="flex justify-center items-center mt-4">
                <button type="submit" onSubmit={()=>handleCheckOut}  className="capitalize  bg-green-500 border border-green-500 hover:bg-green-600 outline-none  px-12 py-3 rounded-md font-semibold text-md tracking-wide text-white">Pay Online</button>
              </div>
              <button type="button" onClick={()=>{setOpenOnlineForm(false)}} className="capitalize mt-5  bg-transparent border border-green-500  outline-none  px-12 py-3 rounded-md font-semibold text-md tracking-wide text-green-500">Cancel</button>
               </form>
            </>
          }
          {
            openCashForm&&<>
            <div onClick={()=>setOpenCashForm(false)} className="fixed inset-0 bg-black/40 flex justify-center items-center z-40">
             
            </div>
            <form onSubmit={cashFormik.handleSubmit} className="bg-white rounded-lg p-4 min-h-96 flex flex-col gap-3 justify-center fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="mb-6 capitalize text-green-600">shipping address form</h2>
                <div className="flex flex-col gap-3">
                    <div className="relative z-0 w-full mb-6 group text-start">
                     <input  
                      onChange={cashFormik.handleChange}
                      onBlur={cashFormik.handleBlur}
                      value={cashFormik.values.city} 
                      type="text" 
                      name="city"
                      placeholder="" 
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
                      <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your City</label>
                    </div>
            
              
                    {
                        cashFormik.errors.city && cashFormik.touched.city && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {cashFormik.errors.city}
                      </div>
                    }
                    <div className="relative z-0 w-full mb-6 group text-start">
                     <input  
                      onChange={cashFormik.handleChange}
                      onBlur={cashFormik.handleBlur}
                      value={cashFormik.values.phone} 
                      type="tel" 
                      name="phone"
                      placeholder="" 
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
                      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>
                    </div>
                   {
                        cashFormik.errors.phone && cashFormik.touched.phone && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {cashFormik.errors.phone}
                      </div>
                    }
                  
                  <div className="relative z-0 w-full mb-6 group text-start">
                     <input  
                      onChange={cashFormik.handleChange}
                      onBlur={cashFormik.handleBlur}
                      value={cashFormik.values.details} 
                      type="text" 
                      name="details"
                      placeholder="" 
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
                      <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Adreess</label>
                    </div> {
                        cashFormik.errors.details && cashFormik.touched.details && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {cashFormik.errors.details}
                      </div>
                    }                
                </div>
              <div className="flex justify-center items-center mt-4">
                <button type="submit" onSubmit={()=>handleCashPayment}  className="capitalize  bg-green-500 border border-green-500 hover:bg-green-600 outline-none  px-12 py-3 rounded-md font-semibold text-md tracking-wide text-white">Pay Cash</button>
              </div>
              <button type="button" onClick={()=>{setOpenCashForm(false)}} className="capitalize mt-5  bg-transparent border border-green-500  outline-none  px-12 py-3 rounded-md font-semibold text-md tracking-wide text-green-500">Cancel</button>
               </form>
            </>
          }
        </div>
      </>
    }
  </>
}
