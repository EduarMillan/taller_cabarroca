import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Inicio";
import Formulario_Materiales from "./components/Formulario_Materiales";
import Lista_Materiales from "./components/Lista_Materiales";
import Lista_Trabajos_Realizados from "./components/Lista_Trabajos_Realizados";
import Navbar from "./components/Navbar";
import Componete_General_Trabajos from "./components/Componete_General_Trabajos";
import Inicio from "./components/Inicio";
import TablaDesplegable from "./components/TablaDesplegable";


const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
        <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<Inicio />} />
          <Route path="/tabladesplegable" element={<TablaDesplegable/>} />
          
          <Route path="/trabajos_realizados" element={<Lista_Trabajos_Realizados/>}/>
          <Route path="/trabajos_realizados/nuevo" element={<Componete_General_Trabajos />} />
          <Route path="/trabajos_realizados/:id" element={<Componete_General_Trabajos />}/>
          <Route path="/materiales" element={<Lista_Materiales />} />
          <Route path="/materiales/nuevo" element={<Formulario_Materiales />} />
          <Route path="/materiales/:id" element={<Formulario_Materiales />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
