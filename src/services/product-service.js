const { mySqlSequelize } = require("../../config/database/mysql-db");

const getProductsDb = async () => {
  return await mySqlSequelize.query(`SELECT * FROM products`, {
    type: mySqlSequelize.QueryTypes.SELECT,
  });
};

module.exports = { getProductsDb };
