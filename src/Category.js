import { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

const categorySchema = yup.object().shape({
  name: yup.string().required('Category name is required')
})

const Category = () => {
  const [categories, setCategories] = useState([])
  const [editingCategory, setEditingCategory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const methods = useForm({
    resolver: yupResolver(categorySchema),
    mode: 'onTouched'
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get('http://localhost:8080/categories')
        setCategories(response.data)
      } catch (error) {
        setError('Failed to load categories')
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const handleAddCategory = async (data) => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.post('http://localhost:8080/categories', data)
      setCategories((prev) => [...prev, { id: response.data.id, ...data }])
      methods.reset()
    } catch (error) {
      setError('Failed to add category')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateCategory = async (data) => {
    try {
      setLoading(true)
      setError(null)
      await axios.put(`http://localhost:8080/categories/${editingCategory.id}`, data)
      setCategories((prev) => prev.map((cat) => (cat.id === editingCategory.id ? { id: cat.id, ...data } : cat)))
      setEditingCategory(null)
      methods.reset()
    } catch (error) {
      setError('Failed to update category')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this category?')
    if (!confirmed) return

    try {
      setLoading(true)
      setError(null)
      await axios.delete(`http://localhost:8080/categories/${id}`)
      setCategories((prev) => prev.filter((cat) => cat.id !== id))
    } catch (error) {
      setError('Failed to delete category')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    methods.setValue('name', category.name)
  }

  return (
    <FormProvider {...methods}>
      <div className='container mx-auto p-4'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-lg font-medium mb-4'>{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
          <form onSubmit={methods.handleSubmit(editingCategory ? handleUpdateCategory : handleAddCategory)}>
            <div className='mb-4'>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                Category Name
              </label>
              <input
                id='name'
                type='text'
                {...methods.register('name')}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              />
              {methods.formState.errors.name && (
                <p className='text-red-500 text-sm mt-1'>{methods.formState.errors.name.message}</p>
              )}
            </div>
            {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
            <button
              type='submit'
              className={`w-full bg-blue-500 px-6 py-2 rounded-lg text-white hover:bg-blue-600 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? (editingCategory ? 'Updating...' : 'Adding...') : editingCategory ? 'Update' : 'Add'}
            </button>
          </form>
        </div>
        <div className='mt-6'>
          <h2 className='text-lg font-medium mb-4'>Category List</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id} className='flex justify-between items-center mb-2 p-2 bg-gray-100 rounded'>
                <span>{category.name}</span>
                <div>
                  <button
                    onClick={() => handleEdit(category)}
                    className='bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600'
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FormProvider>
  )
}
// export
export default Category
