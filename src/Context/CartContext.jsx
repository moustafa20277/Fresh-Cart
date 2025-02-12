import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { TokenContext } from "./TokenContext";
import axios from "axios";
import { toast } from "react-toastify";


export const CartContext = createContext(null)


export default function CartContextprovider({ children }) {
    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const { Token } = useContext(TokenContext)
    const [cartDetails, setCartDetails] = useState(null)
    const [isonline, setIsonline] = useState(false)



    const API = 'https://ecommerce.routemisr.com/api/v1/cart'
    const headers = {
        token: Token
    }

    async function addProductToCard(productId) {

        try {
            const { data } = await axios.post(API, { productId, }, { headers, })
            setNumOfCartItems(data.numOfCartItems)
            setCartDetails(data)
            return data

        } catch (error) {
            setNumOfCartItems(0)
            setCartDetails(null)
            return error
        }
    }
    async function getCard() {

        try {
            const { data } = await axios(API, { headers, })
            setNumOfCartItems(data.numOfCartItems)
            setCartDetails(data)
            return data

        } catch (error) {
            setNumOfCartItems(0)
            setCartDetails(null)
            return error
        }
    }
    useEffect(() => {
        Token && getCard()
    }, [Token])
    async function updateQuantity(productId, count) {
        try {
            if (count > 0) {
                const { data } = await axios.put(API + '/' + productId, { count, }, { headers, })
                getCard()
                console.log(data);
                return data
            } else {
                deleteItem(productId)
            }
        } catch (error) {
            setNumOfCartItems(0)
            setCartDetails(null)
            return error
        }
    }
    async function deleteItem(productId) {

        try {
            const { data } = await axios.delete(API + '/' + productId, { headers, })
            setNumOfCartItems(data.numOfCartItems)
            setCartDetails(data)
            getCard()
            toast.success("item deleted successfully", {
                position: 'top-right',
                theme : 'dark'
            })
            return data
        } catch (error) {
            setNumOfCartItems(0)
            setCartDetails(null)
            toast.error("Deleting failed", {
                position: 'top-right',
                theme : 'dark'
            })
            return error
        }
    }
    async function clearCart() {

        try {
            const { data } = await axios.delete(API, { headers, })
            getCard()
            setNumOfCartItems(0)
            setCartDetails(null)
            toast.success("Cart deleted successfully", {
                position: 'top-right',
                theme : 'dark'
            })
            return data
        } catch (error) {
            setNumOfCartItems(0)
            setCartDetails(null)
            toast.error("Deleting failed", {
                position: 'top-right',
                theme : 'dark'
            })
            return error
        }
    }

    async function handlePayment(shippingAddress, cartId) {
        const URL = isonline ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173` : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;
        try {
            const { data } = await axios.post(URL, { shippingAddress, }, { headers, })
            if (data.status == "success") {
                setNumOfCartItems(0)
                setCartDetails(null)                
                toast.success("payment complete successfully", {
                    position: 'top-right',
                    theme : 'dark'
                })
            }else{
                toast.error("Payment failed", {
                    position: 'top-right',
                    theme : 'dark'
                })
            }
            return data
        } catch (error) {
            setNumOfCartItems(0)
            setCartDetails(null)
            return error
        }
    }



    return (
        <CartContext.Provider value={{ numOfCartItems, addProductToCard, cartDetails, getCard, updateQuantity, deleteItem, clearCart, handlePayment, setIsonline, isonline }}>
            {children}
        </CartContext.Provider>
    )
}
