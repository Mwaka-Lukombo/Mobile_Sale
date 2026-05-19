import mongoose from 'mongoose';




const lojaSchema = new mongoose.Schema({
  storeName:{type:String,required:[true,"Name are required"]},
  email:{type:String,required:[true,"Email are required"]},
  phone:{type:String,required:[true,"Telefone are required"]},
  address:{type:String,required:[true,"Endereco are required"]},
  description:{type:String,required:[true,"Description are required"]},
  website:{type:String}
},{
    timestamps:true
});


export const Loja = mongoose.model("Loja", lojaSchema);















