//este componente muestra la tabla de materiales de las ordenes
import { IconButton, Grid, Card } from "@mui/material";
import MUIDataTable from "mui-datatables";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import React, { useEffect, useState } from "react";
import {
  EliminarMaterialTrabajosRealizados,
  getMaterialTrabajosRealizados,
  getMaterialesTrabajosRealizados,
} from "../api";
import {  useParams } from "react-router-dom";
import FormularioMaterialesOrdenes from "./FormularioMaterialesOrdenes";
import { useMaterialContext } from "./MaterialContext";

export default function ListaMaterialesOrdenes() {

  const { shouldReload, setShouldReload } = useMaterialContext();
  const [materialesOrdenes, setMaterialesOrdenes] = useState([]);
  const [editingMaterial, setEditingMaterial] = useState(null);

  //const navigate = useNavigate();
  const params = useParams();

  const loadMaterialesOrdenes = async (id) => {
    const datos = await getMaterialTrabajosRealizados(id);
    setMaterialesOrdenes(datos);
  };

  useEffect(() => {
    if (params.id) {
      loadMaterialesOrdenes(params.id);
      setShouldReload(false); // Restablecer el valor después de cargar
   }
  }, [shouldReload, setShouldReload, params.id]);


  const EjecutaEliminar = async (id) => {
    await EliminarMaterialTrabajosRealizados(id);
    await loadMaterialesOrdenes(params.id);
  };

  const Update_MaterialOrden = async (id) => {
    const materialOrden = await getMaterialesTrabajosRealizados();
    const  materialEncontrado = materialOrden.find((material) => material.id === id);
    setEditingMaterial(materialEncontrado);
  };

  const columns = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "nombre",
      label: "Nombre",
    },
    {
      name: "espesor",
      label: "Espesor (mm)",
    },
    {
      name: "color",
      label: "Color",
    },
    {
      name: "descripcion",
      label: "Descripción",
    },

    {
      name: "medida_largo",
      label: "Largo (m)",
    },
    {
      name: "medida_ancho",
      label: "Ancho (m)",
    },
    {
      name: "precio_largo",
      label: "Precio del largo",
    },
    {
      name: "precio_m2",
      label: "Precio del m2",
    },
    {
      name: "precio_total",
      label: "Precio total",
    },

    {
      name: "acciones",
      label: "Acciones",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <IconButton
                aria-label="Editar"
                onClick={() => {
                  Update_MaterialOrden(tableMeta.rowData[0]);
                }}
              >
                <AssignmentIcon></AssignmentIcon>
              </IconButton>
              <IconButton
                aria-label="Eliminar"
                onClick={() => {
                  EjecutaEliminar(tableMeta.rowData[0]);
                }}
              >
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
    <Grid>
      <FormularioMaterialesOrdenes editedMaterial={editingMaterial} />
      
      {materialesOrdenes === "Material no encontrado" ? (
        <div
          style={{
            backgroundColor: "#202020",
            display: "flex",
            alignItems: "center", 
            justifyContent: "center",
            fontSize: "30px",
          }}
        >
          No hay materiales aún
        </div>
      ) : (
        <Card
          style={{
            backgroundColor: "transparent",
            padding: ".1rem",
            color: "white",
            marginRight: "0.5rem",
          }}
        >
          <MUIDataTable
            title={"Lista de Materiales de la Orden"}
            data={materialesOrdenes}
            columns={columns}
            options={options}
          />
        </Card>
      )}
    </Grid>
  );
}
