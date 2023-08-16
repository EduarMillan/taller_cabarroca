import {
  Button,
  TextField,
  Grid,
  CardContent,
  Card,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useEffect, useState } from "react";
import { saveMateriales, getMaterial, UpdateMaterial } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import {
  ColoresM,
  EspesoresM,
  materialesRegistrados,
} from "../CaracteristicasMateriales/DatosMateriales";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "30ch",
    },
  },
}));

export default function FormularioMateriales(route) {
  const classes = useStyles();

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
      if (editing) {
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

  const loadMaterial = async (id) => {
    const data = await getMaterial(id);
    setMaterial(...data);
  };

  useEffect(() => {
    if (params.id) {
      setEditing(true);
      loadMaterial(params.id);
    }
  }, [params.id]);

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
          style={{
            padding: "1rem",
            color: "inherit", 
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
    
          }}
        >
          <Typography variant="5" textAlign="center" color="inherit">
            {editing ? "Actualizar Material" : "Insertar Material"}
          </Typography>
          <CardContent>
            <form className={classes.root} onSubmit={handledSubmit}>
              <TextField
                variant="filled"
                label="Nombre"
                name="nombre"
                select
                sx={{ display: "block", margin: ".5rem 0" }}
                value={material.nombre}
                onChange={handleChange}
                InputProps={{ style: { color: "inherit" } }}
                InputLabelProps={{ style: { color: "inherit" } }}
              >
                {materialesRegistrados.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                variant="filled"
                label="Descripcion"
                multiline
                rows={3}
                sx={{ display: "block", margin: ".5rem 0" }}
                name="descripcion"
                value={material.descripcion}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "inherit" } }}
              />

              <TextField
                variant="filled"
                label="Espesor (mm)"
                name="espesor"
                select
                sx={{ display: "block", margin: ".5rem 0" }}
                value={material.espesor}
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
                variant="filled"
                label="Ancho (m)"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="longitud_ancho"
                value={material.longitud_ancho + ""}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "inherit" } }}
              />

              <TextField
                variant="filled"
                label="Largo (m)"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="longitud_largo"
                value={material.longitud_largo + ""}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "inherit" } }}
              />

              <TextField
                variant="filled"
                label="Calidad"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="calidad_material"
                value={material.calidad_material}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "inherit" } }}
              />

              <TextField
                variant="filled"
                label="Costo Total (USD)"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="costo_total"
                value={material.costo_total + ""}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "inherit" } }}
              />

              <TextField
                variant="filled"
                label="Cantidad"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="cantidad"
                value={material.cantidad + ""}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "inherit" } }}
              />

              <TextField
                variant="filled"
                label="Color"
                name="color"
                select
                sx={{ display: "block", margin: ".5rem 0" }}
                value={material.color}
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
