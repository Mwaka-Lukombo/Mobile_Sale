import {Loja} from '../models/loja.model.js';






export const getInformations = async(req,res)=>{
    try {
        const informations = await Loja.findOne({_id:"6a0c865c3c47d776f3377e41"});

        if(!informations){
          return res.status(200).json([]);
        }else{
            res.status(200).json(informations);
        }
    } catch (error) {
        console.log(error?.message);
        res.status(500).json({message:"Internal Server Error",error:error.message});
    }
}


export const createInformation = async(req,res)=>{
    const {
      storeName,
      email,
      phone,
      description,
      address
    } = req.body;

    try {

        if(!email || !storeName || !phone || !description || !address){
            return res.status(400).json({message:"Nao sao permitidos campos vazios!"});
        }

        const newInfomations = new Loja({
            storeName,
            email,
            phone,
            description,
            address
        })

        await newInfomations.save();

        res.status(200).json({
            newInfomations,
            message:"Infomation created Successfuly"
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}



export const updateInformation = async(req,res)=>{
    const {
      storeName,
      email,
      phone,
      description,
      address,
      website
    } = req.body;

    let lojaId = "6a0c295385737399ef6624c3";

    try {

        const loja = await Loja.findById(lojaId);

        if(loja){
            loja.storeName = storeName;
            loja.email = email;
            loja.phone = telefone;
            loja.address = endereco;
            loja.description = description;
            loja.website = website;

            await loja.save();

            res.status(200).json({
                loja,
                message:"Info updated Successfuly"
            })
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}





