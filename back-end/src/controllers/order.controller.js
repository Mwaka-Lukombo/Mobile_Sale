import User from "../models/user.model.js";
import Order from "../models/order.model.js";

import {Product} from "../models/product.model.js";
import {Tablet} from "../models/product.model.js";
import {Acessorio} from "../models/product.model.js";





export const payment = async(req,res)=>{

    const models = {
        Product,
        Tablet,
        Acessorio
    };

   try {

      const userId = req.user._id;

      const user = await User.findById(userId);

      if(!user){
         return res.status(404).json({
            message:"User not found"
         });
      }

      if(user?.carrinho?.length === 0){
         return res.status(400).json({
            message:"Cart is empty"
         });
      }


      const orderItems = [];

      let total = 0;

      for(const item of user.carrinho){

         const Model = models[item?.type];

         if(!Model){
            return res.status(400).json({
               message:"Invalid product type"
            });
         }

         const product = await Model.findById(
            item?.itemId
         );

         if(!product){
            return res.status(404).json({
               message:"Product not found"
            });
         }

         // validar stock
         if(product?.stock < item?.quantity){

            return res.status(400).json({
               message:`Insufficient stock for ${product?.name}`
            });
         }

         // subtotal
         const subtotal =
            product.price * item.quantity;

         total += subtotal;

         // diminuir stock
         product.stock =
            product?.stock - item?.quantity;

            product.orders = item?.quantity;

         await product.save();

         // adicionar no pedido
         orderItems.push({
            productId:product._id,
            type:item?.type,
            quantity:item.quantity,
            price:product.price,
            subtotal,
            name:product.name,
            image:product?.image.url
         });
      }

      
      const order = await Order.create({
         userId,
         items:orderItems,
         total,
         paymentMethod:"mpesa",
         status:"paid",
         data:new Date().toISOString()
      });

      user.carrinho = [];

      await user.save();

      res.status(201).json({
         order,
         message:"Payment successful"
      });

   } catch (error) {

      console.log(
         "ErrorInPayment",
         error.message
      );

      res.status(500).json({
         message:"Internal Server Error"
      });
   }
}


export const getMyOrders = async (req, res) => {

   const { _id: userId } = req.user;

   try {

      const orders = await Order.find({ userId })
         .sort({ createdAt: -1 });

      const totalSpent = orders.reduce(
         (acc, order) => acc + order.total,
         0
      );

      res.status(200).json({
         orders,
         totalSpent
      });

   } catch (error) {

      console.log(error?.message);

      res.status(500).json({
         message: "Internal Server Error"
      });
   }
}





