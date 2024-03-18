import mongoose from "mongoose";

const AdminSchema=new mongoose.Schema(
    {
        username:String,
        trainingChoosed:String,
        price:String,
        startDate:Date,
        noofdayleft:Number,
    },
    {
        timestamps:true
    }
);
export default mongoose.model('Admin',AdminSchema);