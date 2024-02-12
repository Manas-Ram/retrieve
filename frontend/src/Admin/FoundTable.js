import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from './DataTable';

const FoundTable = () => {
  const [foundItem, setFoundItem] = useState([]);
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
    const fetchFoundItems = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3010/admin/found/adminfound'
        );
        console.log(response.data)
        setFoundItem(response.data);
        
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error(err);
      }
    };

    fetchFoundItems();
  }, []);

  return (
    <div>
      <h2>Found Items Table</h2>
    
      {error && <p className='error'>{error}</p>}
      {foundItem ?
      <DataTable
        rows={foundItem}
        columns={columns}
        loading={!foundItem.length}
        sx={userTableStyles}
      />:<div> No found items</div>}
    </div>
  );
};

export default FoundTable;
