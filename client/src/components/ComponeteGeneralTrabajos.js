import FormularioTrabajoRealizado from "./FormularioTrabajoRealizado";
import { Grid } from "@mui/material";
import DatosImpuestosEquipos from "./DatosImpuestosEquipos";
import ListaMaterialesOrdenes from "./ListaMaterialesOrdenes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MaterialProvider } from "./MaterialContext";

export default function ComponeteGeneralTrabajos() {
  const [editar, setEditar] = useState(false);

  //const params = useParams();
  const { '*': parametro } = useParams();

  useEffect(() => {
    if (parametro === 'trabajos_realizados/nuevo') {
      setEditar(false);
    } else {
      setEditar(true);
    }
    console.log('aqui esta parametro:',parametro);
  }, [parametro]);
  

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
