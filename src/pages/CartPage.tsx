import React from 'react'
import { useCart } from '../context/CartContext'

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const handleQuantityChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(event.target.value, 10)
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(id, quantity)
    } else {
      updateQuantity(id, 1) // Default to 1 if the input is invalid
    }
  }

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} style={{ marginBottom: '20px' }}>
              <h2>{item.title}</h2>
              <p>Price: ${item.price}</p>
              <input
                type='number'
                value={item.quantity}
                min='1'
                onChange={(e) => handleQuantityChange(item.id, e)}
                style={{ width: '50px', marginRight: '10px' }}
              />
              <button onClick={() => removeFromCart(item.id)} style={{ backgroundColor: 'red', color: 'white' }}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CartPage
