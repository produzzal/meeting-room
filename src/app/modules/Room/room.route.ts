import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { RoomControllers } from './room.controller';
import { RoomValidations } from './room.validation';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(RoomValidations.roomValidationSchema),
  RoomControllers.createRoom,
);

export const RoomRoutes = router;
