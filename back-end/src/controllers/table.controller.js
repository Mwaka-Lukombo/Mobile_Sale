import {Tablet} from '../models/product.model.js';
import cloudinary from '../lib/cloudinary.js';
import mongoose from 'mongoose';



const uploadFile = async(file,oldId = null)=>{
  try {
    
    if(oldId){
        await cloudinary.destroy(oldId);
    }

    const resultUpload = await cloudinary.uploader.upload(file)

    return {
        url:resultUpload.secure_url,
        public_id:resultUpload.public_id
    }
  } catch (error) {
     console.log('Falha no upload: ',error?.message);
  }
}


export const getAllProducts = async(req,res)=>{
 let {
    page, 
    limit
} = req.query;
    try {

        page = Math.max(1, Number(page));
        limit = Math.max(1, Number(limit));

        const total = await Tablet.countDocuments();
         const skip = (page - 1) * limit;
          const totalPages = Math.ceil((total / limit));

        const products = await Tablet.find()
        .skip(skip)
        .limit(limit)
        .sort({createdAt:-1})
        ;

        if(!products){
            return res.status(200).json([])
        }else{

        res.status(200).json({
            products,
            totalPages,
            currentPage:page
        });

       }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const getProductSingle = async(req,res)=>{
    const {id} = req.params;
    try {

        const product = await Tablet.findById(id);

        if(!product){
            return res.status(404).json({message:"Product not found!"})
        }

        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const createProduct = async(req,res)=>{
    const {
      name,
      category,
      image,
      price,
      stock,
      description,
      informations
    } = req.body;
    
    try {

        if(!name || !price || !stock || !description){
            return res.status(400).json({message:"All fields are required"})
        }

        //find product
        const product = await Tablet.findOne({name,category});

        if(product){
            return res.status(400).json({message:"Product already exists!"});
        }

        let imageData = {};
        //upload later

        if(image){
            imageData = await uploadFile(image,undefined);
        }
        
        const newProduct = new Tablet({
            name,
            category,
            price,
            stock,
            description,
            image:{
                ...imageData
            },
            informations
        })

        await newProduct.save();

        res.status(201).json({
            newProduct,
            message:"Product created Successfuly"
        })
        
    } catch (error) {
        console.log(error?.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const deleteProduct = async(req,res)=>{
    const {productId} = req.params;
    try {

        if(!mongoose.isValidObjectId(productId)){
            return res.status(400).json({message:"Invalid objectId"});
        }

        const product = await Tablet.findByIdAndDelete(productId);

        if(product?.image?.url){
            await uploadFile("",product.image?.public_id)
        }

        res.status(200).json({
            message:"Product deleted successfuly"
        })

        if(!product){
            res.status(404).json({message:"Product not found!"})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal Server Error", message:error.message});
    }
}

export const updateProduct = async(req,res)=>{
    const {
      name,
      category,
      image,
      price,
      stock,
      description
    } = req.body;
     const {productId} = req.params;

    try {

        if(!mongoose.isValidObjectId(productId)){
            return res.status(400).json({message:"Invalid ObjectId"});
        }

        const product = await Tablet.findById(productId);
        let imageUpload = {};

        if(image){
            imageUpload = await uploadFile(image,undefined);
        }

        product.name = name;
        product.price = price;
        product.stock = stock;
        product.category = category;
        product.description = description;
        product.image = imageUpload;

        await product.save();

        res.status(200).json({
            product,
            message:"Product updated successfully!"
        })
        
    } catch (error) {
        res.status(500).json({message:"Internal Server Error",message:error.message});
    }
}












