import express from 'express';
import { USER_ROLE } from '../User/user.constant';
import { auth } from '../../middleware/auth';
import { BookingControllers } from './booking.controller';

const router = express.Router();

//directly use my bookings for authenticate users
router.get('/', auth(USER_ROLE.user), BookingControllers.getMyBookings);

export const myBookingsRoutes = router;
