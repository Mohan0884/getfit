import {dirname} from 'path';
import cloudinary from 'cloudinary';
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import  razorpay from 'razorpay';
import 'express-async-errors'
import authRouter from './router/authRouter.js'
import userRouter from './router/userRouter.js'
import User from './models/UserModel.js';
import Admin from './models/Admin.js'
import Training from './models/TrainingModel.js';
dotenv.config();
const app=express();
app.use(cookieParser());
import crypto from 'crypto'
app.use(express.json())
if(process.env.NODE_ENV=='development'){
    app.use(morgan('dev'));
}
app.post('/api/v1/order/validate/:id',async (req,res)=>{
    const {id}=req.params;
    var paymentsignature = req.body;
    const user=verifyJWT(req.cookies.token);
    const userWithOutSubscription= await User.findById(user.userId);
    console.log(userWithOutSubscription);
    userWithOutSubscription.plan=id;
    const training=await Training.findOne({name:id});
    await Admin.create({
        username:userWithOutSubscription.name,
        trainingChoosed:training.name,
        price:training.offerPrice,
        startDate:new Date(Date.now()),
        noofdayleft:30
    });
    await User.findByIdAndUpdate(user.userId,userWithOutSubscription);
    console.log(paymentsignature);
    console.log(userWithOutSubscription);
    var generated_signature = crypto.createHmac('sha256',process.env.RAZORPAY_SECRET)
        .update(paymentsignature.order_id + '|' + paymentsignature.razorpay_payment_id)
        .digest('hex');
        console.log(generated_signature);
        console.log(paymentsignature.razorpay_signature);
    
    //     if (generated_signature === paymentsignature.razorpay_signature) {    
        
    //     console.log('matched'); 
    // } else {
    //     console.log('not matched');
    // }
})
app.get('/api/v1/getAdmin',async(req,res)=>{
    const usersSubscribed=await Admin.find({});
    res.status(200).json({usersSubscribed});
})

app.post('/api/v1/order',async (req,res)=>{
    const razorpay=new Razorpay({
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_SECRET
    })
    const options=req.body;
    try {
        const order=await razorpay.orders.create(options);
        if(!order){
            return res.status(500).send('error');
        }
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
    }
    
    
})


const __dirname=dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname,'./public')));
//routers

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
import trainingRouter from './router/trainingRouter.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser, checkForTestUser } from './middleware/authMiddleware.js';
import Razorpay from 'razorpay';
import { verifyJWT } from './utils/tokenUtils.js';
import { StatusCodes } from 'http-status-codes';

app.use('/api/v1/trainings',authenticateUser,trainingRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',authenticateUser,userRouter);


app.use(errorHandlerMiddleware);
app.get('/',(req,res)=>{
    res.send('hello world');
})

app.post('/',(req,res)=>{
    console.log(req);
    res.json({msg:'message recieved successfully',data:req.body});
})

//Not found middleware
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public','index.html'));
})

app.use('*',(req,res)=>{
    res.status(400).json({msg:'not found route'});
});

//error middleware

const port=process.env.PORT || 5100;
try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port,()=>{
        console.log('server is running...');
    })
} catch (error) {
    console.log(error);
    process.exit(1);
}
