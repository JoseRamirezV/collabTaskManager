import Auth from '#middlewares/auth.middleware';
import { Router } from 'express';

import {
  signup,
  verifyToken,
  update,
  remove,
  login,
} from '#controllers/user.controller';
const router = Router();

router.get('/:email&:password', login);
router.post('/signUp', signup);
router.put('/:id', Auth, update);
router.delete('/passwordCheck', Auth, remove);
router.get('/isLogged/:token', verifyToken);

export default router;
