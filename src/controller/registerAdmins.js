import express from 'express';
import bcrypt from 'bcrypt';
import {userModel,adminsModel} from '../models/index.js';
const registeradmins=async(req,res)=>{
    const {name,phone,gender,email,departmentId,role,password}=req.body;
    try{
        if(role !=='admin') {
            return res.status(400).json({success:false,message:'only department admin role allowed here'});
        }
        if (!name || !email || !password || !departmentId) {
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