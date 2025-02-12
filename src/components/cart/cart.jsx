import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../Context/CartContext'
import { TokenContext } from '../../Context/TokenContext'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';






export default function Cart() {
  const { getCard, updateQuantity, deleteItem, clearCart, cartDetails } = useContext(CartContext)
  const { Token } = useContext(TokenContext)



  useEffect(() => {
    Token && getCard()
  }, [Token])


  return (
    <>
      <Helmet>
        <title>Cart | Fresh-Cart</title>
      </Helmet>
      {cartDetails && cartDetails.numOfCartItems > 0 ? <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-28">
        <button onClick={clearCart} className='btn bg-red-600 ms-auto mb-5 me-5 text-white text-xl'><i class="fa-regular fa-trash-can"></i></button>
        {cartDetails.data.products?.map((product) =>
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between bg-white border-b border-gray-200 hover:bg-gray-50 ">
            <figure className="w-full md:w-2/12 p-2">
              <img src={product.product.imageCover} className="w-full md:w-32 max-w-full max-h-full" alt={product.product.title} />
            </figure>
            <figcaption className=' w-full md:w-10/12 flex flex-col md:flex-row md:justify-between px-6'>
              <div className='w-full md:w-8/12 flex flex-col md:flex-row md:items-center md:justify-between'>
                <p className="font-semibold text-4xl md:text-2xl text-gray-900 truncate w-8/12">
                  {product.product.title}
                </p>
                <p className="px-8 py-2 md:px-2 font-light text-gray-900 w-3/12">
                  {product.price * product.count} EGP
                </p>
              </div>
              <div className=" w-full md:w-4/12 flex justify-between items-center py-2">
                <div className="py-2">
                  <div className="flex items-center">
                    <button onClick={() => updateQuantity(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                      </svg>
                    </button>
                    <div>
                      <input type="text" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1  " placeholder={product.count} required />
                    </div>
                    <button onClick={() => updateQuantity(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <button onClick={() => deleteItem(product.product.id)} className="font-medium text-red-600 hover:underline">Remove</button>
              </div>
            </figcaption>
          </div>
        )}
        <div className='flex justify-between my-12 px-5'>
          <p className='font-light'>Total cart Price: <span>{cartDetails?.data?.totalCartPrice}</span> EGP</p>
          <Link className='btn bg-main text-white' to={`/payment/${cartDetails.cartId}`}>Check Out</Link>
        </div>
      </div> : <div class="p-8 my-32 text-sm text-green-800 rounded-lg bg-green-50 " role="alert">
        <p className='text-center text-2xl'>No Products In Your cart yet</p>
      </div>}
    </>
  )
}
