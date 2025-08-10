import express from 'express';
import GetRequest from '../controller/getRequest.js';
const getRequest=new GetRequest();
const Router=express.Router();
Router.get('/',async(req,res)=>{
    try{
await getRequest.getStudent(req,res);
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
})
Router.get('/studentAttendence',async(req,res)=>{
    try{
await getRequest.getStudentByDepartmentAndSemester(req,res);
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
})
Router.get('/course',async(req,res)=>{
    try{
await getRequest.getCourse(req,res);
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
})
Router.get('/department',async(req,res)=>{
    try{
await getRequest.getDepartment(req,res);
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
})
Router.get('/teacher',async(req,res)=>{
    try{
await getRequest.getTeacher(req,res);
    } catch(err){
        res.status(500).json({success:false,message:err.message});
    }
})
Router.get('/:id',async(req,res)=>{
    try{
await getRequest.getStudentById(req,res);
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
})
Router.get('/course/:id',async(req,res)=>{
    try{
await getRequest.getCourseById(req,res);
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
})
Router.get('/department/:id',async(req,res)=>{
    try{
await getRequest.getDepartmentById(req,res);
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
})
Router.get('/teacher/:id',async(req,res)=>{
    try{
await getRequest.getTeacherById(req,res);
    } catch(err){
        res.status(500).json({success:false,message:err.message});
    }
})
console.log(Router);

export default Router;