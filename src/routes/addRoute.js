import express from 'express';
import addTeacher from "../controller/addTeacher.js";
import addResult from "../controller/addResult.js";
import addAttendence from "../controller/addAttendence.js";
import addDepartment from '../controller/addDepartment.js';
import addCourse from '../controller/addCourse.js';
import authorize from '../middleware/authorize.js';

const addRouter=express.Router();

addRouter.post('/teacher',authorize('superadmin','deptadmin'),async(req,res)=>{
    try{
    await addTeacher(req,res);
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
})
addRouter.post('/result',authorize('superadmin','deptadmin','admin'),async(req,res)=>{
    try{
    await addResult(req,res);
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
})
addRouter.post('/attendence',authorize('superadmin','deptadmin','admin'),async(req,res)=>{
    try{
    await addAttendence(req,res);
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
})
addRouter.post('/department',authorize('superadmin'),async(req,res)=>{
    try{
    await addDepartment(req,res);
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
})
addRouter.post('/course',authorize('superadmin','deptadmin'),async(req,res)=>{
    try{
    await addCourse(req,res);
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
})
export default addRouter;