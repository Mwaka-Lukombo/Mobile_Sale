import {Router} from 'express';
import { 
    createInformation, 
    getInformations, 
    updateInformation

} from '../controllers/loja.controller.js';
import{
    protectedRoute,
    isAdmin
} from '../middlewares/Protected.js';


const router = Router();


router.use(protectedRoute);

router.get('/',getInformations);
router.post('/',isAdmin,createInformation);
router.post('/update',isAdmin,updateInformation);


export default router;








