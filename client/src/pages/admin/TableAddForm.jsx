import React, { useState } from 'react';
import { useAddTableMutation } from '../../api/tableSlice';

const TableAddForm = () => {
  const [tableNumber, setTableNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [addTable, { isLoading, isError, isSuccess, error }] = useAddTableMutation(); // Using RTK Query mutation hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tableNumber || !capacity) {
      alert('Please provide both table number and capacity.');
      return;
    }

    try {
      await addTable({ tableNumber, capacity }).unwrap();
    } catch (err) {
      console.error('Error adding table:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Table</h2>

      {isSuccess && (
        <div className="bg-green-200 p-2 mb-4 text-green-800">
          Table added successfully!
        </div>
      )}
      {isError && (
        <div className="bg-red-200 p-2 mb-4 text-red-800">
          Error: {error?.data?.message || 'Something went wrong!'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="tableNumber" className="block font-medium">Table Number</label>
          <input
            type="number"
            id="tableNumber"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="capacity" className="block font-medium">Capacity</label>
          <input
            type="number"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className={`mt-4 px-4 py-2 text-white rounded ${isLoading ? 'bg-gray-500' : 'bg-blue-500'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Table'}
        </button>
      </form>
    </div>
  );
};

export default TableAddForm;
