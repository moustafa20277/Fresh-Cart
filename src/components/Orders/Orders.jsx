import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../../Context/TokenContext'
import axios from 'axios'
import Lodear from '../Lodear/Lodear'
import { Helmet } from 'react-helmet-async';



export default function Orders() {
  const { id } = useContext(TokenContext)
  const [orders, setOrders] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  console.log(orders);

  async function getOrders() {
    setLoading(true)
    try {
      const { data } = await axios(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      setOrders(data)

    } catch (error) {
      setError('There is a problem with the server.')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getOrders()
  }, [])


  return (
    <>
      {error? <div class="p-8 my-32 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
        <p className='text-center text-2xl'>{error}</p>
      </div>
    :
    <>
    {loading ? <div className='my-24 relative'>
        <Lodear />
      </div> : orders && orders.length > 0 ?
        <div className='mt-12 mb-28'>
          <h2 className='text-2xl font-medium text-center mb-10'>My Orders</h2>
          <div className=" overflow-x-auto shadow-md sm:rounded-lg">
            {orders?.map((product, index) =>
              <>
              <Helmet>
              <title>Orders | Fresh-Cart</title>
              <meta name="keywords" content={product?.cartItems[0]?.product.brand.slug} />
            </Helmet>
              <div key={index} className="bg-gray-50 border-b border-gray-400 ">
                <div className='flex items-center justify-between p-2'>
                  <div className='flex flex-col md:flex-row'>
                    <span className='inline-block  md:p-4 text-xl'>#{product.id}</span>
                    <span className='inline-block text-blue-700 font-semibold md:p-4 text-2xl'>{product.isDelivered ? 'Delivered' : 'Processing'}</span>
                  </div>
                  <span className='inline-block px-4 font-extralight'> {product.createdAt.split('T')[0]}</span>
                </div>
                <div className='w-full flex flex-col'>
                  <figure className="w-full flex flex-row flex-wrap p-2">
                    {product.cartItems.map((item) =>
                      <img src={item.product.imageCover} className="w-1/2 md:w-32 border" alt={item.product.title} />)}
                  </figure>
                  <figcaption className=' w-full md:w-10/12 flex flex-col md:flex-row md:justify-between px-6 py-4'>
                    <div className='w-full '>
                      <p className="font-light text-gray-900 ">
                        <span className='text-lg font-bold text-main'>Total Price : </span>
                        {product.totalOrderPrice} EGP
                      </p>
                    </div>
                  </figcaption>

                </div>
              </div>
              </>
            )}
          </div>
        </div>
        : <div class="p-8 my-32 text-sm text-green-800 rounded-lg bg-green-50 " role="alert">
          <p className='text-center text-2xl capitalize'>you didn't order anything yet</p>
        </div>}
    </>}
    </>
  )
}
