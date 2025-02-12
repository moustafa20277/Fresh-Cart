import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Lodear from '../Lodear/Lodear';
import { CartContext } from '../../Context/CartContext'
import { Helmet } from 'react-helmet-async';



export default function Payment() {
  const navigate = useNavigate()
  const { cartId } = useParams()
  const [Spinner, setSpinner] = useState('hidden')
  const { handlePayment, setIsonline, isonline } = useContext(CartContext)


  const validationSchema = Yup.object().shape({
    name: Yup.string().min(5, "at least 5 characters").max(20, "maximum 20 characters").required(),
    phone: Yup.string().matches(/^(\+2)?01[0-25]\d{8,}$/, "invailid Phone Number").required(),
    city: Yup.string().min(5, "at least 5 characters").max(20, "maximum 20 characters").required(),
  })


  async function onSubmit(value) {
    setSpinner('flex')
    const data = await handlePayment(value, cartId, isonline)
    if (data.status == "success") {
      setSpinner('hidden')
      if (isonline) {
        location.href = data.session.url
      } else {
        navigate('/allorders')
      }

  }
}
  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      city: '',
    },
    validationSchema,
    onSubmit,
  })


  return (
    <>
      <Helmet>
        <title>Payment | Fresh-Cart</title>
      </Helmet>
      <div className="container">
        <div className={`w-full  absolute inset-0 ${Spinner} justify-center items-center bg-gray-100 bg-opacity-50`}>
          <Lodear />
        </div>
        <div className='w-5/12 mx-auto py-12'>
          <h2 className='mb-4 text-2xl capitalize text-main'>check out</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col mb-3">
              <label className='font-light' htmlFor="userName">Name:</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className="border rounded-md focus-visible:outline-sky-400 p-1" value={formik.values.name} name='name' id="userName" />
            </div>
            {formik.errors.name && formik.touched.name ? <div className="bg-red-300 p-3 border border-red-500 rounded-md" role="alert">
              {formik.errors.name}
            </div> : null}
            <div className="flex flex-col mb-3">
              <label className='font-light' htmlFor="Phone">Number:</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" className="border rounded-md focus-visible:outline-sky-400 p-1" value={formik.values.phone} name='phone' id="Phone" />
            </div>
            {formik.errors.phone && formik.touched.phone ? <div className="bg-red-300 p-3 border border-red-500 rounded-md" role="alert">
              {formik.errors.phone}
            </div> : null}
            <div className="flex flex-col mb-3">
              <label className='font-light' htmlFor="City">city :</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className="border rounded-md focus-visible:outline-sky-400 p-1" value={formik.values.email} name='city' id="city" />
            </div>
            {formik.errors.city && formik.touched.city ? <div className="bg-red-300 p-3 border border-red-500 rounded-md" role="alert">
              {formik.errors.city}
            </div> : null}
            <div className="flex items-center mb-4">
              <input onChange={() => setIsonline(!isonline)} id="default-checkbox" type="checkbox" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-green-500 " />
              <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 ">Pay By Card ? </label>
            </div>
            <button type='submit' className='btn mt-2 border ms-auto bg-main text-white inline-block' disabled={!(formik.isValid && formik.dirty)} >Pay Now</button>
          </form>
        </div>
      </div>
    </>

  )
}
