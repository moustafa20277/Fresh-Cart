import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick'
import Lodear from '../Lodear/Lodear'
import { CartContext } from '../../Context/CartContext'
import { toast } from 'react-toastify'
import RelatedProducts from '../RelatedProducts/RelatedProducts'
import { Helmet } from 'react-helmet-async';





export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(null)
  const { addProductToCard } = useContext(CartContext)
  const [isError, setIsError] = useState(null)


  async function getDetails(id) {
    setLoading(true)
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      setProduct(data.data)
    } catch (error) {
      setIsError('There is a problem with the server.')
    } finally {
      setLoading(null)
    }
  }

  useEffect(() => {

    getDetails(id)

  }, [id])



  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true

  };

  async function addItemToCard(id) {
    const data = await addProductToCard(id)
    if (data.status == "success") {
      toast.success(data.message, {
        position: 'bottom-right'
      })
    } else {
      toast.error(data.message, {
        position: 'bottom-right'
      })
    }
  }  

  return (
    <>
      <Helmet>
        <title>{product?.title}</title>
        <meta name="description" content={product?.description} />
        <meta name="keywords" content={product?.slug?.replaceAll('-' , ' ')} />
      </Helmet>

      {isError? <div class="p-8 my-32 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
        <p className='text-center text-2xl'>{isError}</p>
      </div> :
      <>
      {loading ? <div className='py-32 relative'>
        <Lodear /></div> : <>
        <div className='flex flex-col md:flex-row py-12 items-center'>
          <figure className='w-full md:w-1/3 px-3 mb-3 md:mb-0'>
            <Slider {...settings}>
              {product?.images?.map((data, index) => <img key={index} src={data} alt={product?.title} className='w-full' />)}
            </Slider>
          </figure>
          <figcaption className='w-full md:w-2/3 px-3'>
            <h2 className='text-3x my-2 capitalize'>{product?.title}</h2>
            <h5 className='text-main my-2'>{product?.category?.name}</h5>
            <p className='mt-2 mb-4 capitalize font-light'>{product?.description}</p>
            <div className='mt-2 mb-4 flex justify-between items-center'>
              <span>{product?.price} EGP</span>
              <span><i className="fa-solid fa-star text-yellow-500"></i> {product?.ratingsAverage}</span>
            </div>
            <button onClick={() => addItemToCard(product.id)} className='mt-2 border bg-main text-white px-3 py-1.5 w-full rounded-md'>Add To Cart</button>
          </figcaption>
        </div>
        <RelatedProducts />
      </>
      }
      </>
      }
    </>

  )
}
