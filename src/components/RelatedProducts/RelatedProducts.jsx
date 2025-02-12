import React, { useEffect, useState } from 'react'
import style from './RelatedProducts.module.css'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Lodear from '../Lodear/Lodear';

export default function RelatedProducts() {

  const { category } = useParams()
  const [relatedProduct, setRelatedProduct] = useState([])
  const [loading, setLoading] = useState(null)
  const [isError, setIsError] = useState(null)


  async function getRelated() {
    setLoading(true)
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      const RelatedProduct = data.data.filter((item) => item?.category?.name == category)
      setRelatedProduct(RelatedProduct)
    } catch (error) {
      setIsError('There is a problem with the server.')
    } finally {
      setLoading(null)
    }
  }

  useEffect(() => {

    getRelated()

  }, [])

  return (
    <>
    {isError? <div class="p-8 my-32 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
      <p className='text-center text-2xl'>{isError}</p>
    </div> :
    
    <div className='container my-8 px-3'>
      {loading ? <div className='py-32 relative'>
        <Lodear /></div> :
        <>
          <h3 className='text-center text-3xl mb-4 text-main'>Related Product</h3>
          <div className="flex flex-wrap">
            {relatedProduct?.map((data) => <div key={data.id} className='w-full sm:w-4/12 md:w-3/12 lg:w-2/12 px-3 cursor-pointer mb-3'>
              <Link to={`/productdetails/${data.id}/${data.category.name}`}>
                <img className='w-full' src={data.imageCover} alt={data.title} />
                <h4 className='mt-2 text-main truncate'>{data.title}</h4>
                <div className="flex items-center justify-between mt-2.5 mb-5">
                  <p>{data.price}<span> EGP</span></p>
                  <div className='flex items-center'>
                    <i className="fa-solid fa-star text-yellow-500"></i>
                    <span className=" text-md  px-1 py-0.5 rounded-sm">{data.ratingsAverage}</span>
                  </div>
                </div>
              </Link>
            </div>)}
          </div>
        </>}
    </div>
    }
  </>
  )
}
