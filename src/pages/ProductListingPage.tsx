import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductComponent from '../components/Product';

interface ProductData {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: {
    name: string;
    image: string;
  };
}

interface Category {
  id: number;
  name: string;
  image: string;
}

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch categories.');
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    selectedCategory ? product.category.name === selectedCategory : true
  );

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Ayo lihat-lihat Product Kami</h2>
      <div className='mb-4'>
        <label htmlFor='category' className='mr-2 text-lg'>Filter by Category:</label>
        <select id='category' value={selectedCategory} onChange={handleCategoryChange} className='p-2 border rounded'>
          <option value=''>All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filteredProducts.map(product => (
            <ProductComponent
              key={product.id}
              id={product.id}
              name={product.title}
              price={product.price}
              image={product.images[0] || 'https://via.placeholder.com/150'}
              categoryName={product.category.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
