import { Router } from "express";
import {
  deleteMaterialOrdenes,
  get_Materiales_de_Ordenes,
  saveMaterialesTrabajos,
  getMaterialOrdenes,
} from "../controllers/materiales_Ordenes";

const router = Router();

/**
 * @swagger
 * /materiales_Ordenes:
 *  post:
 *    summary: salva los materiales introducidos en la base de datos
 */
router.post("/materialestrabajosrealizados", saveMaterialesTrabajos);

/**
 * @swagger
 * /materiales_Ordenes:
 *  get:
 *    summary: Muestra todos los materiales existentes en la base de datos
 */
router.get("/materialestrabajosrealizados", get_Materiales_de_Ordenes);

/**
 * @swagger
 * /materiales_Ordenes/:
 *  get:
 *    summary: Muestra un material especificado existente en la base de datos mediante un id, en caso de no existeir devuelve un mensaje
 */
router.get("/materialestrabajosrealizados/:id", getMaterialOrdenes);

/**
 * @swagger
 * /materiales_Ordenes/:
 *  delete:
 *    summary: Elimina un materiales existente en la base de datos mediante un id especificado
 */
router.delete("/materialestrabajosrealizados/:id", deleteMaterialOrdenes);



export default router;