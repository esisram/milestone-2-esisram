import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProductListingPage from './pages/ProductListingPage'
import ProductCategoryPage from './pages/ProductCategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'

const App: React.FC = () => {
  return (
    <Router>
      <div className='min-h-screen flex flex-col'>
        <nav className='bg-gray-800 p-4'>
          <div className='container mx-auto flex justify-between'>
            <Link to='/' className='text-white text-lg font-bold'>
              Home
            </Link>
            <div>
              <Link to='/register' className='text-white px-4'>
                Register
              </Link>
              <Link to='/login' className='text-white px-4'>
                Login
              </Link>
              <Link to='/products' className='text-white px-4'>
                Products
              </Link>
              <Link to='/cart' className='text-white px-4'>
                Cart
              </Link>
            </div>
          </div>
        </nav>

        <main className='flex-grow'>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/products' element={<ProductListingPage />} />
            <Route path='/products/category/:category' element={<ProductCategoryPage />} />
            <Route path='/products/:id' element={<ProductDetailPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/' element={<div className='text-center p-6'>Welcome to the App!</div>} />
          </Routes>
        </main>

        <footer className='bg-gray-800 text-white text-center p-4'>
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
