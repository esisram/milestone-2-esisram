import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.platzi.com' // Replace with your actual API base URL
})

export const fetchProducts = () => api.get('/products')
export const fetchProductById = (id: string) => api.get(`/products/${id}`)
export const loginUser = (data: { email: string; password: string }) => api.post('/login', data)
export const registerUser = (data: { email: string; password: string }) => api.post('/register', data)
