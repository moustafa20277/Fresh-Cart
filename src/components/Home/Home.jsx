import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from "react-slick";
import MiniSlider from '../MiniSlider/MiniSlider';
import RecentProducts from '../RecentProducts/RecentProducts';
import { Helmet } from 'react-helmet-async';





export default function Home() {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)

  async function getGategories() {

    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      setCategories(data.data)
    } catch (error) {
      setError('There is a problem with the server.')
    }
  }
  var settings = {
    dots: false,
    autoplay: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 2500,
  };
  useEffect(() => {
    getGategories()
  }, [])

  return (
    <>
    <Helmet>
      <title>Home | Fresh-Cart</title>
    </Helmet>
    <MiniSlider />
      {error? <div class="p-8 my-32 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
        <p className='text-center text-2xl'>{error}</p>
      </div>:
      
      <div className='py-4 px-3 hidden md:block'>
        <h2 className='mb-4 text-2xl'>Show Popular Categories</h2>
        <Slider {...settings}>
          {categories.map((data) =>
            <div key={data._id}>
              <img src={data.image} alt=" catogries" className='h-[265px] w-full px-1' />
              <h5 className='text-xl font-light'>{data.name}</h5>
            </div>
          )}
        </Slider>
      </div>}
      <RecentProducts />
    </>
  )
}
