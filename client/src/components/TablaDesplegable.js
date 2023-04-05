
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import {
  IconButton,
  Card,
  Grid,
 
} from "@mui/material";
import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";

const ColoresM = [
  {
    value: "Blanco",
    label: "Blanco",
  },
  {
    value: "Negro",
    label: "Negro",
  },
];

const EspesoresM = [
  {
    value: "1mm",
    label: "1mm",
  },
  {
    value: "2mm",
    label: "2mm",
  },
  
];

const materialesRegistrados = [
  {
    value: "PVC",
    label: "PVC",
  },
  {
    value: "Acrilico",
    label: "Acrilico",
  },
];

export default function Formulario_Trabajos(route) {
  const [EspesoresM1, setEspesoresM1] = React.useState("");
  const [Colores1, setColores1] = React.useState("");
  const [MaterialesRegistrados1, setMaterialesRegistrados1] = React.useState("");

  //------------------------------------------------------------
  const [idOrden, setIdOrden] = useState("");
  const [nombreM, setNombreM] = useState("");
  const [espesor, setEspesor] = useState("");
  const [color, setColor] = useState("");
  const [descripcionM, setDescripcionM] = useState("");
  const [medidaLargo, setMedidaLargo] = useState("");
  const [medidaAncho, setMedidaAncho] = useState("");
  const [precioLargo, setPrecioLargo] = useState("");
  const [precioM2, setPrecioM2] = useState("");
  const [precioTotal, setPrecioTotal] = useState("");
  const [filas, setFilas] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFilas([
      ...filas,
      {
        idOrden,
        nombreM,
        espesor,
        color,
        descripcionM,
        medidaLargo,
        medidaAncho,
        precioLargo,
        precioM2,
        precioTotal,
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
  //------------------------------------------------------------
  

  
  const handleChange3 = (event) => {
    setEspesoresM1(event.target.value);
    setEspesor(event.target.value);
  };

  const handleChange4 = (event) => {
    event.preventDefault();
    const nuevoValor = event.target.value;
    setNombreM(nuevoValor);
    setMaterialesRegistrados1(nuevoValor);
  };

  const handleChange5 = (event) => {
    setColores1(event.target.value);
    setColor(event.target.value);
  };



  return (
  
      <Grid container alignItems={"center"} paddingBottom={1}>
      <Grid>
        <Card
          style={{
            backgroundColor: "transparent",
            padding: "0.5rem",
            color: "inherit",
            marginRight: "0.5rem",
          }}
        >
          Materiales Asociados
          <form  onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              label="ID Orden"
              type="number"
              sx={{ display: "block", margin: ".5rem 0" }}
              value={idOrden}
              onChange={(event) => setIdOrden(event.target.value)}
              InputLabelProps={{ style: { color: "inherit" } }}
              InputProps={{ style: { color: "inherit" } }}
            />
            <TextField
              variant="outlined"
              label="Nombre del Material"
              select
              sx={{ display: "block", margin: ".5rem 0" }}
              value={MaterialesRegistrados1}
              onChange={handleChange4}
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
              value={EspesoresM1}
              onChange={handleChange3}
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
              value={Colores1}
              onChange={handleChange5}
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
  value={descripcionM}
  onChange={(event) => setDescripcionM(event.target.value)}
  InputLabelProps={{ style: { color: "inherit" } }}
  InputProps={{ style: { color: "inherit" } }}
/>
            <TextField
              variant="outlined"
              label="Medida Largo"
              type="number"
              sx={{ display: "block", margin: ".5rem 0" }}
              value={medidaLargo}
              onChange={(event) => setMedidaLargo(event.target.value)}
              InputLabelProps={{ style: { color: "inherit" } }}
              InputProps={{ style: { color: "inherit" } }}
            />
            <TextField
              variant="outlined"
              label="Medida Ancho"
              type="number"
              sx={{ display: "block", margin: ".5rem 0" }}
              value={medidaAncho}
              onChange={(event) => setMedidaAncho(event.target.value)}
              InputLabelProps={{ style: { color: "inherit" } }}
              InputProps={{ style: { color: "inherit" } }}
            />
            <TextField
              variant="outlined"
              label="Precio Largo"
              type="number"
              sx={{ display: "block", margin: ".5rem 0" }}
              value={precioLargo}
              onChange={(event) => setPrecioLargo(event.target.value)}
              InputLabelProps={{ style: { color: "inherit" } }}
              InputProps={{ style: { color: "inherit" } }}
            />
            <TextField
              variant="outlined"
              label="Precio M2"
              type="number"
              sx={{ display: "block", margin: ".5rem 0" }}
              value={precioM2}
              onChange={(event) => setPrecioM2(event.target.value)}
              InputLabelProps={{ style: { color: "inherit" } }}
              InputProps={{ style: { color: "inherit" } }}
            />
            <TextField
              variant="outlined"
              label="Precio Total"
              type="number"
              sx={{ display: "block", margin: ".5rem 0" }}
              value={precioTotal}
              onChange={(event) => setPrecioTotal(event.target.value)}
              InputLabelProps={{ style: { color: "inherit" } }}
              InputProps={{ style: { color: "inherit" } }}
            />

            <Button type="submit" variant="contained" color="primary">
              Agregar
            </Button>
          </form>
        </Card>
      </Grid>
      <div>&nbsp;</div>
      <Grid>
        <Card
          style={{
            backgroundColor: "transparent",
            padding: "0.5rem",
            color: "inherit",
            marginRight: "0.5rem",
          }}
        >
         <TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>ID Orden</TableCell>
        <TableCell>Nombre del Material</TableCell>
        <TableCell>Espesor</TableCell>
        <TableCell>Color</TableCell>
        <TableCell>Descripción</TableCell>
        <TableCell>Medida Largo</TableCell>
        <TableCell>Medida Ancho</TableCell>
        <TableCell>Precio Largo</TableCell>
        <TableCell>Precio M2</TableCell>
        <TableCell>Precio Total</TableCell>
        <TableCell>Acciones</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {filas.map((fila, index) => (
        <TableRow key={index}>
          <TableCell>{fila.idOrden}</TableCell>
          <TableCell>{fila.nombreM}</TableCell>
          <TableCell>{fila.espesor}</TableCell>
          <TableCell>{fila.color}</TableCell>
          <TableCell>{fila.descripcionM}</TableCell>
          <TableCell>{fila.medidaLargo}</TableCell>
          <TableCell>{fila.medidaAncho}</TableCell>
          <TableCell>{fila.precioLargo}</TableCell>
          <TableCell>{fila.precioM2}</TableCell>
          <TableCell>{fila.precioTotal}</TableCell>
          <TableCell>
            <IconButton onClick={() => handleEdit(index)}>
              <AssignmentIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(index)}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

        </Card>
      </Grid>
    </Grid>
  );
  }
