import express from 'express';

import { BookingControllers } from './booking.controller';
import validateRequest from '../../middleware/validateRequest';
import { BookingValidations } from './booking.validation';
import { USER_ROLE } from '../User/user.constant';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.post('/', auth(USER_ROLE.user), BookingControllers.createBooking);

export const bookingsRoutes = router;
