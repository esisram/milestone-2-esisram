import { useFormContext } from 'react-hook-form'

const Step2 = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <div>
      <h3 className='text-lg font-medium mb-4'>Step 2: Address Information</h3>
      <div className='mb-4'>
        <label className='block font-medium mb-2 text-gray-700' htmlFor='street'>
          Street Address
        </label>
        <input
          type='text'
          id='street'
          {...register('street')}
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
          {...register('city')}
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
          {...register('state')}
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
          {...register('zip')}
          className={`w-full border ${errors.zip ? 'border-red-500' : 'border-gray-400'} p-2`}
        />
        {errors.zip && <p className='text-red-500'>{errors.zip.message}</p>}
      </div>
    </div>
  )
}

export default Step2
