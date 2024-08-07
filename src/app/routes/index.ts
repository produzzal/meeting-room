import { Router } from 'express';

import { AuthRoutes } from '../modules/Auth/auth.route';
import { RoomRoutes } from '../modules/Room/room.route';
import { slotsRoutes } from '../modules/Slot/slot.route';
import { bookingsRoutes } from '../modules/Booking/booking.route';
import { myBookingsRoutes } from '../modules/Booking/my-bookings.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/rooms',
    route: RoomRoutes,
  },
  {
    path: '/slots',
    route: slotsRoutes,
  },
  {
    path: '/bookings',
    route: bookingsRoutes,
  },
  {
    path: '/my-bookings',
    route: myBookingsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
