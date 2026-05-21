import User from '../models/user.model.js';
import {
    generateToken
} from '../lib/generateToken.js';

import { 
    sendForgetEmail, 
    sendSuccessEmail 
} from '../lib/Mailtrap/emails.js';

import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import cloudinary from '../lib/cloudinary.js';


config();


const validEmail = (email)=>{
    return email?.toLowerCase();
}


const uploadFile = async (file, oldPublicId = null) => {
  try {
    
    if (oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId);
    }

    const result = await cloudinary.uploader.upload(file);

    return {
      url: result.secure_url,
      public_id: result.public_id
    };

  } catch (error) {
    throw new Error("Error uploading file: " + error.message);
  }
};


export const signup = async(req,res)=>{
    let {name,password,email} = req.body;
    
     email = validEmail(email);

    try {

      if(!name || !password || !email){
         return res.status(400).json({message:"All fields are required"})
      }
      
        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({message:"User already exists!"});
        }


        //Cryping password
        const genSalt = await bcrypt.genSalt(12);
         const hashPassword = await bcrypt.hash(password,genSalt);

           const newUser = new User({
             name,
             email,
             password:hashPassword
           });

           await newUser.save();

           if(newUser){
              
             //generateToken for him
             generateToken(newUser._id,res);

             res.status(201).json({
                user,
                message:"User created successfully"
             })
           }
        
    } catch (error) {
        console.log("Error inSignupController ",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const login = async(req,res)=>{
     let {email, password} = req.body;

     try {
         email = validEmail(email);

         if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
         }
         
         const user = await User.findOne({email});

         if(!user){
            return res.status(400).json({message:"Bad request!"});
         }
         
         //validPassword
         const isValid = await bcrypt.compare(password,user.password);

         if(!isValid){
            return res.status(400).json({message:"User or senha are incorrect"});
         }else{
            user.lastAccess = new Date(
              Date.now()
            );
            await user.save();
            //Generate Token
            generateToken(user._id,res);
            res.status(200).json({
                user,
                message:"Login successful"
            })
         }
     } catch (error) {
        console.log(`ErrorInLoginController `,error.message);
        res.status(500).json({message:"Internal Server Error"})
     }
}

export const forgotPassword = async(req,res)=>{
    let {email} = req.body;

    try {
        email = validEmail(email);

        if(!email){
            return res.status(400).json({message:"Put the email!"})
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"User not found!"});
        }
        
        const tokenForgotPassword =  crypto.randomBytes(32).toString('hex');
        const expiresForgotPassword = new Date(
        Date.now() + 48 * 60 * 60 * 1000 // +1 dia em ms
        );

        user.tokenForgotPassword = tokenForgotPassword;
        user.expiresTokenForgetPassword = expiresForgotPassword;

        await user.save();

        const link = `http://localhost:3000/reset-password/${tokenForgotPassword}`;
        
        //sendEMail
        sendForgetEmail(email,link);

        res.status(200).json({message:"Request Send Successfully!"})

    } catch (error) {
        console.log("Error inSendForgetPassword request ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, repeatPassword } = req.body;

  try {
    if (!token) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const user = await User.findOne({
      tokenForgotPassword: token,
      expiresTokenForgetPassword: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found or token expired!"
      });
    }

    if (!newPassword || !repeatPassword) {
      return res.status(400).json({
        message: "Not permitted empty fields"
      });
    }

    if (newPassword.length < 6 || repeatPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters!"
      });
    }

    if (newPassword !== repeatPassword) {
      return res.status(400).json({
        message: "Passwords do not match!"
      });
    }

    const genSalt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(newPassword, genSalt);

    user.password = hashPassword;

    //  limpar token após uso
    user.tokenForgotPassword = undefined;
    user.expiresTokenForgetPassword = undefined;

    await user.save();

    // usar email do user
    sendSuccessEmail(user.email);

    res.status(200).json({
      message: "Password reset successful"
    });

  } catch (error) {
    console.log("ErrorInResetPassword", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const profile = async(req,res)=>{
    const {profileImage} = req.body;
     const {_id} = req.user;

    try {
        
        if(!profileImage){
            return res.status(400).json({message:"profileImage is required!"});
        }

        const user = await User.findById(_id);

        if(!user){
            return res.status(404).json({message:"User not found!"});
        }

        const fileUpload = await uploadFile(profileImage,user?.profile?.public_id);

        user.profile = fileUpload;

        await user.save();

        res.status(200).json({message:"ProfileImage updated successfuly"});
        
    } catch (error) {
        console.log(`ErrorInProfile `,error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}


export const updateProfile = async(req,res)=>{

  try {
    const {_id} = req?.user;
    const {
      password,
      profile
    } = req.body;
    
    const user = await User.findById(_id);

    if(!user){
      return res.status(404).json({message:"User not found!"});
    }
    let imageProfile = {};

        if(profile){
          imageProfile = await uploadFile(
              profile,
              user?.profile?.public_id
          );

          user.profile = imageProfile;
        }


    user.profile = imageProfile;
    
    //cryption
    const genSalt = await bcrypt.genSalt(12);
     const passwordHash = await bcrypt.hash(password,genSalt);

    if(password && password !== ''){
       user.password = passwordHash;
      }
    await user.save();


    res.status(200).json({
      user,
      message:"Updated successfuly!"
    })

  } catch (error) {
    console.log(error?.message);
    res.status(500).json({message:"Internal Server Error"});
  }
}


export const check = async(req,res)=>{
    try {
        const user = req.user;

        res.status(200).json(user);
    } catch (error) {
        console.log(`ErrorToCheck `,error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}


export const logout = async(req,res)=>{
  try {
    res.clearCookie("jwt");
    res.status(200).json({message:"Logout successfully"})
  } catch (error) {
     console.log(`ErrorInLogoutController `,error.message);
     res.status(500).json({message:"Internal Server Error"})
  }
}






export const isAdmin = async(req,res)=>{
  const {email} = req.user;
  try {
    
    if(!email){
      return res.status(400).json({message:"Put the email"});
    }
    
    const user = await User.findOne({email});

    if(!user){
      return res.status(404).json({message:"User not found!"});
    }

    if(user.email === process.env.adminEmail){
       res.status(200).json({admin:true})
    }else{
       res.status(200).json({admin:false})
    }
  } catch (error) {
     console.log(`ErrorInValidationAdmin `,error.message);
     res.status(500).json({message:'Internal Server Error'});
  }
}



