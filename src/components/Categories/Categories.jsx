import React, { useState } from "react";
import useFetch from "../../hooks/useFetch"
import Lodear from '../Lodear/Lodear'
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';




export default function Categories() {
  const [subcategories, setSubcategories] = useState([])
  const [show, setShow] = useState("hidden")
  const [category, setCategory] = useState(null)
  const [relatedProduct, setRelatedProduct] = useState([])
  const [isloading, setIsloading] = useState(false)
  const [isError, setIsError] = useState(null)
  const { error, loading, list } = useFetch(`https://ecommerce.routemisr.com/api/v1/categories`)




  async function relatedCategory(id) {
    setIsloading(true)
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
      setSubcategories(data.data)
      setShow('block')
    } catch (error) {
      setIsError('There is a problem with the server.')
      setSubcategories(null)
      setShow("hidden")
    } finally {
      setIsloading(false)
    }

  }

  async function getRelated(categoryName) {
    setIsloading(true)
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      const RelatedProducts = data.data.filter((item) => item?.category?.name == categoryName)
      setRelatedProduct(RelatedProducts)
    } catch (error) {
      setIsError('There is a problem with the server.')
    } finally {
      setIsloading(null)
    }
  }

  var settings = {
    dots: false,
    autoplay: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };




  return (
    <div className='mt-6'>
      {error? <div class="p-8 my-32 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
        <p className='text-center text-2xl'>{error}</p>
      </div> :
      <>
      {loading ? <div className='my-48 relative'>
        <Lodear />
      </div> : <div className='flex flex-wrap'>
        {list?.data?.map((data) =>
          <>
            <Helmet>
              <title>Categories | Fresh-Cart</title>
              <meta name="keywords" content={data.slug} />
            </Helmet>
            <div onClick={(() => { return relatedCategory(data._id), setCategory(data.name), getRelated(data.name) })} className="w-full sm:w-6/12 md:w-4/12 px-1 mb-4 cursor-pointer" key={data._id}>
              <div className=" group border hover:shadow-md hover:shadow-green-500 rounded-t-lg hover:duration-transitionDuration">
                <div className="cursor-pointer">
                  <figure>
                    <img className="rounded-t-lg h-80 w-full" src={data.image} alt={data.name} />
                  </figure>
                  <figcaption className="px-2 pt-4">
                    <h5 className=" text-main mb-2 text-center text-xl">{data.name}</h5>
                  </figcaption>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      }
      {isloading ? <div className='fixed top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-gray-500 opacity-60'>
        <Lodear />
      </div> :
        <>
        {isError? <div class="p-8 my-32 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
        <p className='text-center text-2xl'>{isError}</p>
      </div>
        :
        <div className={`${show} my-8`}>
        <div className="my-8">
          <h2 className="text-center my-6 text-main text-2xl font-semibold">{category} subcategories</h2>
          <div className="flex flex-wrap">
            {subcategories?.map((data) =>
              <div className="w-full sm:w-6/12 md:w-4/12 px-1 mb-4" key={data._id}>
                <div className=" group border hover:shadow-sm hover:shadow-green-500 hover:duration-transitionDuration">
                  <div className="px-2 pt-4">
                    <h5 className=" mb-2 text-center text-xl font-bold">{data.name}</h5>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
        <div className="slider-container">
          <Slider {...settings}>
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
          </Slider>
        </div>
      </div>
      }
        </>
  }
      </>}
    </div>
  )
}


