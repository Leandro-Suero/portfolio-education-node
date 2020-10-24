import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import User from "../models/User";
import GroupUser from "../models/GroupUser";

const Group = sequelize.define(
  "groups",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

Group.belongsToMany(User, { through: GroupUser, foreignKey: "group_id" });
User.belongsToMany(Group, { through: GroupUser, foreignKey: "user_id" });

export default Group;
