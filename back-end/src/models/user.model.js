import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minLength: 6 },
  profile:{
    url:{type:String},
    public_id:{type:String}
  },
  lastAccess:{type:Date},
  carrinho: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath:"carrinho.type",
        required: true,
      },
      type:{
        type:String,
        enum:["Product","Acessorio","Tablet"]
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  role:{
    type:String,
    enum:['user',"admin"],
    default:'user'
  },

  tokenForgotPassword: { type: String },
  expiresTokenForgetPassword: { type: Date },
}, { timestamps: true });



const User = mongoose.model("User",userSchema);

export default User

