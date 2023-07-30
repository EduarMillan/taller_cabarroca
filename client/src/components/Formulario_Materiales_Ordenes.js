
import {
  saveMaterialTrabajosRealizados,
  UpdateMaterialTrabajosRealizados,
} from "../api";
import { Button, TextField } from "@material-ui/core";
import {
  Card,
  Grid,
  Typography
} from "@mui/material";
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

export default function Formulario_Materiales_Ordenes() {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [EspesoresM1, setEspesoresM1] = React.useState("");
  const [Colores1, setColores1] = React.useState("");

  const params = useParams();

  //--------------------materiales trabajos realizados----------------------------------------
  const [id_orden, setIdOrden] = useState("");
  const [nombre, setNombreM] = useState("");
  const [espesor, setEspesor] = useState("");
  const [color, setColor] = useState("");
  const [descripcion, setDescripcionM] = useState("");
  const [medida_largo, setMedidaLargo] = useState("");
  const [medida_ancho, setMedidaAncho] = useState("");
  const [precio_largo, setPrecioLargo] = useState("");
  const [precio_m2, setPrecioM2] = useState("");
  const [precio_total, setPrecioTotal] = useState("");
  const [filas, setFilas] = useState([]);

  const handleChangeMO = (event) => {
    event.preventDefault();
    setColores1(event.target.value);
    setEspesoresM1(event.target.value);
    setNombreM(event.target.value);
    /*setmaterialesOrdenes({
      ...materialesOrdenes,
      [event.target.name]: event.target.value,
    });*/
  };

  const handleSubmit = (event) => {
    if (
      nombre &&
      espesor &&
      color &&
      descripcion &&
      medida_largo &&
      medida_ancho &&
      precio_largo &&
      precio_m2 &&
      precio_total
    ) {
      const newFilas = [
        ...filas,
        {
          nombre,
          espesor,
          color,
          descripcion,
          medida_largo,
          medida_ancho,
          precio_largo,
          precio_m2,
          precio_total,
        },
      ];

      setFilas(newFilas);
      try {
        if (editing) {
          //navigate("/dashboard/trabajosrealizados");
          UpdateMaterialTrabajosRealizados(id_orden, newFilas); //revisar esta logica del id
        } else {
          // navigate("/dashboard/trabajosrealizados");
          saveMaterialTrabajosRealizados(newFilas[newFilas.length - 1]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    event.preventDefault();
    setFilas([
      ...filas,
      {
        id_orden,
        nombre,
        espesor,
        color,
        descripcion,
        medida_largo,
        medida_ancho,
        precio_largo,
        precio_m2,
        precio_total,
      },
    ]);
    setIdOrden("");
    setNombreM("");
    setEspesor("");
    setColor("");
    setDescripcionM("");
    setMedidaLargo("");
    setMedidaAncho("");
    setPrecioLargo("");
    setPrecioM2("");
    setPrecioTotal("");
  };

  const handleDelete = (index) => {
    const updatedFilas = [...filas];
    updatedFilas.splice(index, 1);
    setFilas(updatedFilas);
  };

  const handleEdit = (index) => {
    const fila = filas[index];
    setIdOrden(fila.idOrden);
    setNombreM(fila.nombre);
    setEspesor(fila.espesor);
    setColor(fila.color);
    setDescripcionM(fila.descripcion);
    setMedidaLargo(fila.medidaLargo);
    setMedidaAncho(fila.medidaAncho);
    setPrecioLargo(fila.precioLargo);
    setPrecioM2(fila.precioM2);
    setPrecioTotal(fila.precioTotal);
    handleDelete(index);
  };

  return (
    <Grid container direction="column" alignItems="top" justifyContent="center">
      {/*contine todo el panel */}

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

        <form className={classes.root} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Nombre del Material"
            select
            sx={{ display: "block", margin: ".5rem 0" }}
            value={nombre}
            onChange={(event) => setNombreM(event.target.value)}
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
            label="Espesor"
            select
            sx={{ display: "block", margin: ".5rem 0" }}
            value={espesor}
            onChange={(event) => setEspesor(event.target.value)}
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
            select
            sx={{ display: "block", margin: ".5rem 0" }}
            value={color}
            onChange={(event) => setColor(event.target.value)}
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
            sx={{ display: "block", margin: ".5rem 0" }}
            value={descripcion}
            onChange={(event) => setDescripcionM(event.target.value)}
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
          />
          <TextField
            variant="outlined"
            label="Medida Largo"
            type="number"
            sx={{ display: "block", margin: ".5rem 0" }}
            value={medida_largo}
            onChange={(event) => setMedidaLargo(event.target.value)}
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
          />

          <TextField
            variant="outlined"
            label="Medida Ancho"
            type="number"
            sx={{ display: "block", margin: ".5rem 0" }}
            value={medida_ancho}
            onChange={(event) => setMedidaAncho(event.target.value)}
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
          />
          <TextField
            variant="outlined"
            label="Precio Largo"
            type="number"
            sx={{ display: "block", margin: ".5rem 0" }}
            value={precio_largo}
            onChange={(event) => setPrecioLargo(event.target.value)}
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
          />
          <TextField
            variant="outlined"
            label="Precio M2"
            type="number"
            sx={{ display: "block", margin: ".5rem 0" }}
            value={precio_m2}
            onChange={(event) => setPrecioM2(event.target.value)}
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
          />
          <TextField
            variant="outlined"
            label="Precio Total"
            type="number"
            sx={{ display: "block", margin: ".5rem 0" }}
            value={precio_total}
            onChange={(event) => setPrecioTotal(event.target.value)}
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ padding: "12px", margin: "12px" }}
          >
            Agregar
          </Button>
        </form>
      </Card>
      <div>&nbsp;</div>
    </Grid>
  );
}
