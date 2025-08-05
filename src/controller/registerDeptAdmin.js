import express from 'express';
import bcrypt from 'bcrypt';
import {userModel,deptAdminModel} from '../models/index.js';
const registerDeptAdmin=async(req,res)=>{
    const {name,phone,gender,email,departmentId,role,password}=req.body;
    try{
        if(role !=='deptadmin') {
            return res.status(400).json({success:false,message:'only department admin role allowed here'});
        }
        if (!name || !email || !password || !departmentId) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
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
    const newUserDept=await deptAdminModel.create({
        userId:newUser.id,
        departmentId,
    })
    res.status(201).json({ message: 'Department admin registered', user: {newUser,newUserDept} });
    }catch(err){
        console.log('error regestering department admin',err);
        res.status(500).json({success:false,message:err.message});
    }
}
export default registerDeptAdmin;