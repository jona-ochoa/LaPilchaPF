import React, { useState } from 'react';
import { useAppDispatch } from "../GlobalRedux/hooks";
import { setSearchQuery } from '../GlobalRedux/features/searchQuerySlice';

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQueryValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryValue(event.target.value);
  };

  const handleSearch = () => {
    dispatch(setSearchQuery(searchQuery));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-gray-500 overflow-hidden">
        <div className="grid place-items-center h-full w-12 pr-1 text-gray-300">
          <button className="ml-2" onClick={handleSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        <input
          className="peer h-full w-full outline-none text-sm text-gray-400"
          type="text"
          id="search"
          placeholder="Buscar Producto..."
          value={searchQuery}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />

      </div>
    </div>
  );
};

export default SearchBar;