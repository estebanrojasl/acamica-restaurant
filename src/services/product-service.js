const { mySqlSequelize } = require("../../config/database/mysql-db");

const getProductsDb = async () => {
  return await mySqlSequelize.query(
    `SELECT * 
    FROM products
    WHERE active = 1`,
    {
      type: mySqlSequelize.QueryTypes.SELECT,
    }
  );
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

const updateProductDb = async (req) => {
  const productId = req.params.id;
  const { name, image_url, description, price, active } = req.body;
  return await mySqlSequelize.query(
    `UPDATE products
    SET name = "${name}", image_url = "${image_url}", description = "${description}", price = "${price}", active = "${active}" 
    WHERE id = "${productId}";`,
    {
      type: mySqlSequelize.QueryTypes.UPDATE,
    }
  );
};

const deleteProductDb = async (req) => {
  const productId = req.params.id;
  return await mySqlSequelize.query(
    `UPDATE products
    SET active = 0
    WHERE id = "${productId}";`,
    {
      type: mySqlSequelize.QueryTypes.UPDATE,
    }
  );
};

module.exports = {
  getProductsDb,
  createProductDb,
  updateProductDb,
  deleteProductDb,
};
