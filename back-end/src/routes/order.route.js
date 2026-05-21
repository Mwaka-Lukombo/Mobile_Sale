import {Router} from 'express';
import { payment } from '../controllers/order.controller.js';
import {
    protectedRoute
} from '../middlewares/Protected.js';

const router = Router();



router.use(protectedRoute);

router.post('/payment',payment);






export default router;










