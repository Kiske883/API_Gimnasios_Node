import { Router } from 'express';
import { create, getAll, getById, update, deleteById } from '../../controllers/clientes.controller.js';

const router = Router();

router.get('/', getAll);
router.get('/:clienteId', getById);

router.post('/', create);
router.put("/:clienteId", update);
router.delete("/:clienteId", deleteById);

export default router;
