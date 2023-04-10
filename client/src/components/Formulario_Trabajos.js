import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { EliminarMaterial, getMaterialesTrabajosRealizados, getMaterialTrabajosRealizados, saveMaterialTrabajosRealizados, UpdateMaterialTrabajosRealizados } from "../api";
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
import { useNavigate, useParams } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";


const ColoresM = [
  {
    value: "Blanco",
    label: "Blanco",
  },
  {
    value: "Negro",
    label: "Negro",
  },
  {
    value: "Azul",
    label: "Azul",
  },
  {
    value: "Amarillo",
    label: "Amarillo",
  },
  {
    value: "Rojo",
    label: "Rojo",
  },
  {
    value: "Dorado",
    label: "Dorado",
  },
  {
    value: "Esmerilado",
    label: "Esmerilado",
  },
  {
    value: "Plateado",
    label: "Plateado",
  },
  {
    value: "Transparente",
    label: "Transparente",
  },
  {
    value: "Verde",
    label: "Verde",
  },
  {
    value: "Anaranjado",
    label: "Anaranjado",
  },
  {
    value: "Carmelita",
    label: "Carmelita",
  },
  {
    value: "Morado",
    label: "Morado",
  },
  {
    value: "Gris",
    label: "Gris",
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
  {
    value: "3mm",
    label: "3mm",
  },
  {
    value: "4mm",
    label: "4mm",
  },
  {
    value: "5mm",
    label: "5mm",
  },
  {
    value: "8mm",
    label: "8mm",
  },
  {
    value: "10mm",
    label: "10mm",
  },
  {
    value: "15mm",
    label: "15mm",
  },
  {
    value: "19mm",
    label: "19mm",
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
  {
    value: "Bicapa",
    label: "Bicapa",
  },
  {
    value: "Glaspa",
    label: "Glaspa",
  },
  {
    value: "Playwood",
    label: "Playwood",
  },
  {
    value: "AluminioAnodizado",
    label: "Aluminio Anodizado",
  },
  {
    value: "GomaRubber",
    label: "Goma Rubber",
  },
  {
    value: "SmartX",
    label: "Smart X",
  },
  {
    value: "Espejo",
    label: "Espejo",
  },
  {
    value: "Vidrio",
    label: "Vidrio",
  },
  {
    value: "Madera",
    label: "Madera",
  },
  {
    value: "ZincGalvanizado",
    label: "Zinc Galvanizado",
  },
  {
    value: "ViniloBlancoBrillo",
    label: "Vinilo Blanco Brillo",
  },
  {
    value: "ViniloBlancoMate",
    label: "Vinilo Blanco Mate",
  },
  {
    value: "ViniloTransparenteBrillo",
    label: "Vinilo Transparente Brillo",
  },
  {
    value: "ViniloTransparenteMate",
    label: "Vinilo Transparente Mate",
  },
  {
    value: "VinilodeCorte",
    label: "Vinilo de Corte",
  },
  {
    value: "Laminado",
    label: "Laminado",
  },
  {
    value: "Papel",
    label: "Papel",
  },
  {
    value: "LonaBanner",
    label: "Lona Banner",
  },
  {
    value: "LonaMesh",
    label: "Lona Mesh",
  },
  {
    value: "Esmerilado",
    label: "Esmerilado",
  },
  {
    value: "Microperforado",
    label: "Microperforado",
  },
  {
    value: "Lienzo",
    label: "Lienzo",
  },
  {
    value: "Tela",
    label: "Tela",
  },
];

const currencies = [
  {
    value: "Facturado",
    label: "Facturado",
  },
  {
    value: "NoFacturado",
    label: "Sin Facturar",
  },
];

const currencies1 = [
  {
    value: "Efectivo",
    label: "Pago en Efectivo",
  },
  {
    value: "NoEfectivo",
    label: "Pago por Contrato",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Formulario_Trabajos(route) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("NoFacturado");
  const [currency1, setCurrency1] = React.useState("NoEfectivo");
  const [EspesoresM1, setEspesoresM1] = React.useState("");
  const [Colores1, setColores1] = React.useState("");
 
  const params = useParams();
  
  //--------------------materiales trabajos realizados----------------------------------------
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

  const [materialesOrdenes, setmaterialesOrdenes] = useState({
    idOrden: '',
    nombreM: '',
    espesor: '',
    color: '',
    descripcionM: '',
	  medidaLargo: '',
	  medidaAncho: '',
	  precioLargo: '',
	  precioM2: '',
	  precioTotal: '',
  });

  /*const loadmaterialesOrdenes = async (id) => {
    const datos = await getMaterialTrabajosRealizados(id);
    setmaterialesOrdenes(datos);
  };*/

  /*useEffect(() => {
    loadmaterialesOrdenes();
  }, []);*/

  /*const EjecutaEliminar = async (id) => {
    await EliminarMaterial(id); //arreglar esto
    await loadmaterialesOrdenes();
  };*/

  const handleChangeMO = (event) => {
    event.preventDefault();
    setColores1(event.target.value);
    setEspesoresM1(event.target.value);
    setNombreM(event.target.value);
    setmaterialesOrdenes({ ...materialesOrdenes, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    if(idOrden && nombreM && espesor && color && descripcionM && medidaLargo && medidaAncho && precioLargo
      && precioM2 && precioTotal)
      {
        const newFilas = [...filas,{idOrden, nombreM, espesor, color, descripcionM, medidaLargo, medidaAncho, precioLargo, precioM2, precioTotal}];
        setFilas(newFilas);
        setLoading1(true);
        try {
          if (editing1) {
            //navigate("/dashboard/trabajosrealizados");        
            UpdateMaterialTrabajosRealizados(idOrden, newFilas);//revisar esta logica del id
          } else {
           // navigate("/dashboard/trabajosrealizados");
            saveMaterialTrabajosRealizados(newFilas);
            //console.log(newFilas);
          }
          setLoading1(false);
        } catch (error) {
          console.error(error);
        }
      }

    event.preventDefault();
    setFilas([...filas,
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
    <Grid container direction="column" alignItems="top" justifyContent="center">
      <Grid container alignItems={"center"} paddingBottom={1}>
        <Grid
          item
          xs={2.4}
          backgroundColor="transparent"
          borderBottom={1}
          borderColor="red"
        >
          <h5>Impuestos ONAT:</h5>
        </Grid>
        <Grid
          item
          xs={2.4}
          backgroundColor="transparent"
          borderBottom={1}
          borderColor="yellow"
        >
          <h5>Imp. Repres.:</h5>
        </Grid>
        <Grid
          item
          xs={2.4}
          backgroundColor="transparent"
          borderBottom={1}
          borderColor="blue"
        >
          <h5>% Equipos:</h5>
        </Grid>
        <Grid
          item
          xs={2.4}
          backgroundColor="transparent"
          borderBottom={1}
          borderColor="orange"
        >
          <h5>Costo Total:</h5>
        </Grid>
        <Grid
          item
          xs={2.4}
          backgroundColor="transparent"
          borderBottom={1}
          borderColor="green"
        >
          <h5>Utilidad: </h5>
        </Grid>
      </Grid>

      <Grid>
        <Card
          style={{
            backgroundColor: "transparent",
            padding: ".5rem",
            color: "inherit",
            marginRight: "0.5rem",
          }}
        >
          <Typography variant="5" textAlign="center" color="inherit">
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
                label="Pago Efectivo?"
                select
                sx={{ display: "block", margin: ".5rem 0" }}
                name="pago_efectivo"
                value={trabajo.pago_efectivo}//{currency1} //{trabajo.pago_efectivo}
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
                label="Utilidad"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="utilidad"
                value={trabajo.utilidad}
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
                disabled={
                  !trabajo.nombre ||
                  !trabajo.descripcion ||
                  !trabajo.pago_efectivo ||
                  !trabajo.fecha ||
                  !trabajo.precio ||
                  !trabajo.otros_gastos_descripcion ||
                  !trabajo.costo_otros_gastos ||
                  !trabajo.utilidad ||
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
          Materiales Asociados
          <form className={classes.root} onSubmit={handleSubmit}>
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
              value={nombreM}
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
              value = {precioTotal}
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
         <TableContainer style={{ color: "white" }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell  style={{ color: "grey" }}>ID Orden</TableCell>
        <TableCell  style={{ color: "grey" }}>Nombre del Material</TableCell>
        <TableCell  style={{ color: "grey" }}>Espesor</TableCell>
        <TableCell  style={{ color: "grey" }}>Color</TableCell>
        <TableCell  style={{ color: "grey" }}>Descripción</TableCell>
        <TableCell  style={{ color: "grey" }}>Medida Largo</TableCell>
        <TableCell  style={{ color: "grey" }}>Medida Ancho</TableCell>
        <TableCell  style={{ color: "grey" }}>Precio Largo</TableCell>
        <TableCell  style={{ color: "grey" }}>Precio M2</TableCell>
        <TableCell  style={{ color: "grey" }}>Precio Total</TableCell>
        <TableCell  style={{ color: "grey" }}>Acciones</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {filas.map((fila, index) => (
        <TableRow key={index}>
          <TableCell  style={{ color: "grey" }}>{fila.idOrden}</TableCell>
          <TableCell  style={{ color: "grey" }}>{fila.nombreM}</TableCell>
          <TableCell  style={{ color: "grey" }}>{fila.espesor}</TableCell>
          <TableCell  style={{ color: "grey" }}>{fila.color}</TableCell>
          <TableCell  style={{ color: "grey" }}>{fila.descripcionM}</TableCell>
          <TableCell  style={{ color: "grey" }}>{fila.medidaLargo}</TableCell>
          <TableCell  style={{ color: "grey" }}>{fila.medidaAncho}</TableCell>
          <TableCell  style={{ color: "grey" }}>{fila.precioLargo}</TableCell>
          <TableCell  style={{ color: "grey" }}>{fila.precioM2}</TableCell>
          <TableCell  style={{ color: "grey" }}>{fila.precioTotal}</TableCell>
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
