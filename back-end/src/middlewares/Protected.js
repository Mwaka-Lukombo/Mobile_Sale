import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { config } from 'dotenv';


config();


export const protectedRoute = async(req,res,next)=>{
    try {

        const token = req.cookies.jwt;

        if(!token){
            return res.status(403).json({message:"Dont have Token"})
        }

        const decoded = jwt.verify(token,process.env.SECRET);

        if(!decoded){
            return res.status(403).json({message:"Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({message:"User not found!"})
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.log(`ErrorInProtectedRoute `,error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const isAdmin = async(req,res,next)=>{
    const adminEmail = process.env.adminEmail;
     const {email} = req.user;
    try {

        if(email !== adminEmail){
            return res.status(403).json({message:"Your dont have permition"})
        }

        next();
        
    } catch (error) {
        console.log(`ErrorInAdminValidate `,error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}











