import React, { useContext ,useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.53f7a424c3aedc30a0fb46dc2278137c.svg'
import { TokenContext } from '../../Context/TokenContext'
import { CartContext } from '../../Context/CartContext'
import { toast } from 'react-toastify'


export default function NavBar() {
  
 const  {Token , setToken}= useContext(TokenContext)
 const  {numOfCartItems}= useContext(CartContext)
let [ Show , setShow]=useState("hidden")
  function LogOUt(){
    toast.success('You Loged Out' , {
      position : 'top-center'
    })
    localStorage.removeItem("Token")
    setToken(null)
}

    function menu(){
        if (Show == "hidden"){
            Show= "flex"
        }else{
            Show="hidden"
        }
        setShow(Show)
        
    }

  return (
    <nav className='py-2 capitalize bg-gray-100 w-full'>
            <div className="container flex flex-col lg:flex-row justify-between lg:items-center px-3">
                <div className='flex justify-between'>
                  <h1 className='font-bold text-xl'><Link to={''}><img src={logo}/></Link></h1>
                  <button onClick={menu} className='py-2 px-3 rounded-lg border border-gray-200 lg:hidden transition-all'>
                    <span><i className="fa-solid fa-bars"></i></span>
                  </button>
                </div>
                  {Token? 
                    <ul className={`${Show} lg:flex flex-col lg:flex-row lg:m-0 ps-0 font-extralight`}>
                    <li className='px-2 me-3 lg:m-0'><NavLink className={'inline-block p-2 mt-1 lg:m-0 rounded-lg'} to={''}>Home</NavLink></li>
                    <li className='px-2 me-3 lg:m-0'><NavLink className={'inline-block p-2 mt-1 lg:m-0 rounded-lg'} to={"/products"}>Products</NavLink></li>
                    <li className='px-2 me-3 lg:m-0'><NavLink className={'inline-block p-2 mt-1 lg:m-0 rounded-lg'} to={"categories"}>Categories</NavLink></li>
                    <li className='px-2 me-3 lg:m-0'><NavLink className={'inline-block p-2 mt-1 lg:m-0 rounded-lg'} to={"brands"}>Brands</NavLink></li>
                    <li className='px-2 me-3 lg:m-0'><NavLink className={'inline-block p-2 mt-1 lg:m-0 rounded-lg'} to={"allorders"}>Orders</NavLink></li>
                    <li className='px-2 me-3 lg:m-0'><NavLink className={'inline-block p-2 mt-1 lg:m-0 rounded-lg'} to={"washlist"}>Wish List</NavLink></li>
                    <li className='px-2 me-3 lg:m-0'><NavLink className={'inline-block p-2 mt-1 lg:m-0 rounded-lg relative'} to={"cart"}><i class="fa-solid fa-cart-shopping text-main text-xl"></i><span className='absolute -top-1 right-3 font-normal'>{numOfCartItems}</span></NavLink></li>
                    <li className='px-2 me-3 lg:m-0'><span onClick={LogOUt} className={'inline-block p-2 mt-1 lg:m-0 rounded-lg cursor-pointer'}>Logout</span></li>
                    </ul>
                    :
                    <ul className={`${Show} lg:flex flex-col lg:flex-row ms-auto lg:m-0 ps-0`}>
                    <li className='px-2 me-3 lg:m-0'><NavLink className={'inline-block p-2 mt-1 lg:m-0 rounded-lg'} to={"login"}>login</NavLink></li>
                    <li className='px-2 me-3 lg:m-0'><NavLink className={'inline-block p-2 mt-1 lg:m-0 rounded-lg'} to={"register"}>Register</NavLink></li>
                    </ul>
                    }
            </div>
        </nav>
  )
}
