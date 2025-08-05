import sequelize from "../connection/sequelize.js";
import { DataTypes } from "sequelize";
const courseModel=sequelize.define("course",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    courseTitle:{
  type:DataTypes.STRING,
  allowNull:false
    }
},
{
  timestamps:false,
})
export default courseModel;