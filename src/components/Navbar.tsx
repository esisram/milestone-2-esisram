import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar: React.FC = () => {
  const { user } = useUser();

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-white text-lg font-bold'>Home</Link>
        <div>
          {user ? (
            <span className='text-white px-4'>Welcome, {user}</span>
          ) : (
            <>
              <Link to='/register' className='text-white px-4'>Register</Link>
              <Link to='/login' className='text-white px-4'>Login</Link>
            </>
          )}
          <Link to='/products' className='text-white px-4'>Products</Link>
          <Link to='/cart' className='text-white px-4'>Cart</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
