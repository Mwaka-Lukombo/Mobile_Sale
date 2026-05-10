import {Router} from 'express';
import { 
    homeAnalystic
 } from '../controllers/analystc.controller.js';

 import {
    protectedRoute,
    isAdmin
 } from '../middlewares/Protected.js';

const router = Router();


router.use(protectedRoute,isAdmin);

router.get('/home',homeAnalystic);




export default router;









