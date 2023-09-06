import connect2 from '../database';

export const getMateriales = async (req, res) => {
  const [row] = await (await connect2()).query('SELECT * FROM materiales');
  res.json(row);
};

export const getMaterial = async (req, res) => {
  const [row] = await (
    await connect2()
  ).query('SELECT * FROM materiales WHERE id = ?', [req.params.id]);
  if (row.length === 0) {
    res.json('Material no encontrado');
  } else {
    res.json(row);
  }
};

export const getContadorMateriales = async (req, res) => {
  const [row] = await (
    await connect2()
  ).query('SELECT COUNT(*) FROM materiales');
  res.json(row[0]['COUNT(*)']);
};

export const saveMateriales = async (req) => {
  const cantIteraciones = req.body.cantidad;
  const costoM2 = req.body.costo_total / (req.body.longitud_ancho * req.body.longitud_largo);
  const costoMl = req.body.costo_total / req.body.longitud_largo;

  // Realizar la conexión a la base de datos antes de entrar al bucle
  const dbConnection = await connect2();

  const queries = [];

  for (let i = 0; i < cantIteraciones; i += 1) {
    queries.push(
      dbConnection.query(
        "INSERT INTO materiales (nombre, descripcion, espesor, longitud_ancho, longitud_largo, calidad_material, costo_total, costo_m2, costo_ml, cantidad, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,'1',?)",
        [
          req.body.nombre,
          req.body.descripcion,
          req.body.espesor,
          req.body.longitud_ancho,
          req.body.longitud_largo,
          req.body.calidad_material,
          req.body.costo_total,
          costoM2,
          costoMl,
          req.body.color,
        ],
      ),
    );
  }

  await Promise.all(queries);
};

export const deleteMaterial = async (req, res) => {
  await (
    await connect2()
  ).query('DELETE FROM materiales WHERE id =?', [req.params.id]);
  res.sendStatus(204);
};

export const updateMaterial = async (req, res) => {
  await (
    await connect2()
  ).query('UPDATE materiales SET ? WHERE id=?', [req.body, req.params.id]);
  res.sendStatus(204);
};
