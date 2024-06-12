import { Router } from 'express';

import { AuthRoutes } from '../modules/Auth/auth.route';
import { RoomRoutes } from '../modules/Room/room.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
