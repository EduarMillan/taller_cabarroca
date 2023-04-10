import React, { useState } from 'react';

const App = () => {
  const [id, setId] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [data, setData] = useState([]);

  const handleIdChange = (e) => {
    setId(e.target.value);
  }

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  }

  const handleAgregarClick = () => {
    if (id && descripcion) {
      const newData = [...data, { id, descripcion }];
      setData(newData);
      guardarEnBaseDeDatos(id, descripcion); // Llamada a método para guardar en la base de datos
      setId('');
      setDescripcion('');
    }
  }

  const handleEditarClick = (index) => {
    // Aquí se llamaría a un método para editar los datos en la base de datos
    // por ejemplo: basededatos.editarDato(index, newData);
    console.log(`Editando dato en la posición ${index}`);
  }

  const handleEliminarClick = (index) => {
    // Aquí se llamaría a un método para eliminar los datos en la base de datos
    // por ejemplo: basededatos.eliminarDato(index);
    console.log(`Eliminando dato en la posición ${index}`);
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  }

  const guardarEnBaseDeDatos = (id, descripcion) => {
    // Aquí se llamaría a un método para guardar los datos en la base de datos
    // por ejemplo: basededatos.guardarDato(id, descripcion);
    console.log(`Guardando dato en la base de datos: ID=${id}, Descripción=${descripcion}`);
  }

  return (
    <div>
      <h1>Tabla de Datos</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="number"
                  value={item.id}
                  onChange={(e) => {
                    const newData = [...data];
                    newData[index].id = e.target.value;
                    setData(newData);
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.descripcion}
                  onChange={(e) => {
                    const newData = [...data];
                    newData[index].descripcion = e.target.value;
                    setData(newData);
                  }}
                />
              </td>
              <td>
                <button onClick={() => handleEditarClick(index)}>Editar</button>
                <button onClick={() => handleEliminarClick(index)}>Eliminar</button>
              </td>
            </tr>
            ))}
    </tbody>
  </table>
  <h1>Formulario</h1>
  <form>
    <label>ID:</label>
    <input
      type="number"
      value={id}
      onChange={handleIdChange}
    />
    <br />
    <label>Descripción:</label>
    <input
      type="text"
      value={descripcion}
      onChange={handleDescripcionChange}
    />
    <br />
    <button type="button" onClick={handleAgregarClick}>Agregar</button>
  </form>
</div>
);
}

export default App;