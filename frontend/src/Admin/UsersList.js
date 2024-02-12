// src/components/Users.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from './DataTable';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const columns = [
    { field: 'id', headerName: 'User ID', width: 150 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    { field: 'role', headerName: 'Role', width: 200 },
  ];
  const userTableStyles = {
    height: '650px',
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3010/admin/users/adminuser'
        );
        console.log(response);
        setUsers(response);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users List</h2>

      {error && <p className='error'>{error}</p>}
      {users ? (
        <>
          {' '}
          <DataTable
            rows={users}
            columns={columns}
            loading={!users.length}
            sx={userTableStyles}
          />
        </>
      ) : (
        <h1>No users found.</h1>
      )}
    </div>
  );
};

export default UserList;
