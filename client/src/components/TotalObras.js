import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { MapsHomeWork } from "@mui/icons-material";

export default function TotalObras() {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4"> Total de Obras Realizadas</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MapsHomeWork sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
        <Typography variant="h4">20</Typography>
      </Box>
    </Paper>
  );
}
