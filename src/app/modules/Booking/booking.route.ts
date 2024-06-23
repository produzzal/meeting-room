import express from 'express';

import { BookingControllers } from './booking.controller';

import { USER_ROLE } from '../User/user.constant';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.post('/', auth(USER_ROLE.user), BookingControllers.createBooking);

router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings);

router.get('/my-bookings', BookingControllers.getMyBookings);

router.put('/:id', auth(USER_ROLE.admin), BookingControllers.updateBooking);

router.delete('/:id', auth(USER_ROLE.admin), BookingControllers.deleteBooking);
export const bookingsRoutes = router;
