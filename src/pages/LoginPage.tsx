import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const { setUser } = useUser();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', data);
      setUser(response.data.user);
      navigate('/products');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-white p-6 rounded-lg shadow-md w-full lg:max-w-md'>
        <h2 className='text-xl font-bold mb-4'>Login</h2>
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
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
