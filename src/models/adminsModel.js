import express from 'express';
import { DataTypes } from 'sequelize';
import userModel from './user.js';
import sequelize from '../connection/sequelize.js';

const adminsModel=sequelize.define('admins',{
    userId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model:'users',
            key:'id'
            }
        }
    },{
        timestamps:false,
    })
    export default adminsModel;