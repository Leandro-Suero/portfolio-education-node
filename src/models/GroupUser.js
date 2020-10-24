import Sequelize from "sequelize";
import { sequelize } from "../database/database";

const GroupUser = sequelize.define("group_users", {
  group_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  group_role: {
    type: Sequelize.ENUM("admin", "teacher", "student"),
  },
});

export default GroupUser;
