import sequelize from "../connection/sequelize.js";
import { DataTypes } from "sequelize";
const teacherModel=sequelize.define("teacher",{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
          isEmail:true
        }
    }
},
{
  timestamps:false,
})
export default teacherModel;