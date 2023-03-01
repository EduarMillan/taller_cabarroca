import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import React,{ useEffect, useState } from "react";
import { saveMateriales, getMaterial, UpdateMaterial } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function Formulario_Materiales(route) {

  const [material, setMaterial] = useState({
    nombre: "",
    descripcion: "",
    espesor: "",
    longitud_ancho: "",
    longitud_largo: "",
    calidad_material: "",
    costo_total: "",
    cantidad: "",
    color: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const params = useParams();

  const [editing, setEditing] = useState(false);

  const handledSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(editing);
      if (editing)  {
        navigate("/dashboard/materiales");
        await UpdateMaterial(params.id, material);
        
      } else {
        navigate("/dashboard/materiales");
        await saveMateriales(material);
        
      }
      
      setLoading(false);
       
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setMaterial({ ...material, [e.target.name]: e.target.value });
  };

const loadMaterial = async(id) => {
 const data = await getMaterial(id);
  setMaterial(...data);
 
};

  useEffect(() =>{
    if(params.id){
      setEditing(true);
      loadMaterial(params.id);
    }
  },[params.id])

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 1 }}
          style={{ backgroundColor: "transparent", padding: "1rem" , color :'inherit'}}
        >
          <Typography variant="5" textAlign="center" color="inherit">
            {editing ? "Actualizar Material": "Insertar Material"}
            
          </Typography>
          <CardContent>
            <form onSubmit={handledSubmit}>
              <TextField
                variant="filled"
                label="Nombre"
                sx={{ display: "block", margin: ".5rem 0"  }}
                name="nombre"
                value={material.nombre}
                onChange={handleChange}
                inputProps={{ style: { color: "inherit" } }}
                InputLabelProps={{ style: { color: "inherit" } }}
               color='white'
                
              />

              <TextField
                variant="filled"
                label="Descripcion"
                multiline
                rows={4}
                sx={{ display: "block", margin: ".5rem 0" }}
                name="descripcion"
                value={material.descripcion}
                onChange={handleChange}
                inputProps={{ style: { color: "inherit" } }}
                InputLabelProps={{ style: { color: "inherit" } }}
              />

              <TextField
                variant="filled"
                label="Espesor (mm)"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="espesor"
                value={material.espesor + ''}
                onChange={handleChange}
                inputProps={{ style: { color: "inherit" } }}
                InputLabelProps={{ style: { color: "inherit" } }}
              />

              <TextField
                variant="filled"
                label="Ancho (m)"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="longitud_ancho"
                value={material.longitud_ancho + ''}
                onChange={handleChange}
                inputProps={{ style: { color: "inherit" } }}
                InputLabelProps={{ style: { color: "inherit" } }}
              />

              <TextField
                variant="filled"
                label="Largo (m)"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="longitud_largo"
                value={material.longitud_largo + ''}
                onChange={handleChange}
                inputProps={{ style: { color: "inherit" } }}
                InputLabelProps={{ style: { color: "inherit" } }}
              />

              <TextField
                variant="filled"
                label="Calidad"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="calidad_material"
                value={material.calidad_material}
                onChange={handleChange}
                inputProps={{ style: { color: "inherit" } }}
                InputLabelProps={{ style: { color: "inherit" } }}
              />

              <TextField
                variant="filled"
                label="Costo Total"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="costo_total"
                value={material.costo_total + ''}
                onChange={handleChange}
                inputProps={{ style: { color: "inherit" } }}
                InputLabelProps={{ style: { color: "inherit" } }}
              />

              <TextField
                variant="filled"
                label="Cantidad"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="cantidad"
                value={material.cantidad + ''}
                onChange={handleChange}
                inputProps={{ style: { color: "inherit" } }}
                InputLabelProps={{ style: { color: "inherit" } }}
              />

              <TextField
                variant="filled"
                label="Color"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="color"
                value={material.color}
                onChange={handleChange}
                inputProps={{ style: { color: "inherit" } }}
                InputLabelProps={{ style: { color: "inherit" } }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={
                  !material.nombre ||
                  !material.descripcion ||
                  !material.espesor ||
                  !material.longitud_ancho ||
                  !material.longitud_largo ||
                  !material.calidad_material ||
                  !material.costo_total ||
                  !material.cantidad ||
                  !material.color
                }
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                 
                ) : (
                 
                  "Salvar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
