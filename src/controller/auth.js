import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/index.js';
dotenv.config();
const auth=async(req,res)=>{
const {email,password}=req.body;
try{
const response=await userModel.findOne({
    where:{
        email
    }
})

if(!response) return res.status(400).json({success:false,message:'user doesnot exist'});

const checkpassword=bcrypt.compareSync(password,response.password);
if(!checkpassword){
    res.status(400).json({success:false,message:'password doesnot match'});
}
const token=jwt.sign({id:response.id,email:response.email,role:response.role},process.env.JWT_TOKEN,{expiresIn:'5d'});
response.dataValues.token=token;
console.log(response);
res.status(200).json({success:true,result:response,message:'login successfull'});

}catch(err){
    res.status(500).json({success:false,message:err.message});
}

}
export default auth;