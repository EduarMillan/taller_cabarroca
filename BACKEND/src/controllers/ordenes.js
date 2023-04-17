import { connect2 } from "../database";

export const getOrdenes = async (req, res) => {
  const [row] = await (
    await connect2()
  ).query("SELECT * FROM trabajosrealizados");
  res.json(row);
};

export const getOrden = async (req, res) => {
  const [row] = await (
    await connect2()
  ).query("SELECT * FROM trabajosrealizados WHERE id = ?", [req.params.id]);
  if (row.length == 0) {
    res.json("Orden no encontrada");
  } else {
    res.json(row);
  }
};

export const getContadorOrdenes = async (req, res) => {
  const [row] = await (
    await connect2()
  ).query("SELECT COUNT(*) FROM trabajosrealizados");
  res.json(row[0]["COUNT(*)"]);
};

export const saveOrdenes = async (req, res) => {
  const [rs] = await (
    await connect2()
  ).query("SELECT MAX(id) AS id FROM trabajosrealizados"); //uso esta consulta para darle un id mas tarde a los materiales usados en la orden a insertar

  var nombre_material = req.body.nombre_material; //capturo estos 3 parametros en estas variables para luego buscar en la base de datos de los materiales su promedio e introducir en la tabla de materiales de la orden los datos actualizados.
  var espesor_material = req.body.espesor;
  var color_material = req.body.color;
  var pagoEfectivo = req.body.pago_efectivo;

  const [promedio_m2] = await (
    await connect2()
  ).query(
    "SELECT AVG (costo_m2) FROM materiales WHERE nombre = ? AND espesor = ? AND color = ?",
    [nombre_material, espesor_material, color_material]
  );
  var prom_m2 = promedio_m2[0]["AVG (costo_m2)"];

  const [promedio_ml] = await (
    await connect2()
  ).query(
    "SELECT AVG(costo_ml) FROM materiales WHERE nombre = ? AND espesor = ? AND color = ?",
    [nombre_material, espesor_material, color_material]
  );
  var prom_ml = promedio_ml[0]["AVG(costo_ml)"];
  await (
    await connect2()
  ).query(
    "INSERT INTO materialestrabajosrealizados (id_orden, nombre, espesor, color, descripcion, medida_largo, medida_ancho, precio_largo, precio_m2, precio_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      rs[0].id + 1,
      'pvc',
      //req.body.nombre_material,
      3,
     // req.body.espesor,
     'azul',
      //req.body.color,
      'pvc malo',
      //req.body.descripcion_material,
      2,
     // req.body.medida_largo,
     1,
      //req.body.medida_ancho,
      10,
      //prom_ml,
      25,
      //prom_m2,
      50,
      //req.body.medida_largo * req.body.medida_ancho * prom_m2,
    ]
  );
  const [costo_total_materiales] = await (
    await connect2()
  ).query(
    "SELECT SUM(precio_total) FROM materialestrabajosrealizados WHERE id_orden = ?",
    [
      rs[0].id + 1
    ]
  );
    var costo_materiales = costo_total_materiales[0]['SUM(precio_total)'];
   
    if (pagoEfectivo =='si')
    {
      var impuesto_representacion = 0;
      var impuesto_onat = 0;
    }
    else{
      var impuesto_representacion = req.body.precio * 0.11;
      var impuesto_onat = (req.body.precio - impuesto_representacion) * 0.35;
    }
 
  var impuesto_equipos =
    (req.body.precio -
      impuesto_representacion -
      impuesto_onat -
      costo_materiales) *
    0.1;
  var utilidad =
    req.body.precio -
    impuesto_representacion -
    impuesto_onat -
    impuesto_equipos -
    costo_materiales;
  await (
    await connect2()
  ).query(
    "INSERT INTO trabajosrealizados (id,nombre, descripcion, pago_efectivo, precio, fecha, otros_gastos_descripcion, costo_otros_gastos, impuesto_representacion, impuesto_onat, impuesto_equipos, costo_total, utilidad, facturado) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?)",
    [
      rs[0].id + 1,
      req.body.nombre,
      req.body.descripcion,
      req.body.pago_efectivo,
      req.body.precio,
      req.body.fecha,
      req.body.otros_gastos_descripcion,
      req.body.costo_otros_gastos,
      impuesto_representacion,
      impuesto_onat,
      impuesto_equipos,
      costo_materiales,
      utilidad,
      req.body.facturado
    ]
  );
};

export const deleteOrden = async (req, res) => {
  await (
    await connect2()
  ).query("DELETE FROM trabajosrealizados WHERE id =?", [req.params.id]);

  await (
    await connect2()
  ).query("DELETE FROM materialestrabajosrealizados WHERE id_orden =?", [req.params.id]);
  res.sendStatus(204);
};

export const updateOrden = async (req, res) => {
  var pago_Efectivo = req.body.pago_efectivo;
 
  if (pago_Efectivo=='si')
  {
    var impuesto_representacion = 0;
    var impuesto_onat = 0;
  }
  else{
    var impuesto_representacion = req.body.precio * 0.11;
    var impuesto_onat = (req.body.precio - impuesto_representacion) * 0.35;
  }
 
  var impuesto_equipos =
    (req.body.precio -
      impuesto_representacion -
      impuesto_onat -
      req.body.costo_total) *
    0.1;
  var utilidad =
    req.body.precio -
    impuesto_representacion -
    impuesto_onat -
    impuesto_equipos -
    req.body.costo_total;
  await (
    await connect2()
  ).query(
    "UPDATE trabajosrealizados SET nombre = ?, descripcion = ?, pago_efectivo = ?, precio = ?, fecha = ?, otros_gastos_descripcion = ?, costo_otros_gastos = ?, impuesto_representacion = ?, impuesto_onat =?, impuesto_equipos = ?, costo_total = ?, utilidad=?, facturado = ?  WHERE id=?",
    [
      req.body.nombre,
      req.body.descripcion,
      req.body.pago_efectivo,
      req.body.precio,
      req.body.fecha,
      req.body.otros_gastos_descripcion,
      req.body.costo_otros_gastos,
      impuesto_representacion,
      impuesto_onat,
      impuesto_equipos,
      req.body.costo_total,
      utilidad,
      req.body.facturado,
      req.params.id,
    ]
  );
  res.sendStatus(204);
};