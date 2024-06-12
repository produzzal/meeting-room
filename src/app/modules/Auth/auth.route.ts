import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from '../User/user.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.UserValidationSchema),
  AuthControllers.signup,
);
router.post('/login', AuthControllers.login);

export const AuthRoutes = router;
