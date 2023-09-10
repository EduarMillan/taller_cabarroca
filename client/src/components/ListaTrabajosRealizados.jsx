import MUIDataTable from 'mui-datatables';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { getTrabajosRealizados, EliminarTrabajoRealizado } from '../api';
// import { Card } from "@material-ui/core";

export default function ListaTrabajosRealizados() {
  const [trabajos, setTrabajos] = useState([]);
  const navigate = useNavigate();

  const arreglarFecha = (dato) => {
    const fecha = new Date(dato.fecha);
    const anno = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    // Formatear la fecha en 'YYYY-MM-DD'
    const fechaFormateada = `${anno}-${mes}-${dia}`;
    return fechaFormateada;
  };

  const loadTrabajos = async () => {
    try {
      const datos = await getTrabajosRealizados();
      // Ordenar los datos por fecha en orden descendente (de más reciente a más antiguo)
      datos.sort((a, b) => moment(b.fecha).toDate() - moment(a.fecha).toDate());

      const datos1 = datos.map((dato) => ({ ...dato, fecha: arreglarFecha(dato) }));

      setTrabajos(datos1);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    loadTrabajos();
  }, []);

  const EjecutaEliminar = async (id) => {
    await EliminarTrabajoRealizado(id);
    await loadTrabajos();
  };
  //------------------------------------------------------------

  const columns = [
    {
      name: 'id',
      label: 'ID',
    },
    {
      name: 'nombre',
      label: 'Nombre',
    },
    {
      name: 'descripcion',
      label: 'Descripción',
    },
    {
      name: 'pago_efectivo',
      label: 'Pago. Efec.',
    },
    {
      name: 'precio',
      label: 'Precio (MN)',
    },
    {
      name: 'fecha',
      label: 'Fecha',
    },
    {
      name: 'impuesto_representacion',
      label: 'Imp. Repres.',
    },
    {
      name: 'impuesto_onat',
      label: 'Imp. ONAT',
    },
    {
      name: 'impuesto_equipos',
      label: 'Imp. Equipos',
    },
    {
      name: 'costo_total',
      label: 'Costo Total',
    },
    {
      name: 'utilidad',
      label: 'Utilidad',
    },

    {
      name: 'acciones',
      label: 'Acciones',
      options: {
        filter: true,
        // eslint-disable-next-line react/no-unstable-nested-components
        customBodyRender: (value, tableMeta) => (
          <>
            <IconButton
              aria-label="Editar"
              style={{ color: '#CCFFCC' }}
              onClick={() => {
                navigate(`/dashboard/trabajos_realizados/${tableMeta.rowData[0]}`);
              }}
            >
              <AssignmentIcon />
            </IconButton>
            <IconButton
              aria-label="Eliminar"
              style={{ color: '#FF6600' }}
              onClick={() => {
                EjecutaEliminar(tableMeta.rowData[0]);
              }}
            >
              <DeleteIcon> </DeleteIcon>
            </IconButton>
          </>
        ),
      },
    },
  ];

  const options = {
    selectableRowsHeader: false,
    selectableRows: false,
    filterType: 'checkbox',
    rowsPerPage: 6,
    rowsPerPageOptions: [6, 12, 18],

    textLabels: {
      body: {
        noMatch: 'Lo sentimos, no encontramos coincidencias',
        toolTip: 'Ordenar',
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
      pagination: {
        next: 'Próxima página',
        previous: 'Página anterior',
        rowsPerPage: 'Filas por páginas:',
        displayRows: 'de',
      },
      toolbar: {
        search: 'Buscar',
        downloadCsv: 'Descargar CSV',
        print: 'Imprimir',
        viewColumns: 'Ver Columnas',
        filterTable: 'Filtros de Tabla',
      },
      filter: {
        all: 'All',
        title: 'Filtros',
        reset: 'Reiniciar',
      },
      viewColumns: {
        title: 'Mostrar Columnas',
        titleAria: 'Mostrar/Ocultar Columnas de Tabla ',
      },
      selectedRows: {
        text: 'fila(s) seleccionadas',
        delete: 'Eliminar',
        deleteAria: 'Delete Selected Rows',
      },
    },
  };
  //------------------------------------------------------------
  return (
    <MUIDataTable
      title="Trabajos Realizados"
      data={trabajos}
      columns={columns}
      options={options}
    />
  );
}
