import {Router} from 'express'
import { 
    addCart,
    allProduct,
    createProduct,
    deleteProduct,
    editProduct,
    getCart,
    getProductsByCategory,
    productSingle,
    searchProduct
 } from '../controllers/product.controller.js';
import { 
    isAdmin, 
    protectedRoute 
} from '../middlewares/Protected.js';


const router = Router();



router.get('/search',searchProduct);
router.get('/',allProduct);



router.get('/productSingle/:id',productSingle);
router.get("/by-category", getProductsByCategory);

router.use(protectedRoute);
router.post('/addToCart/:id',addCart);
router.get('/getCart',getCart);

router.use(isAdmin);
router.post('/create',createProduct);
router.post('/edit/:id',editProduct);
router.delete('/delete/:id',deleteProduct);


export default router;




