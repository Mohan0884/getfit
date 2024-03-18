import { StatusCodes } from 'http-status-codes';
import Training from '../models/TrainingModel.js';
import { NotFoundError } from '../errors/customErrors.js';


export const createTraining=async(req,res)=>{
    const data=req.body;
    const training=await Training.create(data);
    res.status(StatusCodes.CREATED).json({training});
}
export const getTraining=async (req,res)=>{
    const {id}=req.params;
    const training =await Training.findById(id);
    if (!training) throw new NotFoundError(`no job with id : ${id}`);

    res.status(StatusCodes.OK).json({training});
}
export const getAllTrainings=async (req,res)=>{
    const trainings=await Training.find({});
    res.status(StatusCodes.OK).json({trainings});
}
export const updateTraining =async(req,res)=>{
    const {id}=req.params;
    const updatedTraining =await Training.findByIdAndUpdate(id,req.body,{
        new:true,
    });
    if (!updatedTraining) throw new NotFoundError(`no job with id : ${id}`);

    res.status(200).json({msg:'training modified',updateTraining});
}
export const deleteTraining=async(req,res)=>{
    const {id}=req.params;
    const removedTraining =await Training.findByIdAndDelete(id);
    if (!removedTraining) throw new NotFoundError(`no job with id : ${id}`);

    res.status(StatusCodes.OK).json({msg:'training deleted successfully',removedTraining});
}