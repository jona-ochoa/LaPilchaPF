import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../GlobalRedux/store';
import { useGetProductsQuery } from '../GlobalRedux/api/productsApi';
import { setProducts } from '../GlobalRedux/features/productsSlice';
import { setCategory, setMinPrice, setMaxPrice, resetFilters } from '../GlobalRedux/features/filterSlice';
import { Product } from '../GlobalRedux/api/productsApi';
import { setSearchQuery } from '../GlobalRedux/features/searchQuerySlice';
import { useAppDispatch } from '../GlobalRedux/hooks';




const ProductFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const [minPrice, setMinPriceLocal] = useState('');
  const [maxPrice, setMaxPriceLocal] = useState('');
  const [category, setCategoryLocal] = useState('');
  const { data, error, isLoading, isFetching } = useGetProductsQuery(null);

  const allProducts: Product[] = useSelector((state: RootState) => state.products.products);
  const categories: string[] = Array.from(new Set(allProducts.map((product) => product.category)));

  


  useEffect(() => {
    if (data) {
      dispatch(setProducts(data));
    }
  }, [data, dispatch]);

  const handleResetSearch = () => {
    dispatch(setSearchQuery('')); // Establecer la búsqueda vacía
  };

const handleResetFilters = () => {
  setMinPriceLocal('');
  setMaxPriceLocal('');
  setCategoryLocal('');
  dispatch(resetFilters());
  dispatch(setProducts(allProducts)); // Restablecer todos los productos
  handleResetSearch(); // Restablecer la búsqueda
};

  const handleFilterProducts = () => {
    let filteredProducts = allProducts;

    if (minPrice !== '') {
      filteredProducts = filteredProducts.filter((product) => parseFloat(product.price) >= parseFloat(minPrice));
    }

    if (maxPrice !== '') {
      filteredProducts = filteredProducts.filter((product) => parseFloat(product.price) <= parseFloat(maxPrice));
    }

    if (category !== '') {
      filteredProducts = filteredProducts.filter((product) => product.category === category);
    }

    dispatch(setProducts(filteredProducts)); // Aplicar los filtros
  };

  

  if (isLoading || isFetching) {
    return <p>Cargando Productos...</p>;
  }

  if (error) {
    return <p>Error al obtener los productos</p>;
  }

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
          onChange={(e) => setMinPriceLocal(e.target.value)}
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
          onChange={(e) => setMaxPriceLocal(e.target.value)}
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