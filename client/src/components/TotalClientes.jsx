import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Group } from '@mui/icons-material';

export default function TotalClientes() {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5"> TOTAL DE CLIENTES</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Group sx={{
          height: 100, width: 100, opacity: 0.3, mr: 1,
        }}
        />
        <Typography variant="h4">10</Typography>
      </Box>
    </Paper>
  );
}
