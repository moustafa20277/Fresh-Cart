import React from 'react'
import image1 from '../../assets/images/error.svg'
import { Helmet } from 'react-helmet-async';




export default function NotFound() {


  return (
    <>
      <Helmet>
        <title>NotFound</title>
      </Helmet>
      <div className="container px-3 py-12">
        <img className='mx-auto' src={image1} alt="error" />
      </div>
    </>
  )
}
