import React, { useState } from 'react'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([])

  // Example function to handle adding/removing items
  const handleRemoveFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className='flex justify-between items-center mb-2'>
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>${item.price * item.quantity}</span>
                <button
                  className='bg-red-500 text-white px-2 py-1 rounded'
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className='mt-4'>
            <h3 className='text-lg font-bold'>Total: ${total}</h3>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
