import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

const MultiStepForm = () => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (data) => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.post('http://localhost:8080/register', data)
      console.log('Response:', response.data)
      // Redirect or show success message
    } catch (error) {
      setError('Failed to register. Please try again.')
      console.error('Error registering user:', error)
    } finally {
      setLoading(false)
    }
  }

  const methods = useForm({
    resolver: yupResolver(step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema),
    mode: 'onTouched'
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(step === 3 ? handleSubmit : handleNext)}>
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

            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}

            <div className='flex justify-between mt-6'>
              {step > 1 && (
                <button
                  type='button'
                  className='bg-gray-300 px-6 py-1.5 rounded-lg text-gray-700 hover:bg-gray-400'
                  onClick={handleBack}
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button type='submit' className='bg-blue-500 px-6 py-1.5 rounded-lg text-white hover:bg-blue-600'>
                  Next
                </button>
              ) : (
                <button
                  type='submit'
                  className='bg-green-500 px-6 py-1.5 rounded-lg text-white hover:bg-green-600'
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

const step1Schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
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
// export
export default MultiStepForm
