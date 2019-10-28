import { Router } from 'express';

import SigninController from './app/controllers/SigninController';
import StudentController from './app/controllers/StudentsController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';

import auth from './app/middlewares/auth';

const routes = new Router();

routes.get('/health_check', (req, res) => res.json({ message: 'OK Gympoint' }));

routes.post('/signin', SigninController.store);

routes.use(auth);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.delete('/plans/:id', PlanController.delete);
routes.patch('/plans/:id', PlanController.update);

routes.post('/enrollments', EnrollmentController.store);

export default routes;
