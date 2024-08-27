import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

const ProductCategoryPage: React.FC = () => {
  const { category } = useParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(`https://fake-api.platzi.com/products?category=${category}`)
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
    <div>
      <h2 className='text-2xl font-bold mb-4'>Products in Category: {category}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {products.map((product) => (
            <div key={product.id} className='border p-4'>
              <img src={product.image} alt={product.name} className='w-full h-48 object-cover mb-2' />
              <h3 className='text-lg font-medium'>{product.name}</h3>
              <p>${product.price}</p>
              <button className='bg-blue-500 text-white px-4 py-2 mt-2'>
                <a href={`/products/${product.id}`}>View Details</a>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductCategoryPage
