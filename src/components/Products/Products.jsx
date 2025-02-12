import React, { lazy, Suspense, useEffect, useState } from 'react'
import style from './products.module.css'
import { Helmet } from 'react-helmet-async';


const RecentProducts = lazy(() => import('../RecentProducts/RecentProducts'))
const Lodear = lazy(() => import('../Lodear/Lodear'))


export default function Products() {

  return (
    <>
      <Helmet>
        <title>Products | Fresh-Cart</title>
      </Helmet>

      <div className='my-24 relative'>
        <Suspense fallback={<Suspense><Lodear /></Suspense>}><RecentProducts /></Suspense>
      </div>
    </>
  )
}
