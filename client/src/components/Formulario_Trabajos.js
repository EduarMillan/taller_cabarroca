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
  import { saveTrabajosRealizados, getTrabajoRealizado, UpdateTrabajoRealizado} from "../api";
  import { useNavigate, useParams } from "react-router-dom";
  
  export default function Formulario_Trabajos(route) {
   
    const [trabajo, setTrabajo] = useState({
      nombre:"",
      descripcion:"",
      pago_efectivo:"",
      precio:"",
      fecha:"",
      otros_gastos_descripcion:"",
      costo_otros_gastos:"",
      impuesto_representacion:"",
      impuesto_onat:"",
      impuesto_equipos:"",
      costo_total:"",
      utilidad:"",
      facturado:"",
     
    });
  
    const [loading, setLoading] = useState(false);
  
    const navigate = useNavigate();
  
    const params = useParams();
  
    const [editing, setEditing] = useState(false);
  
    const handledSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        if (editing)  {
          navigate("/dashboard/trabajosrealizados");
          await UpdateTrabajoRealizado(params.id, trabajo);
          
          
        } else {
          navigate("/dashboard/trabajosrealizados");
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
  
  const loadTrabajos = async(id) => {
   const data = await getTrabajoRealizado(id);
    setTrabajo(...data);
   
  };
  
    useEffect(() =>{
      if(params.id){
        setEditing(true);
        loadTrabajos(params.id);
      }
    },[params.id])
  
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        
      >
        <Grid item xs={3} >
          <Card
            sx={{ mt: 1 }}
            style={{ backgroundColor: "transparent", padding: "1rem", color :'inherit' }}
          >
            <Typography variant="5" textAlign="center" color="inherit">
              {editing ? "Actualizar Trabajo": "Insertar Trabajo"}
              
            </Typography>
            <CardContent  color='white'>
              <form onSubmit={handledSubmit}>
                <TextField
                  variant="filled"
                  label="Nombre"
                  sx={{ display: "block", margin: ".5rem 0"  }}
                  name="nombre"
                  value={trabajo.nombre}
                  onChange={handleChange}
                  inputProps={{ style: { color: "inherit" } }}
                  InputLabelProps={{ style: { color: "inherit" } }}
              
                  
                />
  
                <TextField
                  variant="filled"
                  label="Descripcion"
                  multiline
                  rows={4}
                  sx={{ display: "block", margin: ".5rem 0" }}
                  name="descripcion"
                  value={trabajo.descripcion}
                  onChange={handleChange}
                  inputProps={{ style: { color: "inherit" } }}
                  InputLabelProps={{ style: { color: "inherit" } }}
                />

              <TextField
                  variant="filled"
                  label="Pago Efectivo?"
                  sx={{ display: "block", margin: ".5rem 0" }}
                  name="pago_efectivo"
                  value={trabajo.pago_efectivo}
                  onChange={handleChange}
                  inputProps={{ style: { color: "inherit" } }}
                  InputLabelProps={{ style: { color: "inherit" } }}
                />
  
                <TextField
                  variant="filled"
                  label="Precio (MN)"
                  sx={{ display: "block", margin: ".5rem 0" }}
                  name="precio"
                  value={trabajo.precio + ''}
                  onChange={handleChange}
                  inputProps={{ style: { color: "inherit" } }}
                  InputLabelProps={{ style: { color: "inherit" } }}
                />
  
                <TextField
                  variant="filled"
                  label="Fecha"
                  sx={{ display: "block", margin: ".5rem 0" }}
                  name="fecha"
                  value={trabajo.fecha + ''}
                  onChange={handleChange}
                  inputProps={{ style: { color: "inherit" } }}
                  InputLabelProps={{ style: { color: "inherit" } }}
                />
  
                <TextField
                  variant="filled"
                  label="Otros Gastos"
                  multiline
                  rows={4}
                  sx={{ display: "block", margin: ".5rem 0" }}
                  name="otros_gastos_descripcion"
                  value={trabajo.otros_gastos_descripcion}
                  onChange={handleChange}
                  inputProps={{ style: { color: "inherit" } }}
                  InputLabelProps={{ style: { color: "inherit" } }}
                />
  
                <TextField
                  variant="filled"
                  label="Costo Otros Gastos"
                  sx={{ display: "block", margin: ".5rem 0" }}
                  name="costo_otros_gastos"
                  value={trabajo.costo_otros_gastos + ''}
                  onChange={handleChange}
                  inputProps={{ style: { color: "inherit" } }}
                  InputLabelProps={{ style: { color: "inherit" } }}
                />
  
                <TextField
                  variant="filled"
                  label="Costo Total"
                  sx={{ display: "block", margin: ".5rem 0" }}
                  name="costo_total"
                  value={trabajo.costo_total + ''}
                  onChange={handleChange}
                  inputProps={{ style: { color: "inherit" } }}
                  InputLabelProps={{ style: { color: "inherit" } }}
                />

<TextField
                  variant="filled"
                  label="Utilidad"
                  sx={{ display: "block", margin: ".5rem 0" }}
                  name="utilidad"
                  value={trabajo.utilidad}
                  onChange={handleChange}
                  inputProps={{ style: { color: "inherit" } }}
                  InputLabelProps={{ style: { color: "inherit" } }}
                />

<TextField
                  variant="filled"
                  label="Facturado?"
                  sx={{ display: "block", margin: ".5rem 0" }}
                  name="facturado"
                  value={trabajo.facturado}
                  onChange={handleChange}
                  inputProps={{ style: { color: "inherit" } }}
                  InputLabelProps={{ style: { color: "inherit" } }}
                />
  
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={
                    !trabajo.nombre ||
                    !trabajo.descripcion ||
                    !trabajo.pago_efectivo||
                    !trabajo.fecha ||
                    !trabajo.precio ||
                    !trabajo.otros_gastos_descripcion ||
                    !trabajo.costo_otros_gastos ||
                    !trabajo.costo_total ||
                    !trabajo.utilidad||
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
      </Grid>
    );
  }
  