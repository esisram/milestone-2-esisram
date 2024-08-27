import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

// Define schema for login form validation
const loginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
})

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onTouched'
  })

  const handleLogin = async (data) => {
    try {
      setLoading(true)
      setError(null)
      console.log('Login Data:', data) // Log data to verify

      // Send login data to API
      const response = await axios.post('http://localhost:8080/login', data)
      console.log('Response:', response.data)

      // Handle successful login
      // Example: Save token to local storage and redirect
      // localStorage.setItem('token', response.data.token)
      // navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      // Check if error is from server and handle accordingly
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password')
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleLogin)}>
        <div className='flex items-center justify-center h-screen'>
          <div className='bg-white p-6 rounded-lg shadow-md w-full lg:max-w-xl'>
            <h2 className='text-lg font-medium mb-4'>Login</h2>

            <div className='mb-4'>
              <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
                Username
              </label>
              <input
                id='username'
                type='text'
                {...methods.register('username')}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              />
              {methods.formState.errors.username && (
                <p className='text-red-500 text-sm mt-1'>{methods.formState.errors.username.message}</p>
              )}
            </div>

            <div className='mb-4'>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <input
                id='password'
                type='password'
                {...methods.register('password')}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              />
              {methods.formState.errors.password && (
                <p className='text-red-500 text-sm mt-1'>{methods.formState.errors.password.message}</p>
              )}
            </div>

            {error && <div className='text-red-500 text-sm mb-4'>{error}</div>}

            <button
              type='submit'
              className={`w-full bg-blue-500 px-6 py-2 rounded-lg text-white hover:bg-blue-600 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
// export
export default Login
