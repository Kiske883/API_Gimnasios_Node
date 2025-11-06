import { Router } from 'express';
import apiClientesRoutes from './api/clientes.routes.js';

const router = Router();
router.use('/clientes', apiClientesRoutes);

export default router;
