import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: {
    name: string;
    image: string;
  };
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }
  };

  return (
    <div className='p-4'>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : product ? (
        <div>
          <h2 className='text-2xl font-bold'>{product.title}</h2>
          <img src={product.images[0] || 'https://via.placeholder.com/300'} alt={product.title} className='w-full max-w-md' />
          <p className='mt-4'>{product.description}</p>
          <p className='mt-4 font-bold'>${product.price}</p>
          <button
            onClick={handleAddToCart}
            className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
          >
            Add to Cart
          </button>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetailPage;
