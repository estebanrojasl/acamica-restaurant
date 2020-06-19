const { mySqlSequelize } = require("../../config/database/mysql-db");

const format = (rows) => {
  var result = [],
    index = {};

  rows.forEach(function (row) {
    if (!(row.order_id in index)) {
      index[row.order_id] = {
        order_id: row.order_id,
        status: row.status,
        user_id: row.user_id,
        payment_method: row.payment_method,
        address: row.address,
        products: [],
      };
      result.push(index[row.order_id]);
    }
    index[row.order_id].products.push({
      name: row.name,
      image_url: row.image_url,
      description: row.description,
      quantity: row.quantity,
      total_price: row.total_price,
    });
  });
  return result;
};

const getOrdersDb = async (req) => {
  const data = await mySqlSequelize.query(
    `SELECT O.id AS order_id ,U.id AS user_id, O.payment_method, U.address, O.status, PD.*, SUM(P.quantity) AS quantity, SUM(P.quantity * PD.price) AS total_price
    FROM products_by_order P
    JOIN orders O ON P.id_order = O.id
    JOIN products PD ON P.id_product = PD.id
    JOIN users U ON O.id_user = U.id
    WHERE U.username = "${req}"
    GROUP BY O.id, PD.name;`,
    {
      type: mySqlSequelize.QueryTypes.SELECT,
    }
  );

  return format(data);
};

const getAllOrdersDb = async () => {
  const data = await mySqlSequelize.query(
    `SELECT O.id AS order_id ,U.id AS user_id, O.payment_method, U.address, O.status, PD.*, SUM(P.quantity) AS quantity, SUM(P.quantity * PD.price) AS total_price
    FROM products_by_order P
    JOIN orders O ON P.id_order = O.id
    JOIN products PD ON P.id_product = PD.id
    JOIN users U ON O.id_user = U.id
    GROUP BY O.id, PD.name;`,
    {
      type: mySqlSequelize.QueryTypes.SELECT,
    }
  );

  return format(data);
};

module.exports = { getOrdersDb, getAllOrdersDb };
