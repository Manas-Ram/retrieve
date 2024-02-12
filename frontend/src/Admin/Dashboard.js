import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Stack direction="column" spacing={2} alignItems="center" sx={{ mt: 10, mb: 20 }}>
      <Button variant='contained'sx={{ width: 300 }}  onClick={() => navigate('/usertable')}>
        UsersList
      </Button>
      <Button variant='contained'  sx={{ width: 300 }} onClick={() => navigate('/foundtable')}>
        FoundTable
      </Button>
      <Button variant='contained' sx={{ width: 300 }} onClick={() => navigate('/losttable')}>
        LostTable
      </Button>
      <Button variant='contained'sx={{ width: 300 }} onClick={() => navigate('/collectedtable')}>
        CollectedTable
      </Button>
    </Stack>
  );
}

export default Dashboard;
