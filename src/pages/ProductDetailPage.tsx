import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

interface Product {
  id: number
  title: string
  price: number
  description: string
  images: string[]
  category: {
    name: string
  }
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`)
        setProduct(response.data)
      } catch (err) {
        setError('Failed to fetch product details.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return (
    <div className='p-4'>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : product ? (
        <div className='flex flex-col md:flex-row items-start mb-4'>
          <img
            src={product.images[0] || 'https://via.placeholder.com/350'}
            alt={product.title}
            className='w-[350px] h-[350px] object-cover mb-4 md:mb-0'
          />
          <div className='md:ml-4'>
            <h2 className='text-4xl font-bold mb-4'>{product.title}</h2>
            <p className='text-xl mb-4'>{product.description}</p>
            <p className='text-3xl font-bold mb-4'>${product.price}</p>
            <p className='text-2xl font-semibold mb-4'>Category: {product.category.name}</p>
            <button className='bg-blue-500 text-white px-6 py-3 mt-4 text-xl'>Add to Cart</button>
          </div>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  )
}

export default ProductDetailPage
