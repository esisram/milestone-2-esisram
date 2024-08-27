import { useFormContext } from 'react-hook-form'

const Step1 = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <div>
      <h3 className='text-lg font-medium mb-4'>Step 1: Personal Information</h3>
      <div className='mb-4'>
        <label className='block font-medium mb-2 text-gray-700' htmlFor='fullName'>
          Full Name
        </label>
        <input
          type='text'
          id='fullName'
          {...register('fullName')}
          className={`w-full border ${errors.fullName ? 'border-red-500' : 'border-gray-400'} p-2`}
        />
        {errors.fullName && <p className='text-red-500'>{errors.fullName.message}</p>}
      </div>
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
        <label className='block font-medium mb-2 text-gray-700' htmlFor='dob'>
          Date of Birth
        </label>
        <input
          type='date'
          id='dob'
          {...register('dob')}
          className={`w-full border ${errors.dob ? 'border-red-500' : 'border-gray-400'} p-2`}
        />
        {errors.dob && <p className='text-red-500'>{errors.dob.message}</p>}
      </div>
    </div>
  )
}

export default Step1
