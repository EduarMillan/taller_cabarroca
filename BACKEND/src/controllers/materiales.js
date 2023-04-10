import { connect2 } from "../database";

export const getMateriales = async (req, res) => {
  const [row] = await (await connect2()).query("SELECT * FROM materiales");
  console.log(row);
  res.json(row);
};

export const getMaterial = async (req, res) => {
  const [row] = await (
    await connect2()
  ).query("SELECT * FROM materiales WHERE id = ?", [req.params.id]);
  if (row.length == 0) {
    res.json("Material no encontrado");
  } else {
    res.json(row);
  }
};

export const getContadorMateriales = async (req, res) => {
  const [row] = await (
    await connect2()
  ).query("SELECT COUNT(*) FROM materiales");
  res.json(row[0]["COUNT(*)"]);
};

export const saveMateriales = async (req, res) => {
  var cantidad_iteraciones = req.body.cantidad;
  var costo_del_m2 =
    req.body.costo_total / (req.body.longitud_ancho * req.body.longitud_largo);
  var costo_del_ml = req.body.costo_total / req.body.longitud_largo;
  while (cantidad_iteraciones > 0) {
    await (
      await connect2()
    ).query(
      "INSERT INTO materiales (nombre, descripcion, espesor, longitud_ancho, longitud_largo, calidad_material, costo_total, costo_m2, costo_ml, cantidad, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,'1',?)",
      [
        req.body.nombre,
        req.body.descripcion,
        req.body.espesor,
        req.body.longitud_ancho,
        req.body.longitud_largo,
        req.body.calidad_material,
        req.body.costo_total,
        costo_del_m2,
        costo_del_ml,
        req.body.color,
      ]
    );
    cantidad_iteraciones = cantidad_iteraciones - 1;
  }
};

export const deleteMaterial = async (req, res) => {
  await (
    await connect2()
  ).query("DELETE FROM materiales WHERE id =?", [req.params.id]);
  res.sendStatus(204);
};

export const updateMaterial = async (req, res) => {
  await (
    await connect2()
  ).query("UPDATE materiales SET ? WHERE id=?", [req.body, req.params.id]);
  res.sendStatus(204);
};
