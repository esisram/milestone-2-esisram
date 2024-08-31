import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

const ProductCategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products?category=${category}`)
        setProducts(response.data)
      } catch (err) {
        setError('Failed to fetch products.')
      } finally {
        setLoading(false)
      }
    }

    fetchProductsByCategory()
  }, [category])

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Products in Category: {category}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {products.map((product) => (
            <div key={product.id} className='border p-4'>
              <img
                src={product.image || 'https://via.placeholder.com/150'}
                alt={product.name}
                className='w-full h-48 object-cover mb-2'
              />
              <h3 className='text-lg font-medium mb-1'>{product.name}</h3>
              <p className='text-lg mb-2'>${product.price}</p>
              <Link to={`/products/${product.id}`}>
                <button className='bg-blue-500 text-white px-4 py-2 mt-2'>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductCategoryPage
