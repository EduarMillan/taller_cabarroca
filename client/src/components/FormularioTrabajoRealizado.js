import moment from "moment";
import { Button, TextField } from "@material-ui/core";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  saveTrabajosRealizados,
  getTrabajoRealizado,
  UpdateTrabajoRealizado,
} from "../api";
import { useParams, useNavigate } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import {
  currencies,
  currencies1,
  entidad,
} from "../CaracteristicasMateriales/DatosMateriales";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function FormularioTrabajoRealizado(route) {
  const classes = useStyles();

  const params = useParams();

  const [trabajo, setTrabajo] = useState({
    nombre: "",
    descripcion: "",
    pago_efectivo: "",
    precio: "",
    fecha: new Date().toISOString().slice(0, 16),
    otros_gastos_descripcion: "",
    costo_otros_gastos: "",
    impuesto_representacion: "",
    impuesto_onat: "",
    impuesto_equipos: "",
    costo_total: "",
    utilidad: "",
    facturado: "",
    entidad: "",
  });

  const [loading2, setLoading2] = useState(false);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const handledSubmit = async (e) => {
    e.preventDefault();
    setLoading2(true);
    try {
      if (editing) {
        //navigate("/dashboard/trabajos_realizados");
        await UpdateTrabajoRealizado(params.id, trabajo);
      } else {
        navigate("/dashboard/trabajos_realizados");
        await saveTrabajosRealizados(trabajo);
      }
      setLoading2(false); //detengo el circular progress
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setTrabajo({ ...trabajo, [e.target.name]: e.target.value });
  };

  const loadTrabajos = async (id) => {
    const data = await getTrabajoRealizado(id);
    setTrabajo(...data);
  };

  useEffect(() => {
    if (params.id) {
      setEditing(true);
      loadTrabajos(params.id);
    }
  }, [params.id]);

  const fechaIncorrecta = trabajo.fecha; //aqui capturo la fecha con formato incorrecto
  const fechaCorrecta = moment(fechaIncorrecta).format("YYYY-MM-DDThh:mm"); //doy formato correcto a la fecha

  return (
    <Grid container direction="column" alignItems="top" justifyContent="center">
      <Typography
          variant="5"
          textAlign="center"
          color="inherit"
          backgroundColor="green"
          padding={0.5}
        >
           {editing ? "Actualizar Trabajo" : "Insertar Trabajo"}
        </Typography>
        <Card
          style={{
            backgroundColor: "transparent",
            padding: ".5rem",
            color: "inherit",
            marginRight: "0.5rem",
          }}
        >
          <CardContent>
            <form className={classes.root} onSubmit={handledSubmit}>
              <TextField
                variant="outlined"
                label="Nombre"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                  backgroundColor: "lightblue",
                }}
                name="nombre"
                value={trabajo.nombre}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "inherit" } }}
                InputProps={{
                  style: {
                    color: "inherit",
                  },
                }}
              />

              <TextField
                variant="outlined"
                label="Descripcion"
                multiline
                rows={1}
                sx={{ display: "block", margin: ".5rem 0" }}
                name="descripcion"
                value={trabajo.descripcion}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "inherit" } }}
                InputProps={{
                  style: {
                    color: "inherit",
                  },
                }}
              />

              <TextField
                variant="outlined"
                label="Tipo de Pago"
                select
                sx={{ display: "block", margin: ".5rem 0" }}
                name="pago_efectivo"
                value={trabajo.pago_efectivo + ""}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "inherit" } }}
                InputProps={{
                  style: {
                    color: "inherit",
                  },
                }}
              >
                {currencies1.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                variant="outlined"
                label="Precio (MN)"
                type="number"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="precio"
                value={trabajo.precio + ""}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "inherit" } }}
                InputProps={{
                  style: {
                    color: "inherit",
                  },
                }}
              />

              <TextField
                variant="outlined"
                label="Fecha"
                type="datetime-local"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="fecha"
                value={fechaCorrecta}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "inherit" } }}
                InputProps={{
                  style: {
                    color: "inherit",
                  },
                }}
              />
              <TextField
                variant="outlined"
                label="Otros Gastos Descrip."
                sx={{ display: "block", margin: ".5rem 0" }}
                name="otros_gastos_descripcion"
                value={trabajo.otros_gastos_descripcion}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "inherit" } }}
                InputProps={{
                  style: {
                    color: "inherit",
                  },
                }}
              />

              <TextField
                variant="outlined"
                label="Costo Otros Gastos"
                type="number"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="costo_otros_gastos"
                value={trabajo.costo_otros_gastos + ""}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "inherit" } }}
                InputProps={{
                  style: {
                    color: "inherit",
                  },
                }}
              />

              <TextField
                variant="outlined"
                select
                label="Facturado"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="facturado"
                value={trabajo.facturado}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "inherit" } }}
                InputProps={{
                  style: {
                    color: "inherit",
                  },
                }}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                variant="outlined"
                select
                label="Entidad"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="entidad"
                value={trabajo.entidad}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "inherit" } }}
                InputProps={{
                  style: {
                    color: "inherit",
                  },
                }}
              >
                {entidad.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{
                  padding: "12px",
                  margin: "12px",
                }}
                disabled={
                  !trabajo.nombre ||
                  !trabajo.descripcion ||
                  !(trabajo.pago_efectivo || trabajo.pago_efectivo === 0) ||
                  !trabajo.fecha ||
                  !trabajo.precio ||
                  !trabajo.otros_gastos_descripcion ||
                  !trabajo.costo_otros_gastos ||
                  !(trabajo.facturado || trabajo.facturado === 0) ||
                  !trabajo.entidad
                }
              >
                {loading2 ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Salvar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
    </Grid>
  );
}
