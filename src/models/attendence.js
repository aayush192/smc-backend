import { DataTypes } from "sequelize";
import sequelize from "../connection/sequelize.js";

const attendanceModel = sequelize.define("attendance", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  semester:{type:DataTypes.INTEGER,allowNull:false,validate:{
    min:1,
    max:8
  }},
  date: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM('abscent','present'), allowNull: false }, // e.g., Present, Absent
},
{
  timestamps:false,
});
export default attendanceModel;