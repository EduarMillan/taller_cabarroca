import connect2 from '../database';

export const getPrecioMateriales = async (req, res) => {
  const [row] = await (
    await connect2()
  ).query('SELECT * FROM precio_materiales');
  res.json(row);
};

export const getPrecioMaterial = async (req, res) => {
  const [row] = await (
    await connect2()
  ).query('SELECT * FROM precio_materiales WHERE id=?', [req.params.id]);
  if (row.length === 0) res.json('No hay coincidencias');
  else res.json(row);
};

export const getContadorPrecioMateriales = async (req, res) => {
  const [row] = await (
    await connect2()
  ).query('SELECT COUNT(*) FROM precio_materiales');
  res.json(row[0]['COUNT(*)']);
};

export const savePrecioMaterial = async (req) => {
  await (
    await connect2()
  ).query(
    'INSERT INTO precio_materiales ( nombre, espesor, color, precio_ml, precio_m2) VALUES ( ?, ?, ?, ?, ?)',
    [
      req.body.nombre,
      req.body.espesor,
      req.body.color,
      req.body.precio_ml,
      req.body.precio_m2,
    ],
  );
};

export const deletePrecioMaterial = async (req, res) => {
  await (
    await connect2()
  ).query('DELETE FROM precio_materiales WHERE id=?', [req.params.id]);
  res.sendStatus(204);
};

export const updatePrecioMaterial = async (req, res) => {
  await (
    await connect2()
  ).query(
    'UPDATE precio_materiales SET nombre = ?, espesor = ?, color = ?, precio_ml = ?, precio_m2 = ?  WHERE id=?',
    [
      req.body.nombre,
      req.body.espesor,
      req.body.color,
      req.body.precio_ml,
      req.body.precio_m2,
      req.params.id,
    ],
  );
  res.sendStatus(204);
};
