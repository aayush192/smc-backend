import express from 'express';
import registerStudent from '../controller/registerStudent.js';
import registerDeptAdmin from '../controller/registerDeptAdmin.js';
import registerAdmin from '../controller/registerAdmins.js';
const router=express.Router();

router.post('/',async(req,res)=>{
try{
await registerStudent(req,res);
}catch(err){
    res.status(500).json({success:false,message:err.message});
}
})
router.post('/admin',async(req,res)=>{
try{
await registerAdmin(req,res);
}catch(err){
    res.status(500).json({success:false,message:err.message});
}
})
router.post('/deptadmin',async(req,res)=>{
try{
await registerDeptAdmin(req,res);
}catch(err){
    res.status(500).json({success:false,message:err.message});
}
})




export default router;