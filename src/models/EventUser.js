import Sequelize from "sequelize";
import { sequelize } from "../database/database";

const EventUser = sequelize.define("event_users", {
  event_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
});

export default EventUser;
