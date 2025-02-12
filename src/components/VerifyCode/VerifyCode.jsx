import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Lodear from '../Lodear/Lodear'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async';


export default function VerifyCode() {

  const Navigate = useNavigate()
  const [Spinner, setSpinner] = useState('hidden')
  const [Error, setError] = useState(null)

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string().matches(/^[a-zA-Z0-9]{5,}$/, "invalid Code").required()
  })


  async function onSubmit(value) {
    try {
      setSpinner('flex')
      const data = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', value)
      if (data.status == 200) {
        toast.success('Varified', {
          position: 'top-center',
          theme: 'dark'
        })
        Navigate('/resetpassword')

      }

    } catch (error) {
      setError(error.response.data.message)
      toast.error('invalid Code', {
        position: 'top-center',
        theme: 'dark'
      })
    } finally {
      setSpinner('hidden')
    }


  }
  let formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema,
    onSubmit,
  })


  return (
    <>
      <Helmet>
        <title>VerifyCode</title>
      </Helmet>
      <div className="container">
        <div className={`w-full  absolute inset-0 ${Spinner} justify-center items-center bg-gray-100 bg-opacity-50`}>
          <Lodear />
        </div>
        <div className='w-8/12 mx-auto py-12'>
          <h2 className='my-10 text-2xl'>Please Enter Code :</h2>
          {Error && <div className="bg-red-300 p-3 my-3 border border-red-500 rounded-md" role="alert">
            {Error}
          </div>}
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col mb-3">
              <label className='font-light' htmlFor="resetCode">code : </label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className="border rounded-md focus-visible:outline-sky-400 p-1" value={formik.values.resetCode} name='resetCode' id="resetCode" />
            </div>
            {formik.errors.resetCode && formik.touched.resetCode ? <div className="bg-red-300 p-3 border border-red-500 rounded-md" role="alert">
              {formik.errors.resetCode}
            </div> : null}
            <button type='submit' className='btn mt-2 border ms-auto bg-main text-white' disabled={!(formik.isValid && formik.dirty)}>Send</button>
          </form>
        </div>
      </div>
    </>
  )
}
