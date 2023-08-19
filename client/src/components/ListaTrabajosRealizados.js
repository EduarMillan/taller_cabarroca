import MUIDataTable from "mui-datatables";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import React, { useEffect, useState } from "react";
import { getTrabajosRealizados, EliminarTrabajoRealizado } from "../api";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import moment from "moment";
//import { Card } from "@material-ui/core";

export default function ListaTrabajosRealizados() {
  const [trabajos, setTrabajos] = useState([]);
  const navigate = useNavigate();

  const loadTrabajos = async () => {
    try {
      const datos = await getTrabajosRealizados();

      // Ordenar los datos por fecha en orden descendente (de más reciente a más antiguo)
      datos.sort((a, b) => moment(b.fecha).toDate() - moment(a.fecha).toDate());

      setTrabajos(datos);
    } catch (error) {
      console.error("Error:", error);
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
      name: "id",
      label: "ID",
    },
    {
      name: "nombre",
      label: "Nombre",
    },
    {
      name: "descripcion",
      label: "Descripción",
    },
    {
      name: "pago_efectivo",
      label: "P. Efectivo",
    },
    {
      name: "precio",
      label: "Precio (MN)",
    },
    {
      name: "fecha",
      label: "Fecha",
    },
    /*{
      name: "otros_gastos_descripcion",
      label: "Otros Gastos",
    },
    {
      name: "costo_otros_gastos",
      label: "Costo  Otros Gastos",
    },*/
    {
      name: "impuesto_representacion",
      label: "Imp. Repres.",
    },
    {
      name: "impuesto_onat",
      label: "Imp. ONAT",
    },
    {
      name: "impuesto_equipos",
      label: "Imp. Equipos",
    },
    {
      name: "costo_total",
      label: "Costo Total",
    },
    {
      name: "utilidad",
      label: "Utilidad",
    },
    {
      name: "facturado",
      label: "Facturado",
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
                  navigate(`/trabajos_realizados/${tableMeta.rowData[0]}`);
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
    rowsPerPage: 6,
    rowsPerPageOptions: [6, 12, 18],

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
        title={"Trabajos Realizados"}
        data={trabajos}
        columns={columns}
        options={options}
      />
    </>
  );
}
