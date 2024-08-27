import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import MultiStepForm from './Register'
import Login from './Login'
import Category from './Category'

const App = () => {
  return (
    <Router>
      <div className='min-h-screen bg-gray-100'>
        <header className='bg-blue-600 text-white p-4'>
          <nav className='container mx-auto flex justify-between items-center'>
            <h1 className='text-xl font-bold'>My Application</h1>
            <div>
              <Link to='/' className='text-white hover:underline mx-2'>
                Home
              </Link>
              <Link to='/register' className='text-white hover:underline mx-2'>
                Register
              </Link>
              <Link to='/login' className='text-white hover:underline mx-2'>
                Login
              </Link>
              <Link to='/categories' className='text-white hover:underline mx-2'>
                Categories
              </Link>
            </div>
          </nav>
        </header>
        <main className='py-6'>
          <Routes>
            <Route path='/' element={<div className='text-center text-lg'>Welcome to Final CheckPoints!</div>} />
            <Route path='/register' element={<MultiStepForm />} />
            <Route path='/login' element={<Login />} />
            <Route path='/categories' element={<Category />} />
            <Route path='*' element={<div className='text-center text-lg'>404 - Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
// export
export default App
