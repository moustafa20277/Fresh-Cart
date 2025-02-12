import React, { useContext, useEffect, useState } from 'react'
import { WishContext } from '../../Context/WishContext'
import { TokenContext } from '../../Context/TokenContext'
import Lodear from '../Lodear/Lodear'
import { CartContext } from '../../Context/CartContext'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async';

export default function WishList() {
  const { list, getWishList, removeItemFromWishList } = useContext(WishContext)
  const { Token } = useContext(TokenContext)
  const [loading, setLoading] = useState(null)
  const { addProductToCard } = useContext(CartContext)

  async function addItemToCard(id) {
    const data = await addProductToCard(id)
    if (data.status == "success") {
      toast.success(data.message, {
        position: 'bottom-right'
      })
    } else {
      toast.error(error.message, {
        position: 'bottom-right'
      })
    }
  }
  async function removeItem(id) {
    const data = await removeItemFromWishList(id)
    if (data.status == "success") {
      toast.success(data.message, {
        position: 'bottom-right'
      })
    } else {
      toast.error(error.message, {
        position: 'bottom-right'
      })
    }
  }

  useEffect(() => {
    Token && getWishList()
  }, [Token])

  return (
    <>
      <Helmet>
        <title>WishList | Fresh-Cart</title>
      </Helmet>
      {loading ? <div className='my-24 relative'>
        <Lodear />
      </div> : list && list.length > 0 ?
        <div className='mt-12 mb-28'>
          <h2 className='text-2xl font-medium text-center mb-10'>My list</h2>
          <div className=" overflow-x-auto shadow-md sm:rounded-lg">
            {list?.map((product) =>
              <div key={product.id} className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 border-b border-gray-400 py-5">
                <div className='w-full flex flex-col md:flex-row items-center'>
                  <figure className="w-full md:w-fit p-2">
                    <img src={product.imageCover} className="w-full md:w-40 border" alt={product.title} />
                  </figure>
                  <figcaption className=' w-full px-2 py-4'>
                    <div className='w-full '>
                      <h3 className='text-2xl font-semibold mb-2 '>{product.title}</h3>
                      <h4 className='text-main mb-2 '>{product?.category?.name}</h4>
                      <p className="font-light text-gray-900 ">
                        {product.price} EGP
                      </p>
                      <div className='flex items-center'>
                        <i className="fa-solid fa-star text-yellow-400"></i>
                        <span className="px-1 py-0.5">{product.ratingsAverage}</span>
                      </div>
                    </div>
                  </figcaption>

                </div>
                <div className="md:w-2/6 pb-4 flex md:justify-end px-4">
                  <button onClick={() => removeItem(product.id)} className='mt-2 border bg-red-500 text-white px-3 py-1.5 rounded-md me-5'><i class="fa-regular fa-trash-can"></i></button>
                  <button onClick={() => addItemToCard(product.id)} className='mt-2 border bg-main text-white px-3 py-1.5 rounded-md'>Add To Cart</button>
                </div>
              </div>
            )}
          </div>
        </div>
        : <div class="p-8 my-32 text-sm text-green-800 rounded-lg bg-green-50 " role="alert">
          <p className='text-center text-2xl capitalize'>you didn't favourite anything yet</p>
        </div>}
    </>

  )
}
