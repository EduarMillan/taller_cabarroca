import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Paper, Typography, Tab, Tabs } from "@mui/material";
import { MapsHomeWork } from "@mui/icons-material";
import { getTrabajosRealizados } from "../api";
import moment from "moment";
import GraficoObras from "./GraficoObras";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const [trabajosRealizados, setTrabajosRealizados] = useState([]);
  const [trabajosAnnoActual, setTrabajosAnnoActual] = useState(0);
  const [trabajosAnnoPasado, setTrabajosAnnoPasado] = useState(0);

  const loadTrabajosRealizados = async () => {
    const datos = await getTrabajosRealizados();
    setTrabajosRealizados(datos);
  };

  const trabajosPorFecha = async () => {
    try {
      const datos = await getTrabajosRealizados();

      const annoActual = moment().year();
      const annoPasado = annoActual - 1;

      const trabajosAnnoActual = datos.filter(
        (dato) => moment(dato.fecha).year() === annoActual
      ).length;
      const trabajosAnnoPasado = datos.filter(
        (dato) => moment(dato.fecha).year() === annoPasado
      ).length;

      setTrabajosAnnoActual(trabajosAnnoActual);
      setTrabajosAnnoPasado(trabajosAnnoPasado);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    loadTrabajosRealizados();
    trabajosPorFecha();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={3} sx={{ p: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ flexGrow: 1, display: "flex", height: 200 }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Historico" {...a11yProps(0)} />
            <Tab label="Año Pasado" {...a11yProps(1)} />
            <Tab label="Año Actual" {...a11yProps(2)} />
            <Tab label="Gráficos" {...a11yProps(3)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Typography variant="h5" marginLeft={5}>
              Trabajos Realizados
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MapsHomeWork
                sx={{ height: 100, width: 100, opacity: 0.3, ml: 5 }}
              />
              <Typography variant="h4" marginLeft={5}>
                {trabajosRealizados.length}
              </Typography>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography variant="h5" marginLeft={5}>
              Trabajos Realizados
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MapsHomeWork
                sx={{ height: 100, width: 100, opacity: 0.3, ml: 5 }}
              />
              <Typography variant="h4" marginLeft={5}>
                {trabajosAnnoPasado}
              </Typography>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography variant="h5" marginLeft={5}>
              Trabajos Realizados
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MapsHomeWork
                sx={{ height: 100, width: 100, opacity: 0.3, ml: 5 }}
              />
              <Typography variant="h4" marginLeft={5}>
                {trabajosAnnoActual}
              </Typography>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                //  border: "1px solid"
              }}
            >
              <GraficoObras />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                //  border: "1px solid"
              }}
            >
            <Typography fontSize='10px' color='#ff0000'>Prom. Trabajos Por Año</Typography>
            <Typography fontSize='10px' color='#00ff00' paddingLeft="5px">Trabajos año {moment().year()-1}</Typography>
            <Typography fontSize='10px' color='#0000ff' paddingLeft="5px">Trabajos año  {moment().year()-2}</Typography>
            </Box>
          </TabPanel>
        </Box>
      </Box>
    </Paper>
  );
}
