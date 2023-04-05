import { Router } from "express";
import {
  get_Materiales_de_Ordenes,
} from "../controllers/ordenes";

const router = Router();

/**
 * @swagger
 * /materiales:
 *  get:
 *    summary: Muestra todos los materiales existentes en la base de datos
 */
router.get("/materialestrabajosrealizados", get_Materiales_de_Ordenes);

