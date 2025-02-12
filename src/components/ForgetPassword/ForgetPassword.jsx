import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Lodear from '../Lodear/Lodear'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async';


export default function ForgetPassword() {

  const Navigate = useNavigate()
  const [Spinner, setSpinner] = useState('hidden')
  const [Error, setError] = useState(null)

  const validationSchema = Yup.object().shape({
    email: Yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "invalid Email").required(),
  })


  async function onSubmit(value) {
    try {
      setSpinner('flex')
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', value)
      if (data.statusMsg == "success") {
        toast.success(data.message, {
          position: 'top-center',
          theme: 'dark'
        })
        Navigate('/verifycode')

      }

    } catch (error) {
      setError(error.response.data.message)
      toast.error('invalid Email', {
        position: 'top-center',
        theme: 'dark'
      })

    } finally {
      setSpinner('hidden')
    }


  }
  let formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit,
  })


  return (
    <>
      <Helmet>
        <title>ForgetPassword</title>
      </Helmet>
      <div className="container">
        <div className={`w-full  absolute inset-0 ${Spinner} justify-center items-center bg-gray-100 bg-opacity-50`}>
          <Lodear />
        </div>
        <div className='w-8/12 mx-auto py-12'>
          <h2 className='my-10 text-2xl'>Please Enter Your Email :</h2>
          {Error && <div className="bg-red-300 p-3 my-3 border border-red-500 rounded-md" role="alert">
            {Error}
          </div>}
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col mb-3">
              <label className='font-light' htmlFor="Email">Email:</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className="border rounded-md focus-visible:outline-sky-400 p-1" value={formik.values.email} name='email' id="Email" />
            </div>
            {formik.errors.email && formik.touched.email ? <div className="bg-red-300 p-3 border border-red-500 rounded-md" role="alert">
              {formik.errors.email}
            </div> : null}
            <button type='submit' className='btn mt-2 border ms-auto bg-main text-white' disabled={!(formik.isValid && formik.dirty)}>Send</button>
          </form>
        </div>
      </div>
    </>
  )
}

