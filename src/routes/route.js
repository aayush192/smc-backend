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
console.log(Router);

export default Router;