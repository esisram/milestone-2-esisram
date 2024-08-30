import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Product from '../components/Product'

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
        console.log(response.data)
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
            <Product
              key={product.id}
              id={product.id}
              name={product.title}
              price={product.price}
              image={product.images[0]}
              categoryName={product.category.name}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductListingPage
