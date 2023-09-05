import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getTrabajoRealizado } from "../api";
import { useParams } from "react-router-dom";
import { useMaterialContext } from "./MaterialContext";
import  '../styles/datosImpuestosEquipos.css'


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
      <Grid  className="container" >
      <Grid className="imp_onat" >
        <h4>Impuestos ONAT:  {trabajo ? trabajo[0].impuesto_onat : "Cargando..."}</h4>
      </Grid>
      <Grid className="imp_rep" >
        <h4>Imp. Repres.:  {trabajo ? trabajo[0].impuesto_representacion : "Cargando..."}</h4>
      </Grid>
      <Grid className="imp_equipo" >
        <h4>% Equipos:  {trabajo ? trabajo[0].impuesto_equipos : "Cargando..."}</h4>
      </Grid>
      <Grid className="costo" >
        <h4>Costo Total:  {trabajo ? trabajo[0].costo_total : "Cargando..."}</h4>
      </Grid>
      <Grid className="utilidad" >
        <h4>Utilidad:  {trabajo ? trabajo[0].utilidad : "Cargando..."} </h4>
      </Grid>
    </Grid>
    );   
}
