import { courseModel, departmentModel, deptCourses } from "../models/index.js";
import getIdByName from "./getIdByName.js";
const addCourse=async(req,res)=>{
    const getId=new getIdByName;
    const {courseName,departmentName,semester}=req.body;
    if(!courseName || !departmentName || !semester) return res.status(400).json({success:false,message:'provide all required data'});
    try{

        const departmentId=await getId.getIdByDepartmentName(departmentName);

        let course=await courseModel.findOne({where:{
            courseTitle:courseName,
        }})
        if(!course){
        course=await courseModel.create({courseTitle:courseName});
        }

      const checkIfExist=await deptCourses.findOne({where:{
        courseId:course.id,
        departmentId,
        semester

      }})
      if(checkIfExist) return res.status(400).json({success:false,message:'course already exist in this department'});
      await deptCourses.create({
        courseId:course.id,
        departmentId,
        semester

      })
        res.status(200).json({success:true,course,message:'course added successfully'});
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
}
export default addCourse;