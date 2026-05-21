import express from 'express';
import cookieParser from 'cookie-parser';
import dbConnect from './lib/db.js';
import { config } from 'dotenv';
import dns from 'dns';
import Routes from './routes/routes.js';
import cors from 'cors';
import path from 'path';

const __dirname = path.resolve();


dns.setServers(['8.8.8.8'], ['1.1.1.1']);


config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json({limit:"5mb"}));
app.use(cookieParser());
app.use(cors({origin:"https://mobile-sale.onrender.com",credentials:true}));


//Rotes
app.use(Routes);

//Quando estivermos em producao
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"front-end","dist")));
    app.use(/.*/,(req,res)=>{
        res.sendFile(path.join(__dirname,"front-end","dist","index.html"))
    });
}


dbConnect().then(()=>{
    app.listen(PORT,()=>{
        console.log(`App as running at: ${PORT}`);
    })
})









