import { Router } from "express";
import authRoutes from './auth.route.js';
import productRoutes from './product.route.js';
import categoryRoutes from './category.route.js';
import userRoutes from './user.route.js';
import analystcRoute from './analystc.route.js';



const router = Router();




router.use('/api/auth',authRoutes);
router.use('/api/product',productRoutes);
router.use('/api/category',categoryRoutes);
router.use('/api/user',userRoutes);
router.use('/api/analystic',analystcRoute);



export default router;

