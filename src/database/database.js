import Sequelize from "sequelize";

const sequelizeOptions = {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000,
  },
  logging: false, //remove this to get feedback
  timezone: process.env.DB_TIMEZONE,
  define: {
    timestamps: false,
  },
};

let sequelize = {};
if (process.env.DATABASE_URL) {
  //heroku postgresql config
  sequelize = new Sequelize(process.env.DATABASE_URL, sequelizeOptions);
} else {
  //local env postgres, dev
  sequelize = new Sequelize(
    process.env.DB_DATABASE_NAME,
    process.env.DB_USER_NAME,
    process.env.DB_USER_PASSWORD,
    sequelizeOptions
  );
}

export { sequelize };
