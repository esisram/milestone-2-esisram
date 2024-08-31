import React from 'react';
import { Link } from 'react-router-dom';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  categoryName: string;
}

const Product: React.FC<ProductProps> = ({ id, name, price, image, categoryName }) => {
  return (
    <div className='border p-4 rounded shadow-lg'>
      <img src={image} alt={name} className='w-full h-48 object-cover mb-4' />
      <h3 className='text-lg font-semibold'>{name}</h3>
      <p className='text-gray-700'>{categoryName}</p>
      <p className='text-xl font-bold'>${price.toFixed(2)}</p>
      <Link to={`/products/${id}`} className='text-blue-500 hover:underline'>View Details</Link>
    </div>
  );
};

export default Product;
