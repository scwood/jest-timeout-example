import { Router } from 'express';

import authRoutes from './auth';
import entryRoutes from './entries';
import userRoutes from './users';

const router = new Router();

router.use('/auth', authRoutes);
router.use('/entries', entryRoutes);
router.use('/users', userRoutes);

export default router;
