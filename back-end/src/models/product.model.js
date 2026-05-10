import mongoose from 'mongoose';





const productSchema = new mongoose.Schema({
    name:{type:String,required:[true,"Product name is required"]},
    category:{type:String,required:[true,"Category is Required"]},
    image:{url:{type:String},public_id:{type:String}},
    price:{type:Number,required:[true,"Price is Required"]},
    stock:{type:Number,required:[true,"Quantity Stock is required"]},
    stars:{type:Number},
    orders:{type:Number},
    sold:{type:Number},
},{
    timestamps:true
})


const Product = mongoose.model("Product",productSchema);

export default Product;











