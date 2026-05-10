import { Router } from "express";
import { 
    check,
    forgotPassword, 
    isAdmin, 
    login, 
    logout, 
    profile, 
    resetPassword, 
    signup 
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/Protected.js";




const router = Router();




router.post('/signup',signup);
router.post('/login',login);
router.post('/forget-password',forgotPassword);
router.post('/reset-password/:token',resetPassword);
router.post('/profile',profile);
router.post('/logout',logout);
router.get('/check',protectedRoute,check);
router.get('/isAdmin',protectedRoute,isAdmin);




export default router;



