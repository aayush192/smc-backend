import express from 'express';
import bcrypt from 'bcrypt';
import {userModel,studentModel} from '../models/index.js';
const registerStudent=async(req,res)=>{
    const {name,phone,gender,email,departmentId,role,rollno,semester,password}=req.body;
    try{
        if(role !=='student') {
            return res.status(400).json({success:false,message:'role not selected'});
        }
        if (!name || !email || !password || !departmentId || !semester || !rollno) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
          }

     const checkUser=await userModel.findOne({where:{
        email,
     }})
     if(checkUser){
        return res.status(400).json({success:false,message:'user already exists'});
     }
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=await userModel.create({
        name,
        phone,
        gender,
        email,
        role,
        password:hashedPassword,
    });
    const newStudent=await studentModel.create({
        userId:newUser.id,
        rollno,
        semester,
        departmentId,
    })
    res.status(201).json({ message: 'student registered', user: {newUser,newStudent} });
    }catch(err){
        console.log('error regestering student',err);
        res.status(500).json({success:false,message:err.message});
    }
}
export default registerStudent;