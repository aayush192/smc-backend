import { userModel } from "../models/index.js";
import bcrypt from 'bcrypt';
const registerSuperAdmin=async(req,res)=>{
    const {name,phone,gender,email,role,password}=req.body;
    try{
        const checkIfExist=await userModel.findOne({where:{role}});
        if(checkIfExist) return res.status(400).json({success:false,message:'superadmin already exist'});
        const hashedPassword=await bcrypt.hash(password,10);
        const response=await userModel.create({name,phone,gender,email,role,password:hashedPassword});
        delete response.password;
        res.status(200).json({success:true,result:response,message:'superadmin registered successfully'});

    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
}
export default registerSuperAdmin;