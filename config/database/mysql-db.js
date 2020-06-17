const ENV = process.env.NODE_ENV || "development";
const { Sequelize } = require("sequelize");
const { MysqlConfig } = require("../environments/" + ENV).config;

const mySqlSequelize = new Sequelize(
  MysqlConfig.Db,
  MysqlConfig.User,
  MysqlConfig.Password,
  {
    host: MysqlConfig.Host,
    dialect: MysqlConfig.Dialect,
    dialectOptions: {
      multipleStatements: true,
    },
    operatorsAliases: 0,
    logging: MysqlConfig.logging,
  }
);

const initDatabase = () => {
  mySqlSequelize.sync({ force: false }).then(() => {
    console.log("Data base connection established");
  });
};

module.exports = {
  mySqlSequelize,
  initDatabase,
};
