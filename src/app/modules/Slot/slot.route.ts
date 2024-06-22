import express from 'express';
import { SlotsControllers } from './slot.controller';
import validateRequest from '../../middleware/validateRequest';
import { SlotValidations } from './slot.validation';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(SlotValidations.slotValidationSchema),
  SlotsControllers.createSlotsController,
);

router.get('/availability', SlotsControllers.getAvailableSlots);

export const slotsRoutes = router;
