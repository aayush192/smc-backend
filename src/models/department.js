import sequelize from "../connection/sequelize.js";
import { DataTypes } from "sequelize";
const departmentModel=sequelize.define("department",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
},
{
  timestamps:false,
})
export default departmentModel;