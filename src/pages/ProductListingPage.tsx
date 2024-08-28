import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: {
    id: number
    name: string
    image: string
  }
  images: string[]
}

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/products')
        setProducts(response.data)
      } catch (err) {
        setError('Failed to fetch products.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Product Listing</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {products.map((product) => (
            <div key={product.id} className='border p-4 rounded-lg shadow-md'>
              <img src={product.images[0]} alt={product.title} className='w-full h-48 object-cover mb-2 rounded-lg' />
              <h3 className='text-lg font-medium mb-2'>{product.title}</h3>
              <p className='text-xl font-bold mb-2'>${product.price.toFixed(2)}</p>
              <p className='text-gray-600 mb-2'>{product.description}</p>
              <div className='text-gray-500 text-sm mb-4'>Category: {product.category.name}</div>
              <a
                href={`/products/${product.id}`}
                className='bg-blue-500 text-white px-4 py-2 rounded-lg inline-block text-center'
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductListingPage
