import MUIDataTable from "mui-datatables";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { IconButton } from "@mui/material";
import {
    EliminarMaterial,
    getMaterialesTrabajosRealizados,
  } from "../api";
import { useNavigate } from "react-router-dom";


export function Tabla_Materiales_Ordenes( {materialesOrdenes}) {

    const navigate = useNavigate();

    //const [materialesOrdenes, setMaterialesOrdenes] = useState([]);

    //const loadMaterialesOrdenes = async () => {
    //    const datos = await getMaterialesTrabajosRealizados();
    //    setMaterialesOrdenes(datos);

    const EjecutaEliminar = async (id) => {
        await EliminarMaterial(id);
        //await loadMaterialesOrdenes();
      };
//-------------------------

const columns = [
    {
      name: "id_orden",
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
                  //navigate(`/materiales/${tableMeta.rowData[0]}`);
                  navigate(`/materiales/${tableMeta.rowData[0]}`);
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
//-------------------------
  return (
    <>
      <MUIDataTable
        title={"Lista de Materiales de la Orden"}
        data={materialesOrdenes}
        columns={columns}
        options={options}
      />
    </>
  )
}
