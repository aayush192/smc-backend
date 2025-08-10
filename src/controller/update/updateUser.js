import { where } from "sequelize";
import { userModel,studentModel, deptAdminModel, adminsModel } from "../../models/index.js";
import getIdByName from '../getIdByName.js';
import bcrypt from 'bcrypt';
const updateUser=async(req,res)=>{
const getId=new getIdByName;

const {id,name,phone,gender,email,departmentName,role,rollno,semester}=req.body;
if( !id  || !name || !phone || !gender || !email || !departmentName || !role) return res.status(400).json({success:false,message:'provide all required data'});
try{
 const departmentId=await getId.getIdByDepartmentName(departmentName); 
const userUpdate=await userModel.update({
name,
phone,
gender,
email,
role
},
{where:{
    id
}}
);
let extraUpdate;
if(role=='student'){
    if(!departmentId || !rollno || !semester) return res.status(400).json({success:false,message:'provide all required data'});
extraUpdate=await studentModel.update({
    rollno,
    semester,
    departmentId
},{where:{
    userId:id}
 })
}
else if(role=='deptadmin'){
extraUpdate=await deptAdminModel.update({
    departmentId,
},{where:{userId:id}})
}
else if(role=='admin'){
extraUpdate=await adminsModel.update({
    departmentId,
},{where:{userId:id}})
}
res.status(200).json({success:true,result:{userUpdate:{name,phone,gender,email,role},extraUpdate},message:'user updated successfully'})

}catch(err){
    res.status(500).json({success:false,message:err.message});
}
}
export default updateUser;