import express from 'express';
import { departmentModel } from "../../models/index.js";

const updateDepartment=async(req,res)=>{
    const {id,name}=req.body;
    if(!id || !name) return res.status(400).json({success:false,message:'provide all required required'});
    try{
   const checkIfExist=await departmentModel.findOne({where:{id}});
   if(!checkIfExist) return res.status(400).json({success:false,message:'department of this id doesnot exist'});
const departmentUpdate=await departmentModel.update({name},{where:{id}});
 res.status(200).json({success:true,
    result:{
    departmentUpdate:{id,name}
}
})
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
}
export default updateDepartment;