import {Router} from 'express';
import {
    isAdmin, 
    protectedRoute

} from '../middlewares/Protected.js';
import { 
    create, 
    deleteUser, 
    edit, 
    getUsers 

} from '../controllers/user.controller.js';



const router = Router();


router.use(protectedRoute,isAdmin);


router.get('/',getUsers);
router.post('/',create);
router.post('/edit/:id',edit);
router.delete('/delete/:id',deleteUser);


export default router;







