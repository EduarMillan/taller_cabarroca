import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, List, Divider } from "@mui/material";
import { getTrabajosRealizados } from "../api";

export default function TrabajosSinFacturar() {
  const [trabajos, setTrabajos] = useState([]);

const loadTrabajos = async () => {
  const datos = await getTrabajosRealizados();
  const trabajosSinFacturar = datos.filter((trabajo) => trabajo.facturado === 0);
  
  if (trabajosSinFacturar.length === 0) {
    setTrabajos(["No hay Trabajo sin facturar"]);
  } else {
    const nombresTrabajos = trabajosSinFacturar.map((trabajo) => trabajo.nombre);
    setTrabajos(nombresTrabajos);
  }
};

useEffect(() => {
  loadTrabajos();
}, []);


  return (
    <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: "1/3" }}>
      <Box>
        <Typography variant="h4"> Trabajos sin facturar</Typography>
        <List>
          <h4>{trabajos[0]}</h4>
          <h4>{trabajos[1]}</h4>
          <h4>{trabajos[2]}</h4>
          <h4>{trabajos[3]}</h4>
          
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
  );
}
