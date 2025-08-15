import express from "express";
import updateUser from "../controller/update/updateUser.js";
import updateDepartment from "../controller/update/updateDepartment.js";
import updateResult from "../controller/update/updateResult.js";
import authorize from "../middleware/authorize.js";
const updateRouter=express.Router();
updateRouter.post('/',async(req,res)=>{
    try {
        await updateUser(req,res);
    } catch (err) {
        res.status(500).json({success:false,message:err.message});
    }
});
updateRouter.post('/department',authorize('superadmin'),async(req,res)=>{
    try {
        await updateDepartment(req,res);
    } catch (err) {
        res.status(500).json({success:false,message:err.message});
    }
});
updateRouter.post('/result',authorize('superadmin','deptadmin'),async(req,res)=>{
    try {
        await updateResult(req,res);
    } catch (err) {
        res.status(500).json({success:false,message:err.message});
    }
});

export default updateRouter;