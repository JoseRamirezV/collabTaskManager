import { Router } from 'express';

import {
  login,
  remove,
  signup,
  update,
  verifyToken,
} from '#controllers/user.controller.js';
import Auth from '#middlewares/auth.middleware.js';

const router = Router();

router.get('/:email&:password', login);
router.post('/signUp', signup);
router.put('/:id', Auth, update);
router.delete('/passwordCheck', Auth, remove);
router.get('/isLogged/:token', verifyToken);

export default router;
