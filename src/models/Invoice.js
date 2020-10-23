import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import User from "../models/User";

const Invoice = sequelize.define(
  "invoices",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    payment_date: {
      type: Sequelize.DATE, // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
    },
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    status: {
      type: Sequelize.ENUM,
      values: ["unpaid", "paid", "free"],
      defaultValue: "unpaid",
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

User.hasMany(Invoice, {
  foreignKey: "user_id",
});
Invoice.belongsTo(User);

export default Invoice;
