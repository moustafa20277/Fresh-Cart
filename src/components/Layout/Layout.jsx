import React, { lazy, Suspense ,useRef } from 'react'
import { Outlet } from 'react-router-dom'


const NavBar = lazy(()=> import ('../NavBar/NavBar'))
const Footer = lazy(()=> import ('../Footer/Footer'))


export default function layout() {
  const toTop = useRef()
  

  return (
    <> 
    <Suspense><NavBar/></Suspense>
    <div ref={toTop} className='container px-4'>
    <button onClick={()=>toTop.current.scrollIntoView({ behavior : 'smooth' , top : '0' })} className={`btn bg-main fixed bottom-5 end-5 focus:shadow-md focus:shadow-green-300 z-10`}><i class="fa-solid fa-arrow-up text-white"></i></button>
    <Outlet/>
    </div>
    <Suspense><Footer/></Suspense>
    </>
  )
}
