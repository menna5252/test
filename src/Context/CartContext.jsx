import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext();
export default function CartContextProvider({ children }) {
    const BASE_URL = window.location.origin;
    const { token } = useContext(UserContext);
    let [cart, setCart] = useState(0);
    function addProductToCart(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            "productId": id,
        }, {
            headers: {
                token
            }
        })
            .then((r) => { return r })
            .catch((e) => { return e })
    }
    function getUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: {
                token
            }
        })
            .then((r) => { return r })
            .catch((e) => { return e })
    }
    function removeProductFromCart(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers: {
                token
            }
        })
            .then((r) => { return r })
            .catch((e) => { return e })
    }
    function updateProductQuantity(id, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            count: count
        }, {
            headers: {
                token
            }
        })
            .then((r) => { return r })
            .catch((e) => { return e })
    }

    function clearCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: {
                token
            }
        })
            .then((r) => { return r })
            .catch((e) => { return e })
    }

    async function checkOutSession(cartId, shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${BASE_URL}`, {
            "shippingAddress": shippingAddress

        }, {
            headers: {
                token
            }
        })
            .then((r) => { return r })
            .catch((e) => { return e })
    }
    async function cashPayment(cartId, shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
            "shippingAddress": shippingAddress

        }, {
            headers: {
                token
            }
        })
            .then((r) => { return r })
            .catch((e) => { return e })
    }


    async function getCart() {
        let response = await getUserCart();
        console.log(response.data.numOfCartItems);
        setCart(response?.data?.numOfCartItems);
    }

    useEffect(() => {
        getCart();
    }, []);

    return <CartContext.Provider value={{ cart, setCart, addProductToCart, getUserCart, removeProductFromCart, updateProductQuantity, clearCart, checkOutSession ,cashPayment}}>
        {children}
    </CartContext.Provider>
}