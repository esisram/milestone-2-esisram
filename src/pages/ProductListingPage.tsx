import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface Product {
  id: number
  title: string
  price: number
  images: string[]
  category: {
    name: string
  }
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
      <h2 className='text-2xl font-bold mb-4'>Ayo lihat-lihat Product Kami</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {products.map((product) => (
            <div key={product.id} className='border p-4 flex flex-col items-center'>
              <img
                src={product.images[0]} // Use the first image
                alt={product.title}
                className='w-full h-[200px] object-cover mb-2' // Adjust image size and cover
              />
              <h3 className='text-xl font-medium mb-1'>{product.title}</h3>
              <p className='text-lg mb-2'>${product.price}</p>
              <p className='text-sm mb-2'>Category: {product.category.name}</p>
              <button className='bg-blue-500 text-white px-4 py-2'>
                <a href={`/products/${product.id}`}>View Details</a>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductListingPage
