import { DataTypes } from "sequelize";
import sequelize from "../connection/sequelize.js";
const userModel=sequelize.define("users",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    } ,
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone:{
    type:DataTypes.STRING,
    allowNull:false,
    },
    gender:{
            type:DataTypes.ENUM("male","female","others"),
            allowNull:false
        },
    email:{
     type:DataTypes.STRING,
     unique:true,
     validate:{
        isEmail:true,
     }
    },
    role:{
        type:DataTypes.ENUM('superadmin','deptadmin','admin','student'),
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},
{
  timestamps:false,
}
)
export default userModel;