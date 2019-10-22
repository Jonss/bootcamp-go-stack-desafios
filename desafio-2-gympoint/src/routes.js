import { Router } from 'express';
import SigninController from './app/controllers/SigninController';
import StudentController from './app/controllers/StudentsController';
import auth from './app/middlewares/auth';

const routes = new Router();

routes.get('/health_check', (req, res) => res.json({ message: 'OK Gympoint' }));

routes.post('/signin', SigninController.store);

routes.use(auth);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

export default routes;
