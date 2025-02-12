import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Lodear from '../Lodear/Lodear'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async';


export default function ResetPassword() {

  const Navigate = useNavigate()
  const [Spinner, setSpinner] = useState('hidden')
  const [Error, setError] = useState(null)

  const validationSchema = Yup.object().shape({
    email: Yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "invalid Email").required(),
    newPassword: Yup.string().matches(/^[a-zA-Z1-9]{8,}$/, "weak passowrd , should be At Least 8 characters").required(),

  })


  async function onSubmit(value) {
    try {
      setSpinner('flex')
      const data = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', value)
      console.log(data);

      if (data.status == 200) {
        toast.success('Password has changed successfully', {
          position: 'top-center',
          theme: 'dark'
        })
        Navigate('/login')
      }

    } catch (error) {
      console.log(error);

      setError(error.response.data.message)
      toast.error('Please Try Again Later', {
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
      newPassword: '',
    },
    validationSchema,
    onSubmit,
  })


  return (
    <>
      <Helmet>
        <title>ResetPassword</title>
      </Helmet>
      <div className="container">
        <div className={`w-full  absolute inset-0 ${Spinner} justify-center items-center bg-gray-100 bg-opacity-50`}>
          <Lodear />
        </div>
        <div className='w-5/12 mx-auto py-12'>
          <h2 className='my-10 text-2xl'>Reset Password:</h2>
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
            <div className="flex flex-col mb-3">
              <label className='font-light' htmlFor="newPassword">newPassword:</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="Password" className="border rounded-md focus-visible:outline-sky-400 p-1" value={formik.values.newPassword} name='newPassword' id="newPassword" />
            </div>
            {formik.errors.newPassword && formik.touched.newPassword ? <div className="bg-red-300 p-3 border border-red-500 rounded-md" role="alert">
              {formik.errors.newPassword}
            </div> : null}
            <button type='submit' className='btn mt-2 border ms-auto bg-main text-white' disabled={!(formik.isValid && formik.dirty)}>Reset</button>
          </form>
        </div>
      </div>
    </>
  )
}
