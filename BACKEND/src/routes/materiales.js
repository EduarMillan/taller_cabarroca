import { Router } from 'express';
import {
  deleteMaterial,
  getMaterial,
  getContadorMateriales,
  getMateriales,
  saveMateriales,
  updateMaterial,
} from '../controllers/materiales';

const router = Router();

/**
 * @swagger
 * /materiales:
 *  get:
 *    summary: Muestra todos los materiales existentes en la base de datos
 */
router.get('/materiales', getMateriales);

/**
 * @swagger
 * /materiales/count:
 *  get:
 *    summary: Devuelve la cantidad de materiales existentes en la base de datos
 */
router.get('/materiales/count', getContadorMateriales);

/**
 * @swagger
 * /materiales/:
 *  get:
 *    summary: Show 1 material  existente en la BD  mediante un id, de no existir retorna un mensaje
 */
router.get('/materiales/:id', getMaterial);

/**
 * @swagger
 * /materiales:
 *  post:
 *    summary: salva los materiales introducidos en la base de datos
 */
router.post('/materiales', saveMateriales);

/**
 * @swagger
 * /materiales:
 *  delete:
 *    summary: Elimina un materiales existente en la base de datos mediante un id especificado
 */
router.delete('/materiales/:id', deleteMaterial);

/**
 * @swagger
 * /materiales:
 *  put:
 *    summary: Actualiza un material existentes en la base de datos usando un id
 */
router.put('/materiales/:id', updateMaterial);

export default router;
