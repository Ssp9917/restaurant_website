import React, { useState } from 'react';

const SortDropdown = ({ onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSort = (order, key) => {
    onSortChange(order, key);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
      >
        Sort
      </button>
      {isOpen && (
        <ul className="absolute top-10 left-0 w-40 bg-white shadow-lg rounded-lg py-2 text-sm">
          <li
            onClick={() => handleSort('asc', 'name')}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
          >
            A to Z
          </li>
          <li
            onClick={() => handleSort('desc', 'name')}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
          >
            Z to A
          </li>
          <li
            onClick={() => handleSort('asc', 'price')}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
          >
            Low to High
          </li>
          <li
            onClick={() => handleSort('desc', 'price')}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
          >
            High to Low
          </li>
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
