import { userModel } from "../models/index.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const validateToken=async(req,res,next)=>{
const token=req.header('authenticate');

const check=jwt.verify(token,process.env.JWT_TOKEN);
console.log(check);
if(check){
    req.user=check;
    next();
}
else{
    return res.status(400).json({success:false,message:'token is not valid'});
}
}

export default validateToken;