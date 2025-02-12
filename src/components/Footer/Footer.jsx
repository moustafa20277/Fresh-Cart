import React from 'react'


export default function Footer() {
  

  return (
    <footer className='py-12 bg-gray-100'>
      <div className="container px-4">
        <h4 className='capitalize text-2xl mb-2'>get the fresh cart app</h4>
        <p className='font-light mb-4'>We will send you a link, ioen it on your phone to download the app.</p>
        <div className='flex flex-col md:flex-row items-center'>
          <input className='w-2/3 py-2 px-3 focus:outline-sky-500 focus:drop-shadow-md  ' type="email" placeholder='Email...' />
          <button className='w-1/3 bg-main border rounded-md px-3 py-2 capitalize text-white ms-4' >share app link</button>
        </div>
      </div>
    </footer>
  )
}
