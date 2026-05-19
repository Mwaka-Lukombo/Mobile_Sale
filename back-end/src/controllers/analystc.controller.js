import User from '../models/user.model.js';
import {Acessorio, Product, Tablet} from '../models/product.model.js';
import Category from '../models/category.model.js';




export const homeAnalystic = async(req,res)=>{
    try {

        const totalMobileProducts = await Product.countDocuments();
        const totalTabletProducts = await Tablet.countDocuments();
        const totalAcessorioProducts = await Acessorio.countDocuments();
        
        
        const totalUsers = await User.countDocuments();
        const totalCategorys = await Category.countDocuments();
        const products = await Product.find();
        const acessorios = await Acessorio.find();
         const tablets = await Tablet.find();

         const totalMobile = products
         .map(product => product.price * product.stock)
         .reduce((acc,curr) => acc +curr, 0);

         const totalAcessorios = acessorios
         .map(product => product.price * product.stock)
         .reduce((acc,curr) => acc +curr, 0);

         const totalTablets = tablets
         .map(product => product.price * product.stock)
         .reduce((acc,curr) => acc +curr, 0);

         let totalInventsment = (totalMobile + totalAcessorios + totalTablets);
         let totalProducts = (totalAcessorioProducts + totalTabletProducts + totalMobileProducts);

         
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












