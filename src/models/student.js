import { DataTypes } from "sequelize";
import sequelize from "../connection/sequelize.js";
import userModel from "./user.js";
const studentModel=sequelize.define("student",{
    userId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
       references:{model:'users',key:'id'}
    },
    symbolno:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true
    },
    semester:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            min:1,
            max:8
        }
    }
},
{
  timestamps:false,
}
)
export default studentModel;