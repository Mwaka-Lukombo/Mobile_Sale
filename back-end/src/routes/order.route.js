import {Router} from 'express';
import { getMyOrders, payment } from '../controllers/order.controller.js';
import {
    protectedRoute
} from '../middlewares/Protected.js';

const router = Router();



router.use(protectedRoute);

router.post('/payment',payment);
router.get('/myOrders',getMyOrders);






export default router;










