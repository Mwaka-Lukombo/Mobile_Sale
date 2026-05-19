import {Router} from 'express';
import { 
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductByCategory,
    getProductSingle,
    updateProduct
 } from '../controllers/acessorio.controller.js';

import {
    protectedRoute,
    isAdmin
} from '../middlewares/Protected.js';


const router = Router();


router.use(protectedRoute);
router.get('/',getAllProducts);
router.get('/byCategory',getProductByCategory);
router.get('/:id',getProductSingle);

router.use(isAdmin);
router.post('/',createProduct);
router.delete('/:productId',deleteProduct);
router.post('/:productId',updateProduct);


export default router;










