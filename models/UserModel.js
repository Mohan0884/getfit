import mongoose from "mongoose";
const userSchema=new mongoose.Schema(
    {
        name:String,
        lastName:String,
        email:String,
        password:String,
        age:Number,
        gender:{
            type:String,
            enum:["male","female"],
        },
        height:Number,
        weight:String,
        bmi:String,
        chest:String,
        plan:{
            type:String,
            default:"none",
        },
        validity:String,
        role:{
            type:String,
            default:"user",
        },
        avatar:String,
        avatarPublicId:String
    }
)
userSchema.methods.toJSON=function(){
    var obj=this.toObject();
    delete obj.password;
    return obj;
}
export default mongoose.model('User',userSchema);