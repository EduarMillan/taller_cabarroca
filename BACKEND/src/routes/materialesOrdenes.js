import { Router } from 'express';
import {
  getMaterialesOrdenes,
  saveMaterialesTrabajos,
  getMaterialOrdenes,
  deleteMaterialOrdenes,
  updateMaterialOrdenes,
  getContadorMaterialesOrdenes,
} from '../controllers/materiales_Ordenes';

const router = Router();

/**
 * @swagger
 * /materiales_Ordenes:
 *  post:
 *    summary: salva los materiales introducidos en la base de datos
 */
router.post('/materialestrabajosrealizados', saveMaterialesTrabajos);

/**
 * @swagger
 * /materiales_Ordenes/count:
 *  get:
 *    summary: Devuelve la cantidad de materiales existentes en la base de datos
 */
router.get('/materialestrabajosrealizados/count', getContadorMaterialesOrdenes);

/**
 * @swagger
 * /materiales_Ordenes:
 *  get:
 *    summary: Muestra todos los materiales existentes en la base de datos
 */
router.get('/materialestrabajosrealizados', getMaterialesOrdenes);

/**
 * @swagger
 * /materiales_Ordenes/:
 *  get:
 *    summary: Show 1 material  existente en la BD mediante un id, de no existir devuelve un mensaje
 */
router.get('/materialestrabajosrealizados/:id', getMaterialOrdenes);

/**
 * @swagger
 * /materiales:
 *  delete:
 *    summary: Elimina un materiales existente en la base de datos mediante un id especificado
 */
router.delete('/materialestrabajosrealizados/:id', deleteMaterialOrdenes);

/**
 * @swagger
 * /materiales:
 *  put:
 *    summary: Actualiza un material existentes en la base de datos usando un id
 */
router.put('/materialestrabajosrealizados/:id', updateMaterialOrdenes);

export default router;
