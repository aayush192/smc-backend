import { marksModel, userModel,deptCourses ,studentModel} from "../models/index.js";
import getIdByName from "./getIdByName.js";
const addResult=async(req,res)=>{
    const getId=new getIdByName;
const {symbolno,courseName,semester,grade}=req.body;
if(!symbolno|| !courseName || !semester || !grade) return res.status(400).json({success:false,message:'provide all required data'});

try{
const studentId=await getId.getIdByStudentName(symbolno);
const courseId=await getId.getIdByCourseName(courseName);
const checkIfSemester=await studentModel.findOne({where:{
    userId:studentId,
}})
if(checkIfSemester.semester<semester) return res.status(400).json({success:false,message:'selected student doesnot read in this semester'});

const checkIfCourseAndSem=await deptCourses.findOne({where:{
    courseId,semester
}})
if(!checkIfCourseAndSem) return res.status(400).json({success:false,message:'this course is not available in this semester'});
 const checkIfExist=await marksModel.findOne({

    where:{
        studentId,
        courseId,
        semester
    }
 })
 if(checkIfExist) return res.status(400).json({success:false,message:'marks of this student in this course already exist'});
    const result=await marksModel.create({studentId,courseId,semester,grade});
    res.status(200).json({success:true,result,message:'marks added successfully'});
}catch(err){
    res.status(500).json({success:false,message:err.message });
}
}
export  default addResult;