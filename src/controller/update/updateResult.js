import { marksModel } from "../../models/index.js";
const updateResult=async(req,res)=>{
const {id,semester,grade,studentId,courseId}=req.body;
if(!id || !grade || !studentId || !courseId)return res.status(400).json({success:false,message:'provide all required data'});
try {
    const checkIfExist=await marksModel.findOne({where:{id,studentId,courseId}});
    if(!checkIfExist) return res.status(400).json({success:false,message:'result is not available in database'});

    const result=await marksModel.update({grade},{
        where:{
            id,studentId,courseId
        }
    })
    res.status(200).json({success:false,result:{id,grade,studentId,courseId},message:'result updated successfully'})

} catch (err) {
    res.status(500).json({success:false,message:err.message})
}
}
export default updateResult;