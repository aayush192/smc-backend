import express from 'express';
import { attendanceModel } from '../models/index.js';
const addAttendence=async(req,res)=>{
    const{semester,date,status,courseId}=req.body;
  try{
    if(!semester || !date || !status || !courseId) return res.status(400).json({success:false,message:'all value must be provided'})
    const result=await attendanceModel.create(semester,date,status,courseId);
    res.status(200).json({success:true,result,message:'attendence added successfully'});
  }catch(err){
    res.status(500).json({success:false,message:err.message})  }
}
export default addAttendence;