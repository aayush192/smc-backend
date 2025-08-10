import express from 'express';
import bcrypt from 'bcrypt';
import {userModel,adminsModel} from '../models/index.js';
import getIdByName from './getIdByName.js';
const registeradmins=async(req,res)=>{
    const getId=new getIdByName;
    const {name,phone,gender,email,departmentName,role,password}=req.body;
    try{
        if(role !=='admin') {
            return res.status(400).json({success:false,message:'only admin role allowed here'});
        }
        if (!name || !email || !password || !departmentName) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
          }
     const trimmedEmail=email.trim().toLowerCase();
     const checkUser=await userModel.findOne({where:{
        email:trimmedEmail,
     }})
     if(checkUser){
        return res.status(400).json({success:false,message:'user already exists'});
     }
     
    const departmentId=await getId.getIdByDepartmentName(departmentName);

    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=await userModel.create({
        name,
        phone,
        gender,
        email:trimmedEmail,
        role,
        password:hashedPassword,
    });
    const newAdmin=await adminsModel.create({
        userId:newUser.id,
        departmentId,
    })
    res.status(201).json({ message: 'admin registered', user: {newUser,newAdmin} });
    }catch(err){
        console.log('error regestering admin',err);
        res.status(500).json({success:false,message:err.message});
    }
}
export default registeradmins;