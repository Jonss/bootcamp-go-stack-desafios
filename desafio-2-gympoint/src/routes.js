import { Router } from 'express';
import SigninController from './app/controllers/SigninController';

const routes = new Router();

routes.get('/health_check', (req, res) => res.json({ message: 'OK Gympoint' }));

routes.post('/signin', SigninController.store);

export default routes;
