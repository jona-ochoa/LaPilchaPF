import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from "../GlobalRedux/hooks"
import { RootState } from '../GlobalRedux/store';
import { setCategory, setMinPrice, setMaxPrice, resetFilters, applyFilters } from '../GlobalRedux/features/filterSlice';
import { Product } from '../GlobalRedux/api/productsApi';
import { setSearchQuery } from '../GlobalRedux/features/searchQuerySlice';
import { setProducts } from '../GlobalRedux/features/productsSlice';

const ProductFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const [minPrice, setMinPriceLocal] = useState('');
  const [maxPrice, setMaxPriceLocal] = useState('');
  const [category, setCategoryLocal] = useState('');

  const allProducts: Product[] = useSelector((state: RootState) => state.products.products);
  const categories: string[] = Array.from(new Set(allProducts.map((product) => product.category)));

  const handleResetSearch = () => {
    dispatch(setSearchQuery('')); 
  };

  const handleResetFilters = () => {
    setMinPriceLocal('');
    setMaxPriceLocal('');
    setCategoryLocal('');
    dispatch(resetFilters());
    dispatch(setProducts(allProducts)); 
    handleResetSearch(); 
  };

  const handleFilterProducts = () => {
    dispatch(setCategory(category));
    dispatch(setMinPrice(minPrice !== '' ? parseFloat(minPrice) : null));
    dispatch(setMaxPrice(maxPrice !== '' ? parseFloat(maxPrice) : null));
    dispatch(applyFilters(allProducts)); 
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex flex-col">
        <label htmlFor="minPrice" className="mb-2">
          Precio Mínimo:
        </label>
        <input
          type="number"
          id="minPrice"
          value={minPrice}
          min="0"
          onChange={(e) => {
            if (e.target.valueAsNumber >= 0) {
              setMinPriceLocal(e.target.value)
            }
          }}
          className="border border-gray-300 rounded px-3 py-2 mb-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="maxPrice" className="mb-2">
          Precio Máximo:
        </label>
        <input
          type="number"
          id="maxPrice"
          value={maxPrice}
          min="0"
          onChange={(e) => {
            if (e.target.valueAsNumber >= 0) {
              setMaxPriceLocal(e.target.value)
            }
          }}
          className="border border-gray-300 rounded px-3 py-2 mb-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="category" className="mb-2">
          Categoría:
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategoryLocal(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-2"
        >
          <option value="">Todas las categorías</option>
          {categories.map((category: string, index: number) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleFilterProducts} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
        Filtrar Productos
      </button>
      <button onClick={handleResetFilters} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
        Resetear Filtros
      </button>
    </div>
  );
};

export default ProductFilter;

