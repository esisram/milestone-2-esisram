import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://fakeapi.platzi.com/auth/register', {
        name,
        email,
        password
      })

      if (response.status === 201) {
        // Assuming a successful response status of 201
        navigate('/login') // Redirect to login page after successful registration
      }
    } catch (error) {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default RegisterPage
