import express from 'express';
import bcrypt from 'bcrypt';
import {userModel,studentModel} from '../models/index.js';
import getIdByName from './getIdByName.js';
const registerStudent=async(req,res)=>{
    const getId=new getIdByName;
    const {name,phone,gender,email,departmentName,role,symbolno,semester,password}=req.body;
    try{
        if(role !=='student') {
            return res.status(400).json({success:false,message:'role not selected'});
        }
        if (!name || !email || !password || !departmentName || !semester || !symbolno) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
          }
          const trimmedEmail = email.trim().toLowerCase();
     const checkUser=await userModel.findOne({where:{
        email:trimmedEmail,
        role
     }})
     if(checkUser){
        return res.status(400).json({success:false,message:'user already exists'});
     }
    const hashedPassword=await bcrypt.hash(password,10);
    const departmentId=await getId.getIdByDepartmentName(departmentName);
    const newUser=await userModel.create({
        name,
        phone,
        gender,
        email:trimmedEmail,
        role,
        password:hashedPassword,
    });
    const newStudent=await studentModel.create({
        userId:newUser.id,
        symbolno,
        semester,
        departmentId,
    })
    res.status(201).json({
        success: true,
        message: 'Student registered successfully',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          student: {
            id: newStudent.id,
            symbolno: newStudent.symbolno,
            semester: newStudent.semester,
            departmentId: newStudent.departmentId
          }
        }
      })
    }catch(err){
        console.log('error regestering student',err);
        res.status(500).json({success:false,message:err.message});
    }
}
export default registerStudent;