import React from 'react'
import { useCart } from '../context/CartContext'

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const handleQuantityChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(event.target.value, 10)
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(id, quantity)
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
            <li key={item.id}>
              <h2>{item.title}</h2>
              <p>Price: ${item.price}</p>
              <input type='number' value={item.quantity} onChange={(e) => handleQuantityChange(item.id, e)} />
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CartPage
