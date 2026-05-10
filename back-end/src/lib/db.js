import {mongoose} from 'mongoose'
import {config} from 'dotenv';

config();





async function dbConnect (){
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}`);

        console.log(`Connected to DB`);
    } catch (error) {
        console.log("Erro na conexao com o banco de dados", error.message)
    }
}


export default dbConnect;


