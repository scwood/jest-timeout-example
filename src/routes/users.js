import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import authenticate from '../middleware/authenticate';
import checkForParams from '../middleware/checkForParams';

const controller = new UsersController();
const router = new Router();

router.route('/')
  .post(checkForParams(['token']), controller.createUser);
router.route('/me')
  .get(authenticate, controller.getMe)
  .patch(authenticate, controller.updateMe);

export default router;
