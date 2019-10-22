import { Router } from 'express';

const routes = new Router();

routes.get('/health_check', (req, res) => res.json({ message: 'OK Gympoint' }));

export default routes;
