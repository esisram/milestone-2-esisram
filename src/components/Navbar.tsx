import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { user } = useUser();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-white text-lg font-bold'>Home</Link>
        <div>
          {!user ? (
            <>
              <Link to='/register' className='text-white px-4'>Register</Link>
              <Link to='/login' className='text-white px-4'>Login</Link>
            </>
          ) : (
            <span className='text-white px-4'>Welcome, {user}</span>
          )}
          <Link to='/products' className='text-white px-4'>Products</Link>
          <Link to='/cart' className='text-white px-4'>
            Cart{totalItems > 0 ? ` (${totalItems})` : ''}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
