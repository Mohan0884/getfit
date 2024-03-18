import mongoose from "mongoose";

const TrainingSchema=new mongoose.Schema(
    {
        name:String,
        originalPrice:String,
        offerPrice:String,
        desc:String,
        time:String,
        timePrice:String,
    },
    {
        timestamps:true
    }
);
export default mongoose.model('Training',TrainingSchema);