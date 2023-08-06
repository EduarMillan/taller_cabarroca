import { connect2 } from "../database";

export const get_Materiales_de_Ordenes = async (req, res) => {
    const [row] = await (
      await connect2()
    ).query("SELECT * FROM materialestrabajosrealizados");
    res.json(row);
  };
  
  export const deleteMaterialOrdenes = async (req, res) => {
    await (
      await connect2()
    ).query("DELETE FROM materialestrabajosrealizados WHERE id =?", [req.params.id]);
    res.sendStatus(204);
  };
  
  export const updateMaterialOrdenes = async (req, res) => {
    await (
      await connect2()
    ).query("UPDATE materialestrabajosrealizados SET ? WHERE id=?", [req.body, req.params.id]);
    res.sendStatus(204);
  };
  
  export const getMaterialOrdenes = async (req, res) => {
    const [row] = await (
      await connect2()
    ).query("SELECT * FROM materialestrabajosrealizados WHERE id_orden = ?", [req.params.id]);
    if (row.length == 0) {
      res.json("Material no encontrado");
    } else {
      res.json(row);
    }
  };

  export const getMaterialOrdenesEditing = async (req, res) => {
    const [row] = await (
      await connect2()
    ).query("SELECT * FROM materialestrabajosrealizados WHERE id = ?", [req.params.id]);
    if (row.length == 0) {
      res.json("Material no encontrado");
    } else {
      res.json(row);
    }
  };
  
  export const saveMaterialesTrabajos = async (req, res) => {
      await (
        await connect2()        
      ).query(
        "INSERT INTO materialestrabajosrealizados (id_orden, nombre, espesor, color, descripcion, medida_largo, medida_ancho, precio_largo, precio_m2, precio_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
        [
          req.body.id_orden,
          req.body.nombre,
          req.body.espesor,
          req.body.color,
          req.body.descripcion,
          req.body.medida_largo,
          req.body.medida_ancho,
          req.body.precio_largo,
          req.body.precio_m2,
          req.body.precio_total,
        ]
      );      
  };

  export const getContadorMaterialesOrdenes = async (req, res) => {
    const [row] = await (
      await connect2()
    ).query("SELECT COUNT(*) FROM materialestrabajosrealizados");
    res.json(row[0]["COUNT(*)"]);
  };

