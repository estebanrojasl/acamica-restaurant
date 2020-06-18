const { mySqlSequelize } = require("../../config/database/mysql-db");

const getOrdersDb = async () => {
  return await mySqlSequelize.query(`SELECT * FROM orders`, {
    type: mySqlSequelize.QueryTypes.SELECT,
  });
};

module.exports = { getOrdersDb };
