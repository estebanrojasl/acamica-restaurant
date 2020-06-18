const { mySqlSequelize } = require("../../config/database/mysql-db");

const getProductsDb = async () => {
  return await mySqlSequelize.query(`SELECT * FROM products`, {
    type: mySqlSequelize.QueryTypes.SELECT,
  });
};

const createProductDb = async (req) => {
  const { name, image_url, description, price } = req.body;
  return await mySqlSequelize.query(
    `INSERT INTO products (name, image_url, description, price)
      VALUES ("${name}", "${image_url}", "${description}", "${price}");`,
    {
      type: mySqlSequelize.QueryTypes.INSERT,
    }
  );
};

module.exports = { getProductsDb, createProductDb };
