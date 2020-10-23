import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import User from "../models/User";
import EventUser from "../models/EventUser";

const Event = sequelize.define(
  "events",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    start_time: {
      type: Sequelize.DATE, // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    place: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

Event.belongsToMany(User, { through: EventUser, foreignKey: "event_id" });
User.belongsToMany(Event, { through: EventUser, foreignKey: "user_id" });

export default Event;
