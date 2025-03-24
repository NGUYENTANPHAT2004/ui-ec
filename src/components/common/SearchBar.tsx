import React from 'react';

const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="What are you looking for?"
        className="w-40 md:w-64 py-2 px-3 bg-gray-100 rounded-md pr-8 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
