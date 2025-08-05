import express from 'express';
import { teacherModel } from '../models';
const addTeacher=async(req,res)=>{
    try{
const {id,name,email,courses}=req.body;
const newTeacher=await teacherModel.create({
    id,
    name,
    email
});

if(courses && Array.isArray(courses)){
await newTeacher.addCourses(courses);
}
res.status(200).json({success:true,result:newTeacher,message:'teacher added successfully'});
}catch(err){
    res.status(500).json({success:false,message:err.message});
}

}