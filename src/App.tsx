import React, { createContext, useState, useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ProductListingPage from './pages/ProductListingPage'
import ProductCategoryPage from './pages/ProductCategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import Navbar from './components/Navbar'

interface UserContextType {
  user: string | null
  setUser: React.Dispatch<React.SetStateAction<string | null>>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null)

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <div className='min-h-screen flex flex-col'>
          <Navbar />

          <main className='flex-grow'>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/products' element={<ProductListingPage />} />
              <Route path='/products/category/:category' element={<ProductCategoryPage />} />
              <Route path='/products/:id' element={<ProductDetailPage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/' element={<div className='text-center p-6'>Welcome to the Esis Online Store!</div>} />
            </Routes>
          </main>

          <footer className='bg-gray-800 text-white text-center p-4'>
            <p>&copy; 2024 Esis Online Store. Don’t Copy.</p>
          </footer>
        </div>
      </UserContext.Provider>
    </Router>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export default App
