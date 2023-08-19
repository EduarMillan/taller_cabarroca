import { Box } from "@mui/material";
import GraficoBarras from "./GraficoBarras";
import GraficoCircularMedio from "./GraficoCircularMedio";
import React from "react";
import TotalClientes from "./TotalClientes";
import TotalObras from "./TotalObras";
import TrabajosSinFacturar from "./TrabajosSinFacturar";
import GraficoObras from "./GraficoObras";

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
      <TotalClientes />

      <TotalObras />

      <TrabajosSinFacturar />

      <GraficoBarras />

      <GraficoCircularMedio />
    </Box>
  );
}
