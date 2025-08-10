import { departmentModel } from "../models/index.js";
const addDepartment=async(req,res)=>{
    const {name}=req.body;
    if(!name) return res.status(400).json({success:false,message:'provide all required data'});
    try{
        const checkIfExist=await departmentModel.findOne({where:{
            name:name
        }})
        if(checkIfExist) return res.status(400).json({success:false,message:'department already exist'});
        const result=await departmentModel.create({name});
        res.status(200).json({success:true,result,message:'department added successfully'});
    }catch(err){
        res.status(500).json({success:false,message:err.message,name});
    }
}
export default addDepartment;