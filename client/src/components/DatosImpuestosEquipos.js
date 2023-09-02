import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getTrabajoRealizado } from "../api";
import { useParams } from "react-router-dom";
import { useMaterialContext } from "./MaterialContext";


export default function DatosImpuestosEquipos() {

  const { shouldReload } = useMaterialContext();
  const [trabajo, setTrabajo] = useState();
  const params = useParams();

  const loadTrabajo = async () => {
    try {
      const data = await getTrabajoRealizado(params.id);
      setTrabajo(data);
    } catch (error) {
      console.error("Error al cargar el trabajo:", error);
    }
  };

  useEffect(() => {
    loadTrabajo();
    
  },[shouldReload]);

  return (
      <Grid container alignItems={"center"} paddingBottom={1} >
      {" "}
      {/*Contiende los datos de los impuestos, utilidad y demas datos */}
      <Grid
        item
        xs={2.4}
        backgroundColor="transparent"
        borderBottom={1}
        borderColor="red"
      >
        <h5>
          Impuestos ONAT: {trabajo ? trabajo[0].impuesto_onat : "Cargando..."}
        </h5>
      </Grid>
      <Grid
        item
        xs={2.4}
        backgroundColor="transparent"
        borderBottom={1}
        borderColor="yellow"
      >
        <h5>Imp. Repres.:  {trabajo ? trabajo[0].impuesto_representacion : "Cargando..."}</h5>
      </Grid>
      <Grid
        item
        xs={2.4}
        backgroundColor="transparent"
        borderBottom={1}
        borderColor="blue"
      >
        <h5>% Equipos:  {trabajo ? trabajo[0].impuesto_equipos : "Cargando..."}</h5>
      </Grid>
      <Grid
        item
        xs={2.4}
        backgroundColor="transparent"
        borderBottom={1}
        borderColor="orange"
      >
        <h5>Costo Total:  {trabajo ? trabajo[0].costo_total : "Cargando..."}</h5>
      </Grid>
      <Grid
        item
        xs={2.4}
        backgroundColor="transparent"
        borderBottom={1}
        borderColor="green"
      >
        <h5>Utilidad:  {trabajo ? trabajo[0].utilidad : "Cargando..."} </h5>
      </Grid>
    </Grid>);   
}
