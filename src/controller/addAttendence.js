import express from 'express';
import { attendanceModel, departmentModel,deptCourses,studentModel } from '../models/index.js';
import getIdByName from './getIdByName.js';
const addAttendence=async(req,res)=>{
  const getId=new getIdByName;
    const{semester,status,departmentid,studentid,courseId}=req.body;
  try{
    if(!semester || !status || !departmentid || !studentid|| !courseId) return res.status(400).json({success:false,message:'all value must be provided'})
  
      const today = new Date();
      const date= today.toISOString().slice(0, 10);
 
      const checkIfSemester=await studentModel.findOne({where:{
        userId:studentId,
    }})
    if(checkIfSemester.semester!=semester) return res.status(400).json({success:false,message:'selected student doesnot read in this semester'});
    
    const checkIfCourseAndSem=await deptCourses.findOne({where:{
        courseId,semester
    }})

    const checkIfExist=await attendanceModel.findOne({where:{
     date,
     semester,
     departmentid,
     studentid,
     courseId
  }})

  if(checkIfExist) return res.status(400).json({success:false,message:'attendence of this student for this course is already done today'});

    const result=await attendanceModel.create({semester,date,status,departmentid,studentid,courseId});
    res.status(200).json({success:true,result,message:'attendence added successfully'});
  }catch(err){
    res.status(500).json({success:false,message:err.message})  }
}
export default addAttendence;