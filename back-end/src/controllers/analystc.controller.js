import User from '../models/user.model.js';
import Product from '../models/product.model.js';
import Category from '../models/category.model.js';




export const homeAnalystic = async(req,res)=>{
    try {

        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalCategorys = await Category.countDocuments();
        const products = await Product.find();
         const totalInventsment = products
         .map(product => product.price * product.stock)
         .reduce((acc,curr) => acc +curr, 0);

         
        res.status(200).json({
            totalUsers,
            totalCategorys,
            totalInventsment,
            totalProducts
        })
        
    } catch (error) {
        console.log(`ErrorInAnalystc Controller `,error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}












