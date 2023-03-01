import { Group, MapsHomeWork } from "@mui/icons-material";
import { Box, Divider, List, Paper, Typography } from "@mui/material";
import Grafico_Barras from "./Grafico_Barras";
import Grafico_Circular_Medio from "./Grafico_Circular_Medio";
import React from "react";

export default function Inicio() {
  return (
    <Box
      sx={{
        display: { xs: "flex", md: "grid" },
        gridTemplateColumns: "repeat(3,1fr)",
        gridAutoRows: "minmax(100px, auto)",
        gap: 3,
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4"> Total Planchas PVC</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">10</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4"> Total Planchas Acrilico</Typography>
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
      <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: "1/3" }}>
        <Box>
          <Typography variant="h4"> Trabajos sin facturar</Typography>
          <List>
            <h4>Trabajo 1</h4>
            <h4>Trabajo 2</h4>
            <h4>Trabajo 3</h4>
            <h4>Trabajo 4</h4>
          </List>
        </Box>
        <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
        <Box>
          <Typography variant="h4"> Otros Trabajos</Typography>
          <List>
            <h4>Trabajo 1</h4>
            <h4>Trabajo 2</h4>
            <h4>Trabajo 3</h4>
            <h4>Trabajo 4</h4>
          </List>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4"> Comparacion por Trimestres</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grafico_Barras />
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4"> Trabajos por clientes</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grafico_Circular_Medio />
        </Box>
      </Paper>
    </Box>
  );
}
