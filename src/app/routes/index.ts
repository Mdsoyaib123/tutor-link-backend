import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { PaymentRouter } from '../modules/payment/payment.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/permit-tutor',
    route: UserRoutes,
  },
  {
    path: '/payment',
    route: PaymentRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
