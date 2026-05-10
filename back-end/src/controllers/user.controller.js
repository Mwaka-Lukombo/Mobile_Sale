
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';



export const getUsers = async (req, res) => {
  let {
    search,
    page,
    limit
  } = req.query;

  try {

    let filter = {};
    page = Math.max(1, Number(page));
    limit = Math.max(1, Number(limit));

    if(search){
      filter.name = {
        $regex:search,
        $options:"i"
      }
    }
    
    const total = await User.countDocuments(filter);
     const skip = (page - 1) * limit;
      const totalPages = Math.ceil((total / limit));

    const users = await User.find(filter)
      .select("-password -tokenForgotPassword -expiresTokenForgetPassword")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    

    res.status(200).json({
      users,
      totalPages,
      currentPage:page  
    });

  } catch (error) {
    console.log("ErrorInGetUsers:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const create = async(req,res)=>{
    const {
        name,
        email,
        password
    } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        if(password.length < 5){
            return res.status(400).json({message:"Password must be 6 characteres"})
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({message:"User already exits"});
        }

        //Crypting password
        const genSalt = await bcrypt.genSalt(12);
         const hashPassword = await bcrypt.hash(password,genSalt)

        const newUser = new User({
            name,
            email:email,
            password:hashPassword,
            role:"user"
        })

        await newUser.save();

        // we was sending email, if we have normal plan, for new credentials

        res.status(201).json({
            user:{
                ...newUser._doc,
                password:undefined
            },
            message:"User created successfully"
        })
        
    try {
        
    } catch (error) {
        console.log(`ErrorInCreateUserController `,error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const edit = async(req,res)=>{
    const {id} = req.params;
     const {name,email,password} = req.body;

     try {

        const user = await User.findById(id);
        

        if(!user){
            return res.status(404).json({message:"User not found!"});
        }

        user.name = name;
        user.email = email;
        user.password = password;

        await user.save();

        res.status(200).json({
            user:{
                ...user._doc,
                password:undefined
            },
            message:"User updated successfully"
        })
         
     } catch (error) {
        console.log(`ErrorInUpdateUserController `,error.message);
        res.status(500).json({message:"Internal Server Error"});
     }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {
    console.log("ErrorInDeleteUser:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



