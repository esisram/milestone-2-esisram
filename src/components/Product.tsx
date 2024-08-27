import React from 'react'
import { Link } from 'react-router-dom'

interface ProductProps {
  id: number
  name: string
  price: number
  image: string
}

const Product: React.FC<ProductProps> = ({ id, name, price, image }) => {
  return (
    <div>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>${price}</p>
      <Link to={`/product/${id}`}>View Details</Link>
    </div>
  )
}

export default Product
