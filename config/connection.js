require("dotenv").config();

const Sequelize = require("sequelize");

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: "remotemysql.com",
      dialect: "mysql",
      dialectOptions: {
        decimalNumbers: true,
      },
      port: process.env.DB_PORT || 3306,
    });

module.exports = sequelize;
