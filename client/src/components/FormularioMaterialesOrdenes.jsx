import { Button, TextField } from '@material-ui/core';
import { Card, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  saveMaterialTrabajosRealizados,
  UpdateMaterialTrabajosRealizados,
  getMateriales,
} from '../api';
import { useMaterialContext } from './MaterialContext';
import {
  ColoresM,
  EspesoresM,
  materialesRegistrados,
} from '../CaracteristicasMateriales/DatosMateriales';
import '../styles/formularioMaterialesOrdenes.css';

const useStyles = makeStyles((theme) => ({
  root: {
    // estilos para los cuadro de dialogos
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FormularioMaterialesOrdenes({ editedMaterial }) {
  const { setShouldReload } = useMaterialContext();
  let editedMaterial1;

  if (editedMaterial != null) {
    editedMaterial1 = editedMaterial;
  }

  const classes = useStyles();
  const params = useParams();

  const [materialOrden, setMaterialOrden] = useState({
    id_orden: params.id,
    nombre: '',
    espesor: '',
    color: '',
    descripcion: '',
    medida_largo: '',
    medida_ancho: '',
    precio_largo: '',
    precio_m2: '',
    precio_total: '',
  });

  const [editing, setEditing] = useState(false);
  const [precioMl, setPrecioMl] = useState(0);
  const [precioM2, setPrecioM2] = useState(0);

  const handledSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        UpdateMaterialTrabajosRealizados(materialOrden.id, materialOrden);
      } else {
        saveMaterialTrabajosRealizados(materialOrden);
      }
      setShouldReload(true);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
    setMaterialOrden({
      // limpio los campos una vez salvados los valores
      ...materialOrden,
      nombre: '',
      espesor: '',
      color: '',
      descripcion: '',
      medida_largo: '',
      medida_ancho: '',
      precio_largo: '',
      precio_m2: '',
      precio_total: '',
    });
  };

  const handleChange = async (e) => {
    setMaterialOrden({ ...materialOrden, [e.target.name]: e.target.value });
  };

  const calcularPrecios = async () => {
    setPrecioMl(0);
    setPrecioM2(0);
    if (materialOrden.espesor && materialOrden.color && materialOrden.nombre) {
      const materiales = await getMateriales();
      // eslint-disable-next-line max-len
      const materialesFiltrados = materiales.filter((x) => (x.nombre === materialOrden.nombre && x.color === materialOrden.color && x.espesor.toString() === materialOrden.espesor));

      // eslint-disable-next-line max-len
      const sumaPreciosM2 = materialesFiltrados.reduce((total, material) => total + parseFloat(material.costo_m2), 0);
      const precM2 = sumaPreciosM2 / materialesFiltrados.length;

      // eslint-disable-next-line max-len
      const sumaPreciosMl = materialesFiltrados.reduce((total, material) => total + parseFloat(material.costo_ml), 0);
      const precMl = sumaPreciosMl / materialesFiltrados.length;

      if (materialOrden.medida_largo) { setPrecioMl((materialOrden.medida_largo * precMl)); }

      // eslint-disable-next-line max-len
      if (materialOrden.medida_largo && materialOrden.medida_ancho) { setPrecioM2((materialOrden.medida_largo * materialOrden.medida_ancho * precM2)); }
    }
  };

  useEffect(() => {
    if (editedMaterial1) {
      setEditing(true);
      setMaterialOrden(editedMaterial1);
    }
    // calcularPrecios();
  }, [params.id, editedMaterial]);// params.id, editedMaterial, materialOrden

  useEffect(() => {
    calcularPrecios();
  }, [materialOrden]);

  return (
    <Grid container direction="column" alignItems="top" justifyContent="center" fontFamily="Roboto">
      <div>&nbsp;</div>
      <Typography id="materialesA">
        MATERIALES ASOCIADOS
      </Typography>
      <Card className="tarjeta">
        <form className={classes.root} onSubmit={handledSubmit}>
          <TextField
            variant="outlined"
            label="Nombre del Material"
            name="nombre"
            select
            sx={{ display: 'block', margin: '.5rem 0' }}
            value={materialOrden.nombre}
            onChange={handleChange}
            InputLabelProps={{ style: { color: 'inherit' } }}
            InputProps={{ style: { color: 'inherit' } }}
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
            sx={{ display: 'block', margin: '.5rem 0' }}
            value={materialOrden.espesor}
            onChange={handleChange}
            InputLabelProps={{ style: { color: 'inherit' } }}
            InputProps={{ style: { color: 'inherit' } }}
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
            sx={{ display: 'block', margin: '.5rem 0' }}
            value={materialOrden.color}
            onChange={handleChange}
            InputLabelProps={{ style: { color: 'inherit' } }}
            InputProps={{ style: { color: 'inherit' } }}
          >
            {ColoresM.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            variant="outlined"
            label="Medida Largo"
            name="medida_largo"
            type="number"
            sx={{ display: 'block', margin: '.5rem 0' }}
            value={materialOrden.medida_largo}
            onChange={handleChange}
            InputLabelProps={{ style: { color: 'inherit' } }}
            InputProps={{ style: { color: 'inherit' } }}
          />

          <TextField
            variant="outlined"
            label="Medida Ancho"
            name="medida_ancho"
            type="number"
            sx={{ display: 'block', margin: '.5rem 0' }}
            value={materialOrden.medida_ancho}
            onChange={handleChange}
            InputLabelProps={{ style: { color: 'inherit' } }}
            InputProps={{ style: { color: 'inherit' } }}
          />
          <TextField
            variant="outlined"
            label="Descripción"
            name="descripcion"
            sx={{ display: 'block', margin: '.5rem 0' }}
            value={materialOrden.descripcion}
            onChange={handleChange}
            InputLabelProps={{ style: { color: 'inherit' } }}
            InputProps={{ style: { color: 'inherit' } }}
          />
          <TextField
            variant="outlined"
            label="Precio Largo"
            name="precio_largo"
            type="number"
            sx={{ display: 'block', margin: '.5rem 0' }}
            value={materialOrden.precio_largo}
            onChange={handleChange}
            InputLabelProps={{ style: { color: 'inherit' } }}
            InputProps={{ style: { color: 'inherit' } }}
          />
          <TextField
            variant="outlined"
            label="Precio M2"
            name="precio_m2"
            type="number"
            sx={{ display: 'block', margin: '.5rem 0' }}
            value={materialOrden.precio_m2}
            onChange={handleChange}
            InputLabelProps={{ style: { color: 'inherit' } }}
            InputProps={{ style: { color: 'inherit' } }}
          />
          <TextField
            variant="outlined"
            label="Precio Total"
            name="precio_total"
            type="number"
            sx={{ display: 'block', margin: '.5rem 0' }}
            value={materialOrden.precio_total}
            onChange={handleChange}
            InputLabelProps={{ style: { color: 'inherit' } }}
            InputProps={{ style: { color: 'inherit' } }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ padding: '12px', margin: '12px' }}
            disabled={
              !materialOrden.nombre
              || !materialOrden.espesor
              || !materialOrden.color
              || !materialOrden.descripcion
              || !materialOrden.medida_largo
              || !materialOrden.medida_ancho
              || !materialOrden.precio_largo
              || !materialOrden.precio_m2
              || !materialOrden.precio_total
            }
          >
            Salvar
          </Button>
        </form>
        <div className="dataMaterial">
          <div className="headerMaterial">
            DATOS DEL MATERIAL
          </div>
          <p className="data">
            {materialOrden.nombre}
            {' '}
            {materialOrden.espesor}
            {' '}
            mm
            {' '}
            {materialOrden.color}
          </p>
          <p className="data1">
            Precio ML (USD):
            {' '}
            {precioMl.toFixed(2)}
          </p>
          <p className="data1">
            Precio M2 (USD):
            {' '}
            {precioM2.toFixed(2)}
          </p>
        </div>
      </Card>
      <div>&nbsp;</div>
    </Grid>
  );
}

FormularioMaterialesOrdenes.propTypes = { editedMaterial: PropTypes.node.isRequired };
