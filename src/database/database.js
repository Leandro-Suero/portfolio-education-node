import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_DATABASE_NAME,
  process.env.DB_USER_NAME,
  process.env.DB_USER_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    // dialectOptions: {
    //   dateStrings: true,
    //   typeCast: true,
    //   useUTC: false,
    // },
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000,
    },
    logging: false, //remove this to get feedback
    timezone: process.env.DB_TIMEZONE,
  }
);
