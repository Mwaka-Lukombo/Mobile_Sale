import { Router } from "express";


import {
    protectedRoute,
    isAdmin
} from '../middlewares/Protected.js';
import { 
    createProduct,
    deleteProduct,
    getAllProducts, 
    getProductSingle, 
    updateProduct

} from "../controllers/table.controller.js";


const router = Router();


router.use(protectedRoute);
router.get('/',getAllProducts);
router.get('/:id',getProductSingle);

router.use(isAdmin);
router.post('/',createProduct);
router.delete('/:productId',deleteProduct);
router.post('/:productId',updateProduct);



export default router;



