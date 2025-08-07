import { marksModel } from "../models/index.js";

const addResult=async(req,res)=>{
const {studentId,courseId,semester,grade}=req.body;
if(!studentId || !courseId || !semester || !grade) return res.status(400).json({success:false,message:'provide all rwquired data'});
try{
    const result=await marksModel.create(req.body);
    res.status(200).json({success:true,result,message:'marks added successfully'});
}catch(err){
    res.status(500).json({success:false,message:err.message});
}
}
export  default addResult;