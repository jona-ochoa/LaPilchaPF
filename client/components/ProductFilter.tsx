import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../GlobalRedux/hooks";
import { useGetProductsQuery } from "../GlobalRedux/api/productsApi";
import { setProducts } from "../GlobalRedux/features/productsSlice";
import { Product } from "../GlobalRedux/api/productsApi";

const ProductFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const { data, error, isLoading, isFetching } = useGetProductsQuery(null);

  useEffect(() => {
    if (data) {
      dispatch(setProducts(data));
    }
  }, [data, dispatch]);

  const handleResetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setCategory("");
  };

  if (isLoading || isFetching) {
    return <p>Cargando Productos...</p>;
  }

  if (error) {
    return <p>Error al obtener los productos</p>;
  }

  const products: Product[] = data || [];

  const categories: string[] = products
    .map((product: Product) => product.category)
    .filter((category: string, index: number, self: string[]) => {
      return self.indexOf(category) === index;
    });

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex flex-col">
        <label htmlFor="minPrice" className="mb-2">Precio Mínimo:</label>
        <input
          type="number"
          id="minPrice"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="maxPrice" className="mb-2">Precio Máximo:</label>
        <input
          type="number"
          id="maxPrice"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="category" className="mb-2">Categoría:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
      <button onClick={handleResetFilters} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Resetear Filtros</button>
    </div>
  );
};

export default ProductFilter;
