import express from 'express';
import { DataTypes } from 'sequelize';
import userModel from './user.js';
import sequelize from '../connection/sequelize.js';

const deptAdminModel=sequelize.define('deptAdmins',{
    userId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model:'users',
            key:'id'
            }
        }
    },
    {
      timestamps:false,
    })
    export default deptAdminModel;