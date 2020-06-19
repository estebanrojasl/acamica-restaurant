const { mySqlSequelize } = require("../../config/database/mysql-db");

const getOrdersDb = async (req) => {
  return await mySqlSequelize.query(
    `SELECT O.id AS order_id, U.username, O.payment_method, PD.name AS "products.product_name", P.quantity
    FROM products_by_order P
    JOIN orders O ON P.id_order = O.id
    JOIN products PD ON P.id_product = PD.id
    JOIN users U ON O.id_user = U.id
    WHERE U.username = "${req}";`,
    {
      type: mySqlSequelize.QueryTypes.SELECT,
      raw: true,
      nest: true,
    }
  );
};

module.exports = { getOrdersDb };
