import express from 'express';
import addTeacher from "../controller/addTeacher.js";
import addResult from "../controller/addResult.js";
import addAttendence from "../controller/addAttendence.js";
import addDepartment from '../controller/addDepartment.js';
import addCourse from '../controller/addCourse.js';

const addRouter=express.Router();

addRouter.post('/teacher',async(req,res)=>{
    try{
    await addTeacher(req,res);
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
})
addRouter.post('/result',async(req,res)=>{
    try{
    await addResult(req,res);
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
})
addRouter.post('/attendence',async(req,res)=>{
    try{
    await addAttendence(req,res);
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
})
addRouter.post('/department',async(req,res)=>{
    try{
    await addDepartment(req,res);
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
})
addRouter.post('/course',async(req,res)=>{
    try{
    await addCourse(req,res);
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
})
export default addRouter;