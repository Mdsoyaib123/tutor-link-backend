import { Router } from 'express';
import { userRoute } from '../modules/User/user.routes';
import { subjectRoutes } from '../modules/Subject/subject.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/subjects',
    route: subjectRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
