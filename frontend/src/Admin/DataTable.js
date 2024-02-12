import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({ rows, columns, loading, sx }) => {
  const [pageSize, setPageSize] = useState(2);

  function generateRandom() {
    var length = 8,
      charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      retVal = '';
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      sx={sx}
      checkboxSelection
      pagination
      pageSize={pageSize}
      getRowId={(row) => generateRandom()}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[2, 5, 10]}
    />
  );
};

export default DataTable;
