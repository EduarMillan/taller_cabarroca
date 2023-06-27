import React, { useEffect, useState } from "react";
import {tareas as data} from './Lista_Tareas'

function Calculator() {

const [tareas, setTareas] = useState([]);

useEffect(()=>{
  setTareas(data)
}, []); 

return (
  <>
     {tareas.map((tarea) => (
        <div key={tarea.id}>
          <h1>{tarea.nombre}</h1>
          <p>{tarea.autor}</p>
        </div>
     ))} 
  </>
)
}

export default Calculator;
