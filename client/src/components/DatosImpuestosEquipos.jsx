import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTrabajoRealizado } from '../api';
import { useMaterialContext } from './MaterialContext';
import '../styles/datosImpuestosEquipos.css';

export default function DatosImpuestosEquipos() {
  const { shouldReload } = useMaterialContext();
  const [trabajo, setTrabajo] = useState();
  const params = useParams();

  const loadTrabajo = async () => {
    try {
      const data = await getTrabajoRealizado(params.id);
      setTrabajo(data);
    } catch (error) {
      console.error('Error al cargar el trabajo:', error);
    }
  };

  useEffect(() => {
    loadTrabajo();
  }, [shouldReload]);

  return (
    <div className="container">
      <div className="imp_onat">
        <h4>
          Impuestos ONAT:
          {' '}
          {trabajo ? trabajo[0].impuesto_onat : 'Cargando...'}
        </h4>
      </div>
      <div className="imp_rep">
        <h4>
          Imp. Repres.:
          {' '}
          {trabajo ? trabajo[0].impuesto_representacion : 'Cargando...'}
        </h4>
      </div>
      <div className="imp_equipo">
        <h4>
          % Equipos:
          {' '}
          {trabajo ? trabajo[0].impuesto_equipos : 'Cargando...'}
        </h4>
      </div>
      <div className="costo">
        <h4>
          Costo Total:
          {' '}
          {trabajo ? (trabajo[0].costo_total) : 'Cargando...'}
        </h4>
      </div>
      <div className="utilidad">
        <h4>
          Utilidad:
          {' '}
          {trabajo ? trabajo[0].utilidad : 'Cargando...'}
          {' '}
        </h4>
      </div>
    </div>
  );
}
