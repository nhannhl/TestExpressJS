import { Router } from 'express';
import ViewsController from '../controllers/views.controller';

const router = new Router();

router.get('/', ViewsController.testBCrypt);

export default router;