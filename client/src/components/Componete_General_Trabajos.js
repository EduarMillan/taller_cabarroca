import Formulario_Trabajo_Realizado from "./Formulario_Trabajo_Realizado";
import { Grid } from "@mui/material";
import Datos_Impuestos_Equipos from "./Datos_Impuestos_Equipos";
import Lista_Materiales_Ordenes from "./Lista_Materiales_Ordenes";
import Formulario_Materiales_Ordenes from "./Formulario_Materiales_Ordenes";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MaterialProvider } from "./MaterialContext";

export default function Componete_General_Trabajos() {
  const [editar, setEditar] = useState(false);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setEditar(true);
    }
  }, [params.id]);

  return (
    <MaterialProvider>
      {editar ? (
        <Grid
          container
          direction="column"
          alignItems="top"
          justifyContent="center"
        >
          <Datos_Impuestos_Equipos />

          <Formulario_Trabajo_Realizado />

          <Lista_Materiales_Ordenes />
        </Grid>
      ) : (
        <Grid
          container
          direction="column"
          alignItems="top"
          justifyContent="center"
        >
          <Formulario_Trabajo_Realizado />
          
        </Grid>
      )}
    </MaterialProvider>
  );
}
