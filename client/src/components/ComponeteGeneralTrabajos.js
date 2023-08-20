import FormularioTrabajoRealizado from "./FormularioTrabajoRealizado";
import { Grid } from "@mui/material";
import DatosImpuestosEquipos from "./DatosImpuestosEquipos";
import ListaMaterialesOrdenes from "./ListaMaterialesOrdenes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MaterialProvider } from "./MaterialContext";

export default function ComponeteGeneralTrabajos() {
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
          <DatosImpuestosEquipos />

          <FormularioTrabajoRealizado />

          <ListaMaterialesOrdenes />
        </Grid>
      ) : (
        <Grid
          container
          direction="column"
          alignItems="top"
          justifyContent="center"
        >
          <FormularioTrabajoRealizado />
          
        </Grid>
      )}
    </MaterialProvider>
  );
}
