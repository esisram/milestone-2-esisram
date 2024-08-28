import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams()
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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : product ? (
        <div>
          <h2 className='text-2xl font-bold mb-4'>{product.name}</h2>
          <img src={product.image} alt={product.name} className='w-full h-64 object-cover mb-4' />
          <p className='text-lg mb-4'>{product.description}</p>
          <p className='text-xl font-bold'>${product.price}</p>
          <button className='bg-blue-500 text-white px-4 py-2 mt-4'>Add to Cart</button>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  )
}

export default ProductDetailPage
