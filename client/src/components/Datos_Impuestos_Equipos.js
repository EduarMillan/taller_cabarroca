import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Datos_Impuestos_Equipos() {
  return (
    <Grid container alignItems={"center"} paddingBottom={1}>
      {" "}
      {/*Contiende los datos de los impuestos, utilidad y demas datos */}
      <Grid
        item
        xs={2.4}
        backgroundColor="transparent"
        borderBottom={1}
        borderColor="red"
      >
        <h5>Impuestos ONAT:</h5>
      </Grid>
      <Grid
        item
        xs={2.4}
        backgroundColor="transparent"
        borderBottom={1}
        borderColor="yellow"
      >
        <h5>Imp. Repres.:</h5>
      </Grid>
      <Grid
        item
        xs={2.4}
        backgroundColor="transparent"
        borderBottom={1}
        borderColor="blue"
      >
        <h5>% Equipos:</h5>
      </Grid>
      <Grid
        item
        xs={2.4}
        backgroundColor="transparent"
        borderBottom={1}
        borderColor="orange"
      >
        <h5>Costo Total:</h5>
      </Grid>
      <Grid
        item
        xs={2.4}
        backgroundColor="transparent"
        borderBottom={1}
        borderColor="green"
      >
        <h5>Utilidad: </h5>
      </Grid>
    </Grid>
  );
}
