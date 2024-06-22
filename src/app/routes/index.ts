import { Router } from 'express';

import { AuthRoutes } from '../modules/Auth/auth.route';
import { RoomRoutes } from '../modules/Room/room.route';
import { slotsRoutes } from '../modules/Slot/slot.route';
import { bookingsRoutes } from '../modules/Booking/booking.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
