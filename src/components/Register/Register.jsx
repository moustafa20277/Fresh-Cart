import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import axios from 'axios';
import Lodear from '../Lodear/Lodear';
import { Helmet } from 'react-helmet-async';



export default function Register() {

  const Navigate = useNavigate()
  const [Spinner, setSpinner] = useState('hidden')
  const [Error, setError] = useState(null)


  const validationSchema = Yup.object().shape({
    name: Yup.string().min(5, "at least 5 characters").max(20, "maximum 20 characters").required(),
    email: Yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "invalid Email").required(),
    password: Yup.string().matches(/^[a-zA-Z1-9]{8,}$/, "weak passowrd").required(),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "not matching").required(),
    phone: Yup.string().matches(/^(\+2)?01[0-25]\d{8,}$/, "invailid Phone Number").required()
  })


  async function onSubmit(value) {
    try {
      setSpinner('flex')
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', value)
      if (data.message == "success") {
        Navigate('/signin')
      }

    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setSpinner('hidden')
    }


  }
  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit,
  })

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="container">
        <div className={`w-full  absolute inset-0 ${Spinner} justify-center items-center bg-gray-100 bg-opacity-50`}>
          <Lodear />
        </div>
        <div className='w-5/12 mx-auto py-12'>
          <h2 className='mb-2 text-2xl'>Register now:</h2>
          {Error && <div className="bg-red-300 p-3 border border-red-500 rounded-md my-5" role="alert">
            {Error}
          </div>}
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col mb-3">
              <label className='font-light' htmlFor="userName">Name:</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className="border rounded-md focus-visible:outline-sky-400 p-1" value={formik.values.name} name='name' id="userName" />
            </div>
            {formik.errors.name && formik.touched.name ? <div className="bg-red-300 p-3 border border-red-500 rounded-md" role="alert">
              {formik.errors.name}
            </div> : null}
            <div className="flex flex-col mb-3">
              <label className='font-light' htmlFor="Email">Email:</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className="border rounded-md focus-visible:outline-sky-400 p-1" value={formik.values.email} name='email' id="Email" />
            </div>
            {formik.errors.email && formik.touched.email ? <div className="bg-red-300 p-3 border border-red-500 rounded-md" role="alert">
              {formik.errors.email}
            </div> : null}
            <div className="flex flex-col mb-3">
              <label className='font-light' htmlFor="password">password:</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className="border rounded-md focus-visible:outline-sky-400 p-1" value={formik.values.password} name='password' id="password" />
            </div>
            {formik.errors.password && formik.touched.password ? <div className="bg-red-300 p-3 border border-red-500 rounded-md" role="alert">
              {formik.errors.password}
            </div> : null}
            <div className="flex flex-col mb-3">
              <label className='font-light' htmlFor="password">Repassword:</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className="border rounded-md focus-visible:outline-sky-400 p-1" value={formik.values.rePassword} name='rePassword' id="rePassword" />
            </div>
            {formik.errors.rePassword && formik.touched.rePassword ? <div className="bg-red-300 p-3 border border-red-500 rounded-md" role="alert">
              {formik.errors.rePassword}
            </div> : null}
            <div className="flex flex-col mb-3">
              <label className='font-light' htmlFor="Phone">Number:</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" className="border rounded-md focus-visible:outline-sky-400 p-1" value={formik.values.phone} name='phone' id="Phone" />
            </div>
            {formik.errors.phone && formik.touched.phone ? <div className="bg-red-300 p-3 border border-red-500 rounded-md" role="alert">
              {formik.errors.phone}
            </div> : null}
            <button type='submit' className='btn mt-2 border ms-auto bg-main text-white' disabled={!(formik.isValid && formik.dirty)} >Register</button>
          </form>
        </div>
      </div>
    </>
  )
}
