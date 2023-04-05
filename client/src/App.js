import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Inicio";
import Formulario_Materiales from "./components/Formulario_Materiales";
import Lista_Materiales from "./components/Lista_Materiales";
import Lista_Trabajos_Realizados from "./components/Lista_Trabajos_Realizados";
import Navbar from "./components/Navbar";
import Formulario_Trabajos from "./components/Formulario_Trabajos";
import Inicio from "./components/Inicio";
import TablaDesplegable from "./components/TablaDesplegable";


const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="*" element={<Inicio />} />
          <Route path="/tabladesplegable" element={<TablaDesplegable/>} />
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="/trabajosrealizados" element={<Lista_Trabajos_Realizados />}/>
          <Route path="/trabajosrealizados/nuevo" element={<Formulario_Trabajos />} />
          <Route path="/trabajosrealizados/:id" element={<Formulario_Trabajos />}/>
          <Route path="/materiales" element={<Lista_Materiales />} />
          <Route path="/materiales/nuevo" element={<Formulario_Materiales />} />
          <Route path="/materiales/:id" element={<Formulario_Materiales />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
