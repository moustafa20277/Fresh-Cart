import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Lodear from '../Lodear/Lodear'
import { CartContext } from '../../Context/CartContext'
import { toast } from 'react-toastify';
import { WishContext } from '../../Context/WishContext'


export default function RecentProducts({ value }) {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(null)
  const [active, setActive] = useState(null)
  const { addProductToCard } = useContext(CartContext)
  const { addProductToWishList } = useContext(WishContext)
  const [isError, setIsError] = useState(null)



  async function getProducts() {
    setLoading(true)
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`)
      setProducts(data)
    } catch (error) {
      setIsError('There is a problem with the server.')
    } finally {
      setLoading(null)
    }
  }
  useEffect(() => {
    getProducts()
  }, [page])

  function changePage(e) {
    setPage(e.target.value);
  }
  function Page(currentpage) {
    if (currentpage < products.metadata.numberOfPages) {
      setPage(currentpage);
    } else {
      setPage(products.metadata.currentpage);
    }
  }



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
  async function addItemToWishList(id) {
    setActive('focus:text-red-600')
    const data = await addProductToWishList(id)
    if (data.status == "success") {
      toast.success(data.message, {
        position: 'bottom-right'
      })
    } else {
      toast.error('Please Login First', {
        position: 'bottom-right'
      })
    }
  }


  return (
    <>
    {isError? <div class="p-8 my-32 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
        <p className='text-center text-2xl'>{isError}</p>
      </div> :
      <div className='mt-6'>
        <h2 className='mb-6 text-2xl '>Products</h2>
        {loading ? <div className='my-12 relative'>
          <Lodear />
        </div> : <div className='flex flex-wrap'>
          {products?.data?.map((data) =>
            <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 px-1 mb-4 cursor-pointer" key={data.id}>
              <div className=" group  hover:border hover:border-main hover:shadow-lg transition-all rounded-lg overflow-hidden">
                <Link to={`/productdetails/${data.id}/${data.category.name}`} >
                  <figure><img className="p-4 rounded-t-lg" src={data.imageCover} alt={data.title} /></figure>
                  <div className="px-2 pt-4">
                    <h5 className=" text-main mb-2">{data.category.name}</h5>
                    <h4 className="text-xl truncate">{data.title}</h4>
                    <div className="flex items-center justify-between mt-2.5 mb-5 font-light">
                      <p className="text-xl">{data.price}<span> EGP</span></p>
                      <div className='flex items-center'>
                        <i className="fa-solid fa-star text-yellow-500"></i>
                        <span className=" text-lg  px-1 py-0.5 rounded-sm">{data.ratingsAverage}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="w-5/6 mx-auto pb-4">
                  <button onClick={() => addItemToWishList(data.id)} className={`me-2 text-xl overflow-hidden ${active}`}><i class="fa-regular fa-heart"></i></button>
                  <button onClick={() => addItemToCard(data.id)} className="w-full text-white bg-main text-lg rounded-lg px-5 py-2.5 text-center translate-y-20 opacity-0 group-hover:translate-y-0 duration-transitionDuration group-hover:opacity-100">+Add to cart</button>
                </div>
              </div>
            </div>
          )}
        </div>}

        <ul className='flex justify-center space-x-6 text-white my-4'>
          <li onClick={() => Page(products.metadata.currentPage - 1)} className='bg-main p-2 rounded-3xl cursor-pointer'><i class="fa-solid fa-chevron-left"></i></li>
          <li onClick={changePage} value='1' className='bg-main p-2 rounded-3xl cursor-pointer'>1</li>
          <li onClick={changePage} value='2' className='bg-main p-2 rounded-3xl cursor-pointer'>2</li>
          <li onClick={() => Page(products.metadata.currentPage + 1)} className='bg-main p-2 rounded-3xl cursor-pointer'><i class="fa-solid fa-chevron-right"></i></li>
        </ul>
      </div>
      }
    </>

  )
}
