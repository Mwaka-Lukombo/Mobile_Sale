import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();


export const generateToken = (userId,res)=>{
    try{
      const token = jwt.sign({userId},process.env.SECRET);
      
      res.cookie("jwt",token,{
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        httOnly:true,
        maxAge:7 * 60 * 60 * 24 * 1000
      })


      return token;
    
    }catch(error){
        console.log(`Error in generatorToken: `,error.message)
    }
}




