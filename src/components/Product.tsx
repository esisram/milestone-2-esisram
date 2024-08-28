import React from 'react'
import { Link } from 'react-router-dom'

interface ProductProps {
  id: number
  name: string
  price: number
  image: string
  categoryName: string // Accept category name as a prop
}

const Product: React.FC<ProductProps> = ({ id, name, price, image, categoryName }) => {
  return (
    <div className='border p-4'>
      <img src={image} alt={name} className='w-full h-60 object-cover mb-2' />
      <h2 className='text-lg font-medium'>{name}</h2>
      <p className='text-gray-600'>{categoryName}</p> {/* Display category name */}
      <p className='text-xl font-bold'>${price}</p>
      <Link to={`/products/${id}`} className='bg-blue-500 text-white px-4 py-2 mt-2 inline-block rounded'>
        View Details
      </Link>
    </div>
  )
}

export default Product
