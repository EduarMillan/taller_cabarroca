/* eslint-disable no-nested-ternary */
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { Button, TextField } from '@material-ui/core';
import {
  Typography,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import {
  saveTrabajosRealizados,
  getTrabajoRealizado,
  UpdateTrabajoRealizado,
  getMaterialTrabajosRealizados,
} from '../api';
import { useMaterialContext } from './MaterialContext';
import {
  currencies,
  currencies1,
  entidad,
} from '../CaracteristicasMateriales/DatosMateriales';
import '../styles/formularioTrabajoRealizado.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FormularioTrabajoRealizado() {
  const { shouldReload, setShouldReload } = useMaterialContext();

  const classes = useStyles();

  const params = useParams();

  const [trabajo, setTrabajo] = useState({
    nombre: '',
    descripcion: '',
    pago_efectivo: '',
    precio: '',
    fecha: new Date().toISOString().slice(0, 10),
    otros_gastos_descripcion: '',
    costo_otros_gastos: '',
    impuesto_representacion: '',
    impuesto_onat: '',
    impuesto_equipos: '',
    costo_total: '',
    utilidad: '',
    facturado: '',
    entidad: '',
  });

  const [loading2, setLoading2] = useState(false);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const handledSubmit = async (e) => {
    e.preventDefault();
    setLoading2(true);
    try {
      if (editing) {
        // navigate("/dashboard/trabajos_realizados");
        await UpdateTrabajoRealizado(params.id, trabajo);
      } else {
        navigate('/dashboard/trabajos_realizados');
        await saveTrabajosRealizados(trabajo);
      }
      setLoading2(false); // detengo el circular progress
    } catch (error) {
      console.error(error);
    }
    setShouldReload(true);
  };

  const handleChange = (e) => {
    setTrabajo({ ...trabajo, [e.target.name]: e.target.value });
  };

  const loadTrabajos = async (id) => {
    let costoT = 0;
    const materialesT = await getMaterialTrabajosRealizados(id);
    if (materialesT !== 'Material no encontrado') {
      costoT = materialesT.reduce(
        (total, material) => total + parseFloat(material.precio_total),
        0,
      );
    }
    const data = await getTrabajoRealizado(id);
    data[0].costo_total = costoT;
    setTrabajo(data[0]);
  };

  useEffect(() => {
    if (params.id) {
      setEditing(true);
      loadTrabajos(params.id);
      // setShouldReload(false);
    }
  }, [params.id, shouldReload]); // params.id

  const fechaIncorrecta = trabajo.fecha; // aqui capturo la fecha con formato incorrecto
  const fechaCorrecta = moment(fechaIncorrecta).format('YYYY-MM-DDThh:mm'); // doy formato correcto a la fecha

  return (
    <div className={editing ? 'container4' : 'container5'}>
      <Typography id={editing ? 'trabajosR' : 'trabajosRS'}>
        {editing ? 'ACTUALIZAR TRABAJO' : 'INSERTAR TRABAJO'}
      </Typography>
      <div id={editing ? 'tarjetaTR' : 'tarjetaTRS'}>
        <div>
          <form className={classes.root} id={editing ? 'formE' : 'formS'} onSubmit={handledSubmit}>
            <TextField
              variant="outlined"
              label="Nombre"
              sx={{ display: 'block', margin: '.5rem 0', backgroundColor: 'lightblue' }}
              name="nombre"
              value={trabajo.nombre}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'inherit' } }}
              InputProps={{
                style: {
                  color: 'inherit',
                },
              }}
            />

            <TextField
              variant="outlined"
              label="Descripcion"
              multiline
              sx={{ display: 'block', margin: '.5rem 0' }}
              name="descripcion"
              value={trabajo.descripcion}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'inherit' } }}
              InputProps={{
                style: {
                  color: 'inherit',
                },
              }}
            />

            <TextField
              variant="outlined"
              label="Tipo de Pago"
              select
              sx={{ display: 'block', margin: '.5rem 0' }}
              name="pago_efectivo"
              value={`${trabajo.pago_efectivo}`}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'inherit' } }}
              InputProps={{
                style: {
                  color: 'inherit',
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
              sx={{ display: 'block', margin: '.5rem 0' }}
              name="precio"
              value={`${trabajo.precio}`}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'inherit' } }}
              InputProps={{
                style: {
                  color: 'inherit',
                },
              }}
            />

            <TextField
              variant="outlined"
              label="Fecha"
              type="datetime-local"
              sx={{ display: 'block', margin: '.5rem 0' }}
              name="fecha"
              value={fechaCorrecta}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'inherit' } }}
              InputProps={{
                style: {
                  color: 'inherit',
                },
              }}
            />
            <TextField
              variant="outlined"
              label="Otros Gastos Descrip."
              sx={{ display: 'block', margin: '.5rem 0' }}
              name="otros_gastos_descripcion"
              value={trabajo.otros_gastos_descripcion}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'inherit' } }}
              InputProps={{
                style: {
                  color: 'inherit',
                },
              }}
            />

            <TextField
              variant="outlined"
              label="Costo Otros Gastos"
              type="number"
              sx={{ display: 'block', margin: '.5rem 0' }}
              name="costo_otros_gastos"
              value={`${trabajo.costo_otros_gastos}`}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'inherit' } }}
              InputProps={{
                style: {
                  color: 'inherit',
                },
              }}
            />

            <TextField
              variant="outlined"
              select
              label="Facturado"
              sx={{ display: 'block', margin: '.5rem 0' }}
              name="facturado"
              value={trabajo.facturado}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'inherit' } }}
              InputProps={{
                style: {
                  color: 'inherit',
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
              sx={{ display: 'block', margin: '.5rem 0' }}
              name="entidad"
              value={trabajo.entidad}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'inherit' } }}
              InputProps={{
                style: {
                  color: 'inherit',
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
                padding: '12px',
                margin: '12px',
                width: '28ch',
              }}
              disabled={
                !trabajo.nombre
                || !trabajo.descripcion
                || !(trabajo.pago_efectivo || trabajo.pago_efectivo === 0)
                || !trabajo.fecha
                || !trabajo.precio
                || !trabajo.otros_gastos_descripcion
                || !trabajo.costo_otros_gastos
                || !(trabajo.facturado || trabajo.facturado === 0)
                || !trabajo.entidad
              }
            >
              {loading2 ? (
                <CircularProgress color="inherit" size={24} />
              ) : editing ? (
                'Actualizar'
              ) : (
                'Salvar'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
