import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await axios.post('https://api.escuelajs.co/api/v1/auth/register', {
        email: data.email,
        password: data.password,
      });
      navigate('/login');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-white p-6 rounded-lg shadow-md w-full lg:max-w-md'>
        <h2 className='text-xl font-bold mb-4'>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700'>Email</label>
            <input
              type='email'
              id='email'
              {...register('email', { required: 'Email is required' })}
              className='w-full border p-2'
            />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block text-gray-700'>Password</label>
            <input
              type='password'
              id='password'
              {...register('password', { required: 'Password is required' })}
              className='w-full border p-2'
            />
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
          </div>
          <div className='mb-4'>
            <label htmlFor='confirmPassword' className='block text-gray-700'>Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              {...register('confirmPassword', { required: 'Confirm Password is required' })}
              className='w-full border p-2'
            />
            {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
          </div>
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
