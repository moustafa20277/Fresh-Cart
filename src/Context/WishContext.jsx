import React, { useContext, useState } from 'react'
import { createContext } from "react";
import { TokenContext } from './TokenContext';
import axios from 'axios';


export const WishContext = createContext(null)

export default function WishContextprovider({ children }) {
    const [list, setList] = useState(null)
    const { Token } = useContext(TokenContext)

    const API = 'https://ecommerce.routemisr.com/api/v1/wishlist'
    const headers = {
        token: Token
    }

    async function addProductToWishList(productId) {
        try {
            const { data } = await axios.post(API, { productId, }, { headers, })
            setList(data.data)
            return data
        } catch (error) {
            return error
        }

    }
    async function getWishList() {
        try {
            const { data } = await axios.get(API, { headers, })
                setList(data.data)
                return data
            } catch (error) {
                setList(null)
                return error
            }

        }
    async function removeItemFromWishList(productId) {
            try {
                const { data } = await axios.delete(API + '/' + productId, { headers, })
                getWishList()
                return data
            } catch (error) {
                setList(null)
                return error
            }

        }
        return (
            <WishContext.Provider value={{ addProductToWishList, list, getWishList, removeItemFromWishList }}>
                {children}
            </WishContext.Provider>
        )
    }
