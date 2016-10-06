import { Router } from 'express';

import AuthController from '../controllers/AuthController';
import checkForParams from '../middleware/checkForParams';

const controller = new AuthController();
const router = new Router();

router.route('/tokens')
  .post(checkForParams(['email', 'password']), controller.createToken);
router.route('/signUpEmail')
  .post(checkForParams(['email', 'password']), controller.sendSignUpEmail);

export default router;
