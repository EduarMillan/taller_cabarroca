import { connect2 } from "../database";
import { getMaterialOrdenes } from "./materiales_Ordenes";

export const getOrdenes = async (req, res) => {
  const [row] = await (
    await connect2()
  ).query("SELECT * FROM trabajos_realizados");
  res.json(row);
};

export const getOrden = async (req, res) => {
  const [row] = await (
    await connect2()
  ).query("SELECT * FROM trabajos_realizados WHERE id = ?", [req.params.id]);
  if (row.length == 0) {
    res.json("Orden no encontrada");
  } else {
    res.json(row);
  }
};

export const getContadorOrdenes = async (req, res) => {
  const [row] = await (
    await connect2()
  ).query("SELECT COUNT(*) FROM trabajos_realizados");
  res.json(row[0]["COUNT(*)"]);
};

export const saveOrdenes = async (req, res) => {
 
  let pagoEfectivo = req.body.pago_efectivo;
  let costo_materiales = 0; 
  let impuesto_representacion = 0;
  let impuesto_onat = 0;
   
    if (pagoEfectivo =='si')
    {
       impuesto_representacion = 0;
       impuesto_onat = 0;
    }
    else{
       impuesto_representacion = req.body.precio * 0.11;
       impuesto_onat = (req.body.precio - impuesto_representacion) * 0.35;
    }
 
  let impuesto_equipos =
    (req.body.precio -
      impuesto_representacion -
      impuesto_onat -
      costo_materiales) *
    0.1;
  let utilidad =
    req.body.precio -
    impuesto_representacion -
    impuesto_onat -
    impuesto_equipos -
    costo_materiales;
  await (
    await connect2()
  ).query(
    "INSERT INTO trabajos_realizados ( nombre, descripcion, pago_efectivo, precio, fecha, otros_gastos_descripcion, costo_otros_gastos, impuesto_representacion, impuesto_onat, impuesto_equipos, costo_total, utilidad, facturado, entidad) VALUES ( ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?)",
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
      costo_materiales,
      utilidad,
      req.body.facturado,
      req.body.entidad
    ]
  );
};

export const deleteOrden = async (req, res) => {
  await (
    await connect2()
  ).query("DELETE FROM trabajos_realizados WHERE id =?", [req.params.id]);

  await (
    await connect2()
  ).query("DELETE FROM materialestrabajosrealizados WHERE id_orden =?", [req.params.id]);
  res.sendStatus(204);
};

export const updateOrden = async (req, res) => {
  let pago_Efectivo = req.body.pago_efectivo;
  let costo_materiales = 0;
  
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
    "UPDATE trabajos_realizados SET nombre = ?, descripcion = ?, pago_efectivo = ?, precio = ?, fecha = ?, otros_gastos_descripcion = ?, costo_otros_gastos = ?, impuesto_representacion = ?, impuesto_onat =?, impuesto_equipos = ?, costo_total = ?, utilidad=?, facturado = ?, entidad=?  WHERE id=?",
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
      req.body.entidad,
      req.params.id
    ]
  );
  res.sendStatus(204);
};