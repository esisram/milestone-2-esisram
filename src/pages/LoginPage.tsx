import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../App' // Use the custom hook instead of direct context

interface LoginFormData {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required')
})

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    mode: 'onTouched'
  })

  const navigate = useNavigate()
  const { setUser } = useUser() // Use the custom hook to access context

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', data)
      console.log('Login successful:', response.data)
      setUser(response.data.email) // Set the username in the context
      navigate('/products') // Redirect to ProductListingPage
    } catch (error) {
      console.error('Login failed:', error)
      // Handle login failure, e.g., show an error message
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-white p-6 rounded-lg shadow-md w-full lg:max-w-md'>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='block font-medium mb-2 text-gray-700' htmlFor='email'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              {...register('email')}
              className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-400'} p-2`}
            />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>
          <div className='mb-4'>
            <label className='block font-medium mb-2 text-gray-700' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              id='password'
              {...register('password')}
              className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-400'} p-2`}
            />
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
          </div>
          <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded-lg'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
