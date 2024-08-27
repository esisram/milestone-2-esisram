import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import axios from 'axios'

// Define the structure of a product
interface Product {
  id: number
  title: string
  description: string
  price: number
  image: string
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null) // Use the Product interface

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakeapi.platzi.com/products/${id}`)
        setProduct(response.data)
      } catch (error) {
        console.error('Failed to fetch product:', error)
      }
    }

    fetchProduct()
  }, [id])

  if (!product) return <p>Loading...</p>

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => addToCart({ ...product, quantity: 1 })}>Add to Cart</button>
    </div>
  )
}

export default ProductDetailPage
