import {
  Button,
  TextField,
  CardContent,
  // Typography,
  CircularProgress,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { saveMateriales, getMaterial, UpdateMaterial } from '../api';
import {
  ColoresM,
  EspesoresM,
  materialesRegistrados,
} from '../CaracteristicasMateriales/DatosMateriales';
import '../styles/formularioMateriales.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '28ch',
      background: '#FFCC66',
      borderRadius: '5px',
    },
  },
}));

export default function FormularioMateriales() {
  const classes = useStyles();

  const [material, setMaterial] = useState({
    nombre: '',
    descripcion: '',
    espesor: '',
    longitud_ancho: '',
    longitud_largo: '',
    calidad_material: '',
    costo_total: '',
    cantidad: '',
    color: '',
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
        navigate('/dashboard/materiales');
        await UpdateMaterial(params.id, material);
      } else {
        navigate('/dashboard/materiales');
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
    <div className="container">
      <div className="cardContainer">
        <p className="titulo">
          {editing ? 'Actualizar Material' : 'Insertar Material'}
        </p>
        <CardContent className="cardContent">
          <form className={classes.root} id="formulario" onSubmit={handledSubmit}>
            <TextField
              className="textField"
              variant="filled"
              label="Nombre"
              name="nombre"
              select
              sx={{ display: 'block', margin: '.5rem 0' }}
              value={material.nombre}
              onChange={handleChange}
              InputProps={{ style: { color: 'inherit' } }}
              InputLabelProps={{ style: { color: 'inherit' } }}
            >
              {materialesRegistrados.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              className="textField"
              variant="filled"
              label="Descripcion"
              sx={{ display: 'block', margin: '.5rem 0' }}
              name="descripcion"
              value={material.descripcion}
              onChange={handleChange}
              inputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: 'inherit' } }}
            />

            <TextField
              className="textField"
              variant="filled"
              label="Espesor (mm)"
              name="espesor"
              select
              sx={{ display: 'block', margin: '.5rem 0' }}
              value={material.espesor}
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
              className="textField"
              variant="filled"
              label="Ancho (m)"
              sx={{ display: 'block', margin: '.5rem 0' }}
              name="longitud_ancho"
              value={`${material.longitud_ancho}`}
              onChange={handleChange}
              inputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: 'inherit' } }}
            />

            <TextField
              className="textField"
              variant="filled"
              label="Largo (m)"
              sx={{ display: 'block', margin: '.5rem 0' }}
              name="longitud_largo"
              value={`${material.longitud_largo}`}
              onChange={handleChange}
              inputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: 'inherit' } }}
            />

            <TextField
              className="textField"
              variant="filled"
              label="Calidad"
              sx={{ display: 'block', margin: '.5rem 0' }}
              name="calidad_material"
              value={material.calidad_material}
              onChange={handleChange}
              inputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: 'inherit' } }}
            />

            <TextField
              className="textField"
              variant="filled"
              label="Costo Total (USD)"
              sx={{ display: 'block', margin: '.5rem 0' }}
              name="costo_total"
              value={`${material.costo_total}`}
              onChange={handleChange}
              inputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: 'inherit' } }}
            />

            <TextField
              className="textField"
              variant="filled"
              label="Cantidad"
              sx={{ display: 'block', margin: '.5rem 0' }}
              name="cantidad"
              value={`${material.cantidad}`}
              onChange={handleChange}
              inputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: 'inherit' } }}
            />

            <TextField
              className="textField"
              variant="filled"
              label="Color"
              name="color"
              select
              sx={{ display: 'block', margin: '.5rem 0' }}
              value={material.color}
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{
                padding: '12px',
                margin: '8px',
                width: '28ch',
              }}
              disabled={
                  !material.nombre
                  || !material.descripcion
                  || !material.espesor
                  || !material.longitud_ancho
                  || !material.longitud_largo
                  || !material.calidad_material
                  || !material.costo_total
                  || !material.cantidad
                  || !material.color
                }
            >
              {loading ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                'Salvar'
              )}
            </Button>
          </form>
        </CardContent>
      </div>
    </div>
  );
}
