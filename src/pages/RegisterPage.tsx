import React, { useState, useEffect } from 'react'
import { useForm, FormProvider, Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Define TypeScript types for form data
interface FormDataStep1 {
  name: string
  email: string
  dob: Date | null
}

interface FormDataStep2 {
  street: string
  city: string
  state: string
  zip: string
}

interface FormDataStep3 {
  username: string
  password: string
}

interface FormData extends FormDataStep1, FormDataStep2, FormDataStep3 {
  role: string
  avatar: string
}

// Validation schemas for each step
const step1Schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  dob: yup.date().required('Date of Birth is required').nullable()
})

const step2Schema = yup.object().shape({
  street: yup.string().required('Street Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zip: yup
    .string()
    .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Invalid Zip Code')
    .required('Zip Code is required')
})

const step3Schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required')
})

const getSchema = (step: number): yup.ObjectSchema<any> => {
  switch (step) {
    case 1:
      return step1Schema
    case 2:
      return step2Schema
    case 3:
      return step3Schema
    default:
      return step1Schema
  }
}

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [userInfo, setUserInfo] = useState<FormData | null>(null) // State for user info
  const navigate = useNavigate() // useNavigate for navigation

  const methods = useForm<FormData>({
    resolver: yupResolver(getSchema(step)) as Resolver<FormData>,
    mode: 'onTouched'
  })

  const {
    handleSubmit,
    formState: { errors }
  } = methods

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError('')
    setSuccessMessage('')
    setUserInfo(null) // Clear previous user info

    // Format the data according to API requirements
    const formattedData = {
      email: data.email,
      password: data.password,
      name: data.name,
      role: 'customer', // Assuming default role
      avatar: 'https://i.imgur.com/LDOO4Qs.jpg' // Default avatar image
    }

    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/users/', formattedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log('Response:', response.data)
      setSuccessMessage('Registration successful!')
      setUserInfo({
        name: data.name,
        email: data.email,
        dob: data.dob,
        role: 'customer',
        avatar: 'https://i.imgur.com/LDOO4Qs.jpg',
        username: data.username,
        password: data.password,
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zip
      }) // Set user info
    } catch (error: any) {
      if (error.response) {
        // Server-side error
        setError(`Failed to register: ${error.response.data.message || error.response.statusText}`)
      } else if (error.request) {
        // Request was made but no response
        setError('Failed to register: No response from server')
      } else {
        // Other errors
        setError(`Failed to register: ${error.message}`)
      }
      console.error('Error registering user:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (successMessage && userInfo) {
      const timer = setTimeout(() => {
        navigate('/login') // Navigate to LoginPage after 5 seconds
      }, 5000)

      // Cleanup the timer if component unmounts
      return () => clearTimeout(timer)
    }
  }, [successMessage, userInfo, navigate])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(step === 3 ? onSubmit : handleNext)}>
        <div className='flex items-center justify-center h-screen'>
          <div className='bg-white p-6 rounded-lg shadow-md w-full lg:max-w-xl'>
            <h2 className='text-lg font-medium mb-4'>Step {step} of 3</h2>
            <div className='flex mb-4'>
              <div
                className={`w-1/3 border-r border-gray-400 ${
                  step === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                } p-2 text-center cursor-pointer`}
                onClick={() => setStep(1)}
              >
                Step 1
              </div>
              <div
                className={`w-1/3 border-r border-gray-400 ${
                  step === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                } p-2 text-center cursor-pointer`}
                onClick={() => setStep(2)}
              >
                Step 2
              </div>
              <div
                className={`w-1/3 ${
                  step === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                } p-2 text-center cursor-pointer`}
                onClick={() => setStep(3)}
              >
                Step 3
              </div>
            </div>

            {error && <div className='text-red-500 mb-4'>{error}</div>}
            {successMessage && <div className='text-green-500 mb-4'>{successMessage}</div>}
            {loading && <div className='text-blue-500 mb-4'>Submitting...</div>}

            {userInfo && !loading && (
              <div className='mb-4'>
                <h3 className='text-lg font-medium mb-4'>Registration Info</h3>
                <p>
                  <strong>Name:</strong> {userInfo.name}
                </p>
                <p>
                  <strong>Email:</strong> {userInfo.email}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {userInfo.dob?.toString()}
                </p>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 className='text-lg font-medium mb-4'>Step 1: Personal Information</h3>
                <div className='mb-4'>
                  <label className='block font-medium mb-2 text-gray-700' htmlFor='name'>
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    {...methods.register('name')}
                    className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-400'} p-2`}
                  />
                  {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className='mb-4'>
                  <label className='block font-medium mb-2 text-gray-700' htmlFor='email'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    id='email'
                    {...methods.register('email')}
                    className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-400'} p-2`}
                  />
                  {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className='mb-4'>
                  <label className='block font-medium mb-2 text-gray-700' htmlFor='dob'>
                    Date of Birth
                  </label>
                  <input
                    type='date'
                    id='dob'
                    {...methods.register('dob')}
                    className={`w-full border ${errors.dob ? 'border-red-500' : 'border-gray-400'} p-2`}
                  />
                  {errors.dob && <p className='text-red-500'>{errors.dob.message}</p>}
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h3 className='text-lg font-medium mb-4'>Step 2: Address Information</h3>
                <div className='mb-4'>
                  <label className='block font-medium mb-2 text-gray-700' htmlFor='street'>
                    Street Address
                  </label>
                  <input
                    type='text'
                    id='street'
                    {...methods.register('street')}
                    className={`w-full border ${errors.street ? 'border-red-500' : 'border-gray-400'} p-2`}
                  />
                  {errors.street && <p className='text-red-500'>{errors.street.message}</p>}
                </div>
                <div className='mb-4'>
                  <label className='block font-medium mb-2 text-gray-700' htmlFor='city'>
                    City
                  </label>
                  <input
                    type='text'
                    id='city'
                    {...methods.register('city')}
                    className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-400'} p-2`}
                  />
                  {errors.city && <p className='text-red-500'>{errors.city.message}</p>}
                </div>
                <div className='mb-4'>
                  <label className='block font-medium mb-2 text-gray-700' htmlFor='state'>
                    State
                  </label>
                  <input
                    type='text'
                    id='state'
                    {...methods.register('state')}
                    className={`w-full border ${errors.state ? 'border-red-500' : 'border-gray-400'} p-2`}
                  />
                  {errors.state && <p className='text-red-500'>{errors.state.message}</p>}
                </div>
                <div className='mb-4'>
                  <label className='block font-medium mb-2 text-gray-700' htmlFor='zip'>
                    Zip Code
                  </label>
                  <input
                    type='text'
                    id='zip'
                    {...methods.register('zip')}
                    className={`w-full border ${errors.zip ? 'border-red-500' : 'border-gray-400'} p-2`}
                  />
                  {errors.zip && <p className='text-red-500'>{errors.zip.message}</p>}
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h3 className='text-lg font-medium mb-4'>Step 3: Account Information</h3>
                <div className='mb-4'>
                  <label className='block font-medium mb-2 text-gray-700' htmlFor='username'>
                    Username
                  </label>
                  <input
                    type='text'
                    id='username'
                    {...methods.register('username')}
                    className={`w-full border ${errors.username ? 'border-red-500' : 'border-gray-400'} p-2`}
                  />
                  {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
                </div>
                <div className='mb-4'>
                  <label className='block font-medium mb-2 text-gray-700' htmlFor='password'>
                    Password
                  </label>
                  <input
                    type='password'
                    id='password'
                    {...methods.register('password')}
                    className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-400'} p-2`}
                  />
                  {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                </div>
              </div>
            )}

            <div className='flex justify-between'>
              {step > 1 && (
                <button type='button' onClick={handleBack} className='bg-gray-500 text-white px-4 py-2 rounded-lg'>
                  Back
                </button>
              )}
              {step < 3 ? (
                <button type='button' onClick={handleNext} className='bg-blue-500 text-white px-4 py-2 rounded-lg'>
                  Next
                </button>
              ) : (
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-lg'>
                  {loading ? 'Submitting...' : 'Register'}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default RegisterPage
