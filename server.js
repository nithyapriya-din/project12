import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import defaultData from './default.js';
import Routes from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import Razorpay from 'razorpay';
import path from 'path';
// import morgan from 'morgan';
import {fileURLToPath} from 'url';

const app= express();
dotenv.config();

const PORT= process.env.PORT || 8000;

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

const URL=process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@ecommerce-web.crjh9ff.mongodb.net/?retryWrites=true&w=majority`;

Connection(URL);



app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
// app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, './client/build')))
app.use('/', Routes);

app.use('*',function(req,res){
   res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

app.get("/api/getkey",(req,res)=>
 res.status(200).json({key:process.env.RAZORPAY_API_KEY})
);

export const instance = new Razorpay({
   key_id: process.env.RAZORPAY_API_KEY,
   key_secret: process.env.RAZORPAY_API_SECRET,
 });


app.listen(PORT,()=>{
   console.log(`server connected succesfully at port:${PORT}`);
});
defaultData();


