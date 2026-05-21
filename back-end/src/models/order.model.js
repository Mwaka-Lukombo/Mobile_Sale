import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

   userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
   },

   items:[
      {
         productId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            refPath:"items.type"
         },

         type:{
            type:String,
            enum:["Product","Acessorio","Tablet"],
            required:true
         },

         quantity:{
            type:Number,
            required:true
         },

         price:{
            type:Number,
            required:true
         },

         subtotal:{
            type:Number,
            required:true
         },

         name:{
            type:String
         },

         image:{
            type:String
         }
      }
   ],

   total:{
      type:Number,
      required:true
   },

   paymentMethod:{
      type:String,
      default:"mpesa"
   },

   status:{
      type:String,
      enum:[
         "pending",
         "paid",
         "cancelled"
      ],
      default:"paid"
   },
   data:{
      type:Date,
      defautl:Date.now()
   }

},{
   timestamps:true
});

const Order = mongoose.model("Order", orderSchema);

export default Order;