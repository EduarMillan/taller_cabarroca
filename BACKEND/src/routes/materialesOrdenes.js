import { Router } from "express";
import {
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



export default router;