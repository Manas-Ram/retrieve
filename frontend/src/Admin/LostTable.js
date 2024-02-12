import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from './DataTable';

const LostTable = () => {
  const [lostItem, setLostItem] = useState([]);
  const [error, setError] = useState('');

  const columns = [
    { field: 'description', headerName: 'description', width: 150 },
    { field: 'date', headerName: 'date', width: 150 },
    { field: 'category', headerName: 'category', width: 200 },
    { field: 'phone', headerName: ' phone', width: 100 },
    { field: 'sapId', headerName: ' sapId', width: 100 },
    { field: 'subcategory', headerName: 'subcategory', width: 200 },
    { field: 'itemName', headerName: ' itemName', width: 200 },
    { field: 'place', headerName: 'place', width: 200 },
    { field: 'image', headerName: 'image', width: 200 },
  ];
  const userTableStyles = {
    height: '650px',
  };

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3010/admin/lost/adminlost'
        );
        console.log(response.data);
        setLostItem(response.data);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error(err);
      }
    };

    fetchLostItems();
  }, []);

  return (
    <div>
      <h2>Lost Items Table</h2>

      {error && <p className='error'>{error}</p>}
      {lostItem ? (
        <DataTable
          rows={lostItem}
          columns={columns}
          loading={!lostItem.length}
          sx={userTableStyles}
        />
      ) : (
        <div> No lost itemsd</div>
      )}
    </div>
  );
};

export default LostTable;
