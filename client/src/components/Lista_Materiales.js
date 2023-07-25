import MUIDataTable from "mui-datatables";
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState,  } from "react";
import { getMateriales, EliminarMaterial } from "../api";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

export default function Lista_Materiales() {
 
  const [materiales, setMateriales] = useState([]);

  const navigate = useNavigate();
  
  const loadMateriales = async () => {
    const datos = await getMateriales();
    setMateriales(datos);
  };

  useEffect(() => {
    loadMateriales();
  }, []);

  const EjecutaEliminar = async (id) => {
    await EliminarMaterial(id);
    await loadMateriales();
  };
  //------------------------------------------------------------

  const columns = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "nombre",
      label: "Nombre",
      type: "singleSelect",
      valueOptions: ["PVC", "Acrilico", "Vinilo", "Bicapa", "Glaspa"],
      editable: true,
    },
    {
      name: "descripcion",
      label: "Descripción",
    },
    {
      name: "espesor",
      label: "Espesor (mm)",
    },
    {
      name: "longitud_ancho",
      label: "Ancho (m)",
    },
    {
      name: "longitud_largo",
      label: "Largo (m)",
    },
    {
      name: "calidad_material",
      label: "Calidad",
    },
    {
      name: "costo_total",
      label: "Costo Total",
    },
    {
      name: "cantidad",
      label: "Cant.",
    },
    {
      name: "color",
      label: "Color",
    },
    {
      name: "acciones",
      label: "Acciones",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
            <IconButton aria-label="Editar"  onClick={() => {
                //navigate(`/materiales/${tableMeta.rowData[0]}`);
                navigate(`/materiales/${tableMeta.rowData[0]}`);
              }}>
            <AssignmentIcon></AssignmentIcon>
          </IconButton>
          <IconButton aria-label="Eliminar" onClick={() => {
              EjecutaEliminar(tableMeta.rowData[0])
            }}>
            <DeleteIcon> </DeleteIcon>
          </IconButton>
          </>
          );
        },
      },
    },
  ];

  const options = {
    selectableRowsHeader: false,
    selectableRows: false,
    filterType: "checkbox",
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],

    textLabels: {
      body: {
        noMatch: "Lo sentimos, no encontramos coincidencias",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
      pagination: {
        next: "Próxima página",
        previous: "Página anterior",
        rowsPerPage: "Filas por páginas:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver Columnas",
        filterTable: "Filtros de Tabla",
      },
      filter: {
        all: "All",
        title: "Filtros",
        reset: "Reiniciar",
      },
      viewColumns: {
        title: "Mostrar Columnas",
        titleAria: "Mostrar/Ocultar Columnas de Tabla ",
      },
      selectedRows: {
        text: "fila(s) seleccionadas",
        delete: "Eliminar",
        deleteAria: "Delete Selected Rows",
      },
    },
  };
  //------------------------------------------------------------
  return (
    <>
      
        <MUIDataTable
          title={"Lista de Materiales"}
          data={materiales}
          columns={columns}
          options={options}
        />
    
    </>
  );
}
