import React from 'react'
import Slider from "react-slick";
import img1 from '../../assets/images/slider-image-1.3c3940ee0f1c3b17ff9a.jpeg'
import img2 from '../../assets/images/slider-image-2.7e5c9f7a513f6db6dd5e.jpeg'
import img3 from '../../assets/images/image 2.jpeg'

export default function MiniSlider() {

  var settings = {
    dots: true,
    arrows:false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const sliderImag = [img1, img2]
  const sideImage = [img1, img3]


  return (
    <div className='container py-6 hidden md:flex'>
      <div className='md:w-2/3 px-3 pb-6 md:pb-0'>
      <Slider {...settings}>
        {sliderImag.map((img,index) => <img key={index} src={img} alt='slider image' className='h-[408px] w-full'/>)}
      </Slider>
      </div>
      <div className='md:w-1/3 space-y-2 px-3'>
        {sideImage.map((image,index) => <img key={index} src={image} alt='products image' className='h-[200px] w-full'/>)}
      </div>
    </div>
  )
}
