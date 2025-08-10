import express from 'express';
import bcrypt from 'bcrypt';
import {userModel,deptAdminModel} from '../models/index.js';
import getIdByName from './getIdByName.js';
const registerDeptAdmin=async(req,res)=>{
    const getId=new getIdByName;
    const {name,phone,gender,email,departmentName,role,password}=req.body;
    try{
        if(role !=='deptadmin') {
            return res.status(400).json({success:false,message:'only department admin role allowed here'});
        }
        if (!name || !email || !password || !departmentName) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
          }
    const hashedPassword=await bcrypt.hash(password,10);
    const trimmedEmail=email.trim().toLowerCase();

    const checkIfExist=await userModel.findOne({
        where:{
            email:trimmedEmail,
        }
    })
    if(checkIfExist) return res.status(400).json({success:false,message:'account already exist'});

     const departmentId=await getId.getIdByDepartmentName(departmentName);
    const newUser=await userModel.create({
        name,
        phone,
        gender,
        email:trimmedEmail,
        role,
        password:hashedPassword,
    });
    const newUserDept=await deptAdminModel.create({
        userId:newUser.id,
        departmentId,
    })
    res.status(201).json({ message: 'Department admin registered',user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        departmentAdmin: {
          
          departmentId: newUserDept.departmentId
        }
      }});
    }catch(err){
        console.log('error regestering department admin',err);
        res.status(500).json({success:false,message:err.message});
    }
}
export default registerDeptAdmin;