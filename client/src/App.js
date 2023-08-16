import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import FormularioMateriales from "./components/FormularioMateriales";
import ListaMateriales from "./components/ListaMateriales";
import ListaTrabajosRealizados from "./components/ListaTrabajosRealizados";
import ComponeteGeneralTrabajos from "./components/ComponeteGeneralTrabajos";
import Inicio from "./components/Inicio";
//import Formulario_Materiales_Ordenes from "./components/Formulario_Materiales_Ordenes";

const App = () => {
  return (
    <>
      <BrowserRouter>
          <Routes>
          <Route path="*" element={<Inicio />} />
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="/trabajos_realizados" element={<ListaTrabajosRealizados/>}/>
          <Route path="/trabajos_realizados/nuevo" element={<ComponeteGeneralTrabajos />} />
          <Route path="/trabajos_realizados/:id" element={<ComponeteGeneralTrabajos />}/>
          <Route path="/materiales" element={<ListaMateriales />} />
          <Route path="/materiales/nuevo" element={<FormularioMateriales />} />
          <Route path="/materiales/:id" element={<FormularioMateriales />} />
          {/*<Route path="/materialestrabajosrealizados/:id" element={<Componete_General_Trabajos />} />*/}  
          </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
