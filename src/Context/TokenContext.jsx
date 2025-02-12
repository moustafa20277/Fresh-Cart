import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const TokenContext = createContext(null)

export default function TokenContextprovider({children}) {

    const [Token, setToken] = useState(null)
    if(localStorage.getItem('Token')){
        const token = localStorage.getItem('Token')
        var {id} = jwtDecode(token)        
    }    
    
    useEffect(() => {
    if(localStorage.getItem("Token")){
        setToken(localStorage.getItem("Token"))    }
    }, [])

    return (
        <TokenContext.Provider value={{ Token , setToken , id }}>
            {children}
        </TokenContext.Provider>
    )
}


