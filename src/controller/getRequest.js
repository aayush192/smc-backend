import sequelize, { col } from 'sequelize';
import { Fn } from 'sequelize/lib/utils';
import {studentModel,attendanceModel,marksModel,teacherModel,departmentModel,courseModel} from '../models/index.js';
import { response } from 'express';
export default class GetRequest{
    //get request
async getStudent(req,res){
    try{
        const limit = parseInt(req.query.limit) || 10;
    const response=await studentModel.findAll({
        limit,
    })
    res.status(200).json({success:true,result:response,message:'student retrieval is successful'});
}catch(err){
    res.status(500).json({success:false,message:err.message});
}
}
async getCourse(req,res){
    try{
        const limit = parseInt(req.query.limit) || 10;
    const response=await courseModel.findAll({
        limit,
    })
    res.status(200).json({success:true,result:response,message:'course retrieval is successful'});
}catch(err){
    res.status(500).json({success:false,message:err.message});
}
}

async getDepartment(req,res){
    try{
    const response=await departmentModel.findAll()
    res.status(200).json({success:true,result:response,message:'department retrieval is successful'});
}catch(err){
    res.status(500).json({success:false,message:err.message});
}
}

async getTeacher(req,res){
    try{
        const limit = parseInt(req.query.limit) || 10;
    const response=await teacherModel.findAll({
        limit,
    })
    res.status(200).json({success:true,result:response,message:'getTeacher retrieval is successful'});
}catch(err){
    res.status(500).json({success:false,message:err.message});
}
}


//get request by id
async getDepartmentByid(req,res){
    try{
        const id=req.params;
const departmentResponse= await departmentModel.findByPk(id,
{
    include:[{model:courseModel}]
}
);

const studentResponse=await studentModel.findAll({
where:{
    departmentId:id,
},
attributes:['semester',[fn('COUNT',col('semester')),'count']],

group:['semester']
})
const formatted = {};

studentResponse.forEach(row => {
const semester = row.getDataValue('semester');
const count = parseInt(row.getDataValue('count'));
formatted[semester] = count;
});

res.status(200).json({success:true,result:{departmentResponse,semesterWiseStudentCount:formatted},message:"department's data retrieved successfully"})
}catch(err){
res.status(500).json({success:false,message:err.message});
}
}

async getStudentById(req,res){
    try{
const id=req.params;
const studentResponse=await studentModel.findByPk(id);
if(!studentResponse){
    res.status(400).json({success:false,message:'student not found'});
    return;
}

const attendanceResponse=await attendanceModel.findAll({
    where:{
        studentid:id,
    },
    attributes:['status',[fn('COUNT',col('status')),'count']],
    group:['status']
})
const attendenceSummary={present:0,abscent:0};
attendanceResponse.forEach((state)=>{
    const status=state.getDataValue('status');
    const count=state.parseInt(getDataValue('count'));
    attendenceSummary[status]=count;
})

const marksResponse=await marksModel.findAll({
    where:{
        studentid:id,
    },
    attributes:['score','grade','semester'],
    include:[
        {model:courseModel,
            attributes:['courseTitle']
        }
    ]
});
res.status(200).json({success:true,result:{studentResponse,attendenceSummary,marksResponse},message:'student data retrieved successfully'})

}catch(err){
    res.status(500).json({status:false,message:err.messagex})
}
}

async getTeacherById(req, res) {
    try {
      const id = req.params.id;
      const teacher = await teacherModel.findByPk(id);  // find by primary key
  
      if (!teacher) {
        return res.status(404).json({ success: false, message: 'Teacher not found' });
      }
  
      res.status(200).json({ success: true, result: teacher, message: 'Teacher retrieval is successful' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
  
}