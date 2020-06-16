const { mySqlSequelize } = require("../../config/database/mysql-db");

const getUsersDb = async () => {
  return await mySqlSequelize.query(`SELECT * FROM users`, {
    type: mySqlSequelize.QueryTypes.SELECT,
  });
};

module.exports = { getUsersDb };
