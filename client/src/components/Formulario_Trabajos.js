import moment from "moment";
import {
  saveMaterialTrabajosRealizados,
  UpdateMaterialTrabajosRealizados,
} from "../api";
import {
  Button,
  TextField,
} from "@material-ui/core";
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
import { useParams } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import {ColoresM, EspesoresM, currencies, currencies1, materialesRegistrados} from '../CaracteristicasMateriales/DatosMateriales'
import Datos_Impuestos_Equipos from "./Datos_Impuestos_Equipos";
import Lista_Materiales_Ordenes from "./Lista_Materiales_Ordenes"

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Formulario_Trabajos(route) {
  
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("NoFacturado");
  const [currency1, setCurrency1] = React.useState("NoEfectivo");
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
      const newFilas = [...filas,
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
      setLoading1(true);
      try {
        if (editing1) {
          //navigate("/dashboard/trabajosrealizados");
          UpdateMaterialTrabajosRealizados(id_orden, newFilas); //revisar esta logica del id
        } else {
          // navigate("/dashboard/trabajosrealizados");
          saveMaterialTrabajosRealizados(newFilas[newFilas.length - 1]);
          
        }
        setLoading1(false);
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

  //-------------------------trabajos realizados-------------------------------------------------
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
  });

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editing1, setEditing1] = useState(false);

  const handledSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        //navigate("/dashboard/trabajosrealizados");
        await UpdateTrabajoRealizado(params.id, trabajo);
      } else {
        // navigate("/dashboard/trabajosrealizados");
        await saveTrabajosRealizados(trabajo);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setTrabajo({ ...trabajo, [e.target.name]: e.target.value });
  };

  const handleChange1 = (event) => {
    setCurrency(event.target.value);
    setTrabajo({ ...trabajo, [event.target.name]: event.target.value });
  };

  const handleChange2 = (event) => {
    setCurrency1(event.target.value);
    setTrabajo({ ...trabajo, [event.target.name]: event.target.value });
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

  //------------------------------------------------------------

  const fechaIncorrecta = trabajo.fecha; //aqui capturo la fecha con formato incorrecto
  const fechaCorrecta = moment(fechaIncorrecta).format("YYYY-MM-DDThh:mm"); //doy formato correcto a la fecha
  //----------------------------------------------------------------------------------------------------
  return (
    <Grid container direction="column" alignItems="top" justifyContent="center">{/*contine todo el panel */}
    <Datos_Impuestos_Equipos/>

      <Grid>
        <Card
          style={{
            backgroundColor: "transparent",
            padding: ".5rem",
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
            {editing ? "Actualizar Trabajo" : "Insertar Trabajo"}
          </Typography>
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
                value={trabajo.pago_efectivo} //{currency1} //{trabajo.pago_efectivo}
                onChange={handleChange2}
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
                label="Facturado?"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="facturado"
                value={trabajo.facturado}
                onChange={handleChange1}
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
                  !trabajo.pago_efectivo ||
                  !trabajo.fecha ||
                  !trabajo.precio ||
                  !trabajo.otros_gastos_descripcion ||
                  !trabajo.costo_otros_gastos ||
                  !trabajo.facturado
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

            <Button type="submit" variant="contained" color="primary" style={{padding: "12px", margin:"12px",}}>
              Agregar
            </Button>
          </form>
        </Card>
      </Grid>
      <div>&nbsp;</div>
                <Lista_Materiales_Ordenes/>
    </Grid>
  );
}
