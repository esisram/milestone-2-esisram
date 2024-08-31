import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className='mb-4'>
              <div className='flex justify-between items-center'>
                <span>{item.name}</span>
                <span>${item.price}</span>
                <input
                  type='number'
                  min='1'
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  className='w-16 border p-1'
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className='bg-red-500 text-white px-4 py-2 rounded'
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
