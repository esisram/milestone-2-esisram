import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
}

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakeapi.platzi.com/products')
        setProducts(response.data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <h1>Product Listing</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '16px', width: '300px' }}>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <h2>{product.title}</h2>
            <p>${product.price}</p>
            <p>{product.description.slice(0, 100)}...</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link to={`/product/${product.id}`}>
                <button>View Details</button>
              </Link>
              <button onClick={() => addToCart({ ...product, quantity: 1 })}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductListingPage
