import sequelize from "../connection/sequelize.js";
import { DataTypes } from "sequelize";
const deptCourses = sequelize.define('deptCourses', {
      semester: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });

export default deptCourses    