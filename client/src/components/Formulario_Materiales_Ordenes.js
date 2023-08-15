import { useMaterialContext } from "./MaterialContext";
import {
  saveMaterialTrabajosRealizados,
  UpdateMaterialTrabajosRealizados,
} from "../api";
import { Button, TextField } from "@material-ui/core";
import { Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import {
  ColoresM,
  EspesoresM,
  materialesRegistrados,
} from "../CaracteristicasMateriales/DatosMateriales";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Formulario_Materiales_Ordenes({ editedMaterial }) {

  const { setShouldReload } = useMaterialContext();

  if (editedMaterial != null) {
    var editedMaterial1 = editedMaterial;
  }

  const classes = useStyles();
  const params = useParams();

  const [materialOrden, setMaterialOrden] = useState({
    //id:"",
    id_orden: params.id,
    nombre: "",
    espesor: "",
    color: "",
    descripcion: "",
    medida_largo: "",
    medida_ancho: "",
    precio_largo: "",
    precio_m2: "",
    precio_total: "",
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const handledSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editing) {
        UpdateMaterialTrabajosRealizados(materialOrden.id, materialOrden); //revisar esta logica del id
      } else {
        saveMaterialTrabajosRealizados(materialOrden);
      }
      setShouldReload(true);
      setLoading(false);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
    setMaterialOrden({
      //limpio los campos una vez salvados los valores
      ...materialOrden,
      nombre: "",
      espesor: "",
      color: "",
      descripcion: "",
      medida_largo: "",
      medida_ancho: "",
      precio_largo: "",
      precio_m2: "",
      precio_total: "",
    });
  };

  const handleChange = (e) => {
    setMaterialOrden({ ...materialOrden, [e.target.name]: e.target.value });
  };

  /*const loadMaterialOrdenes = async(id) => {
  const data = await getMaterialTrabajosRealizados(id);
   setMaterialOrden(...data);}*/

  useEffect(() => {
    if (editedMaterial1) {
      setEditing(true);
      setMaterialOrden(editedMaterial1);
      //loadMaterialOrdenes(params.id);
    }
  }, [params.id, editedMaterial]);

  return (
    <Grid container direction="column" alignItems="top" justifyContent="center">
      <div>&nbsp;</div>
      <Card
        style={{
          backgroundColor: "transparent",
          padding: "0.5rem",
          color: "inherit",
          marginRight: "0.5rem",
        }}
      >
        <Typography
          variant="5"
          textAlign="center"
          color="inherit"
          backgroundColor="green"
          padding={0.5}
        >
          Materiales Asociados
        </Typography>

        <form className={classes.root} onSubmit={handledSubmit}>
          <TextField
            variant="outlined"
            label="Nombre del Material"
            name="nombre"
            select
            sx={{ display: "block", margin: ".5rem 0" }}
            value={materialOrden.nombre}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
          >
            {materialesRegistrados.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            variant="outlined"
            label="Espesor (mm)"
            name="espesor"
            select
            sx={{ display: "block", margin: ".5rem 0" }}
            value={materialOrden.espesor}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
          >
            {EspesoresM.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            variant="outlined"
            label="Color"
            name="color"
            select
            sx={{ display: "block", margin: ".5rem 0" }}
            value={materialOrden.color}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
          >
            {ColoresM.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            variant="outlined"
            label="Descripción"
            name="descripcion"
            sx={{ display: "block", margin: ".5rem 0" }}
            value={materialOrden.descripcion}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
          />
          <TextField
            variant="outlined"
            label="Medida Largo"
            name="medida_largo"
            type="number"
            sx={{ display: "block", margin: ".5rem 0" }}
            value={materialOrden.medida_largo}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
          />

          <TextField
            variant="outlined"
            label="Medida Ancho"
            name="medida_ancho"
            type="number"
            sx={{ display: "block", margin: ".5rem 0" }}
            value={materialOrden.medida_ancho}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
          />
          <TextField
            variant="outlined"
            label="Precio Largo"
            name="precio_largo"
            type="number"
            sx={{ display: "block", margin: ".5rem 0" }}
            value={materialOrden.precio_largo}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
          />
          <TextField
            variant="outlined"
            label="Precio M2"
            name="precio_m2"
            type="number"
            sx={{ display: "block", margin: ".5rem 0" }}
            value={materialOrden.precio_m2}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
          />
          <TextField
            variant="outlined"
            label="Precio Total"
            name="precio_total"
            type="number"
            sx={{ display: "block", margin: ".5rem 0" }}
            value={materialOrden.precio_total}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ padding: "12px", margin: "12px" }}
          >
            Salvar
          </Button>
        </form>
      </Card>
      <div>&nbsp;</div>
    </Grid>
  );
}
