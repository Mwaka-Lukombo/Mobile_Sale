import {Router} from 'express'
import { 
    addCart,
    allProduct,
    clientProducts,
    createProduct,
    deleteProduct,
    editProduct,
    getCart,
    getProductsByCategory,
    productSingle,
    removeCart,
    searchProduct,
    updateCart
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
router.get('/clientProducts',clientProducts);

router.use(protectedRoute);
router.post('/addToCart/:id',addCart);
router.get('/getCart',getCart);
router.post('/updatedCart/:productId',updateCart);
router.delete('/cartDelete/:id',removeCart);

router.use(isAdmin);
router.post('/create',createProduct);
router.post('/edit/:id',editProduct);
router.delete('/delete/:id',deleteProduct);


export default router;




