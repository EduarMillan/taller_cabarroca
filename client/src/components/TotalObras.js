import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Paper, Typography, Tab, Tabs } from "@mui/material";
import { MapsHomeWork } from "@mui/icons-material";
import { getTrabajosRealizados } from "../api";

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

  const loadTrabajosRealizados = async () => {
    const datos = await getTrabajosRealizados();
    setTrabajosRealizados(datos);
  };

  useEffect(() => {
    loadTrabajosRealizados();
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
          </Tabs>
          <TabPanel value={value} index={0}>
            <MapsHomeWork sx={{ height: 80, width: 80, opacity: 0.3, mr: 1 }} />
            <Typography variant="h5">{trabajosRealizados.length}</Typography>
            <Typography variant="h7">   Total de Trabajos Realizadas. Histórico </Typography>
          </TabPanel>
          <TabPanel value={value} index={1}>
          <MapsHomeWork sx={{ height: 80, width: 80, opacity: 0.3, mr: 1 }} />
            <Typography variant="h5">{trabajosRealizados.length}</Typography>
            <Typography variant="h7"> Total Trabajos Realizadas. Año Pasado </Typography>
          </TabPanel>
          <TabPanel value={value} index={2}>
          <MapsHomeWork sx={{ height: 80, width: 80, opacity: 0.3, mr: 1 }} />
            <Typography variant="h5">{trabajosRealizados.length}</Typography>
            <Typography variant="h7">   Total Trabajos Realizadas. Año Actual </Typography>
          </TabPanel>
        </Box>
      </Box>
    </Paper>
  );
}
