import mongoose from "mongoose";
import User from "../models/UserModel.js";
import {NotFoundError, UnauthenticatedError} from "../errors/customErrors.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcryptjs'
import { hashPassword ,comparePasswords} from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register= async (req,res)=>{
    const hashedPassword=await hashPassword(req.body.password);
    req.body.password=hashedPassword;
    const isAdmin=await User.countDocuments()===0;
    if(isAdmin){
        req.body.role="admin";
    }    
    const newUser=await User.create(req.body);
    if(!newUser){
        throw new NotFoundError('not found error');
    }
    res.status(StatusCodes.CREATED).json({user:newUser});
}
export const login= async (req,res)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        throw new UnauthenticatedError('invalid credentials');
    }
    const isValidUser=user && await comparePasswords(
        req.body.password,
        user.password
    )
    if(!isValidUser) throw new UnauthenticatedError('invalid credentials');

    const oneDay=1000*60*60*24;
    const token=createJWT({userId:user._id,role:user.role});
        res.cookie('token',token,{
            httpOnly:true,
            expires:new Date(Date.now()+oneDay),
            secure:process.env.NODE_ENV==='production',
        })
    res.status(StatusCodes.OK).json({login:'login successful'});
}
export const logout=async (req,res)=>{
    res.cookie('token','logout',{
        httpOnly:true,
        expires:new Date(Date.now()),
    })
    res.status(StatusCodes.OK).json({msg:'user logged out successfully'});
}