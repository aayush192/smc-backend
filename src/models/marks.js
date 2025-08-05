import { DataTypes } from "sequelize";
import sequelize from "../connection/sequelize.js";

const marksModel = sequelize.define("marks", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  semester:{type:DataTypes.INTEGER,allowNull:false},
  grade: { type: DataTypes.STRING, allowNull: false },
},
{
  timestamps:false,
});

export default marksModel;