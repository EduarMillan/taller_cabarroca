import { Router } from "express";
import {
  getPrecioMateriales,
  getPrecioMaterial,
  getContadorPrecioMateriales,
  savePrecioMaterial,
  updatePrecioMaterial,
  deletePrecioMaterial
} from "../controllers/precio_Materiales";


const router = Router();

/**
 * @swagger
 * /precio_materiales:
 */
router.get("/precio_materiales", getPrecioMateriales);

/**
 * @swagger
 * /precio_materiales/count:
 * 
 */
router.get("/precio_materiales/count", getContadorPrecioMateriales);

/**
 * @swagger
 * /precio_materiales/:id
 */
router.get("/precio_materiales/:id", getPrecioMaterial);

/**
 * @swagger
 * /precio_materiales:
 */
router.post("/precio_materiales", savePrecioMaterial);

/**
 * @swagger
 * /precio_materiales: 
 */
router.delete("/precio_materiales/:id", deletePrecioMaterial);

/**
 * @swagger
 * /precio_materiales:
 */
router.put("/precio_materiales/:id", updatePrecioMaterial);

export default router;
