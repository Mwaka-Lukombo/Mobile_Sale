import { Router } from "express";
import authRoutes from './auth.route.js';
import productRoutes from './product.route.js';
import categoryRoutes from './category.route.js';
import userRoutes from './user.route.js';
import analystcRoute from './analystc.route.js';
import acessoiesRoute from './acessorio.route.js';
import tableRoute from './table.route.js';
import lojaRoute from './loja.route.js';
import orderRoute from './order.route.js';


const router = Router();




router.use('/api/auth',authRoutes);
router.use('/api/product',productRoutes);
router.use('/api/category',categoryRoutes);
router.use('/api/user',userRoutes);
router.use('/api/analystic',analystcRoute);
router.use('/api/acessories',acessoiesRoute);
router.use('/api/tablet',tableRoute);
router.use('/api/loja',lojaRoute);
router.use('/api/order',orderRoute);



export default router;

