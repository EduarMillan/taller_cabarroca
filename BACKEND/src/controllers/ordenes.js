import connect2 from '../database';

export const getOrdenes = async (req, res) => {
  const [row] = await (
    await connect2()
  ).query('SELECT * FROM trabajos_realizados');
  res.json(row);
};

export const getOrden = async (req, res) => {
  const [row] = await (
    await connect2()
  ).query('SELECT * FROM trabajos_realizados WHERE id = ?', [req.params.id]);
  if (row.length === 0) {
    res.json('Orden no encontrada');
  } else {
    res.json(row);
  }
};

export const getContadorOrdenes = async (req, res) => {
  const [row] = await (
    await connect2()
  ).query('SELECT COUNT(*) FROM trabajos_realizados');
  res.json(row[0]['COUNT(*)']);
};

export const saveOrdenes = async (req) => {
  const pagoEfectivo = req.body.pago_efectivo;
  const costoMateriales = 0;
  let impRepres;
  let onat;
  const otrosGastos = req.body.costo_otros_gastos;

  if (pagoEfectivo === 'si') {
    impRepres = 0;
    onat = 0;
  } else {
    impRepres = req.body.precio * 0.11;
    onat = (req.body.precio - impRepres) * 0.35;
  }

  const impEquipos = (req.body.precio - impRepres - onat - otrosGastos - costoMateriales) * 0.1;
  const utilidad = req.body.precio - impRepres - onat - impEquipos - otrosGastos
    - costoMateriales;
  await (await connect2()).query(
    'INSERT INTO trabajos_realizados ( nombre, descripcion, pago_efectivo, precio, fecha, otros_gastos_descripcion, costo_otros_gastos, impRepres, impuestoOnat, impuestoEquipos, costo_total, utilidad, facturado, entidad) VALUES ( ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?)',
    [
      req.body.nombre,
      req.body.descripcion,
      req.body.pago_efectivo,
      req.body.precio,
      req.body.fecha,
      req.body.otros_gastos_descripcion,
      req.body.costo_otros_gastos,
      impRepres,
      onat,
      impEquipos,
      costoMateriales,
      utilidad,
      req.body.facturado,
      req.body.entidad,
    ],
  );
};

export const deleteOrden = async (req, res) => {
  await (
    await connect2()
  ).query('DELETE FROM trabajos_realizados WHERE id =?', [req.params.id]);

  await (
    await connect2()
  ).query('DELETE FROM materialestrabajosrealizados WHERE id_orden =?', [req.params.id]);
  res.sendStatus(204);
};

export const updateOrden = async (req, res) => {
  const pagoEfectivo = req.body.pago_efectivo;
  const otrosGastos = req.body.costo_otros_gastos;
  let impRepres;
  let onat;
  const costoTotal = req.body.costo_total;

  if (pagoEfectivo === 'si') {
    impRepres = 0;
    onat = 0;
  } else {
    impRepres = req.body.precio * 0.11;
    onat = (req.body.precio - impRepres) * 0.35;
  }

  const impEquip = (req.body.precio - impRepres - onat - req.body.costo_total - otrosGastos) * 0.1;
  const utilidad = (req.body.precio - impRepres - onat - impEquip - otrosGastos - costoTotal);
  await (await connect2()).query(
    'UPDATE trabajos_realizados SET nombre = ?, descripcion = ?, pago_efectivo = ?, precio = ?, fecha = ?, otros_gastos_descripcion = ?, costo_otros_gastos = ?, impRepres = ?, impuestoOnat =?, impuestoEquipos = ?, costo_total = ?, utilidad=?, facturado = ?, entidad=?  WHERE id=?',
    [
      req.body.nombre,
      req.body.descripcion,
      req.body.pago_efectivo,
      req.body.precio,
      req.body.fecha,
      req.body.otros_gastos_descripcion,
      req.body.costo_otros_gastos,
      impRepres,
      onat,
      impEquip,
      req.body.costo_total,
      utilidad,
      req.Gdy.facturado,
      req.body.entidad,
      req.params.id,
    ],
  );
  res.sendStatus(204);
};
