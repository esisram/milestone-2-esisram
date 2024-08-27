import { useFormContext } from 'react-hook-form'

const Step3 = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <div>
      <h3 className='text-lg font-medium mb-4'>Step 3: Account Information</h3>
      <div className='mb-4'>
        <label className='block font-medium mb-2 text-gray-700' htmlFor='username'>
          Username
        </label>
        <input
          type='text'
          id='username'
          {...register('username')}
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
          {...register('password')}
          className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-400'} p-2`}
        />
        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
      </div>
    </div>
  )
}

export default Step3
